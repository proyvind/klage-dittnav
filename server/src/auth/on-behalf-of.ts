import { Client, GrantBody } from 'openid-client';
import { serverConfig } from '../config/server-config';
import { getLogger } from '../logger';
import { now, oboCache } from './on-behalf-of-cache';

const log = getLogger('auth');

export const getOnBehalfOfAccessToken = async (
  authClient: Client,
  access_token: string,
  appName: string
): Promise<string> => {
  const cacheKey = `${access_token}-${appName}`;

  const cacheHit = oboCache.get(cacheKey);

  if (typeof cacheHit !== 'undefined') {
    const [cached_access_token, expires_at] = cacheHit;

    if (expires_at > now()) {
      return cached_access_token;
    }

    oboCache.delete(cacheKey);
  }

  if (typeof authClient.issuer.metadata.token_endpoint !== 'string') {
    const error = new Error(`OpenID issuer misconfigured. Missing token endpoint.`);
    log.error({ error });
    throw error;
  }

  try {
    const params: GrantBody = {
      grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
      subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
      client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
      subject_token: getSubjectToken(access_token),
      audience: `${serverConfig.cluster}:klage:${appName}`,
    };

    const { access_token: obo_access_token, expires_at } = await authClient.grant(params, {
      clientAssertionPayload: {
        aud: authClient.issuer.metadata.token_endpoint,
        nbf: now(),
      },
    });

    if (typeof obo_access_token !== 'string') {
      throw new Error('No on-behalf-of access token received.');
    }

    if (typeof expires_at === 'number') {
      oboCache.set(cacheKey, [obo_access_token, expires_at]);
    }

    return obo_access_token;
  } catch (error) {
    if (error instanceof Error) {
      log.error({ error });
      throw error;
    }

    if (typeof error === 'string') {
      throw new Error(error);
    }

    throw new Error('Unknown error while getting on-behalf-of access token.');
  }
};

const getSubjectToken = (bearerToken: string) => {
  const parts = bearerToken.split(' ');

  if (parts.length !== 2) {
    throw new Error('Error while splitting bearer token');
  }

  return parts[1];
};
