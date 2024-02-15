import { JWK } from 'jose';
import { Issuer } from 'openid-client';
import { requiredEnvString, requiredEnvUrl } from '@app/config/env-var';
import { parseJSON } from '@app/functions/parse-json';
import { getLogger } from '@app/logger';

const log = getLogger('auth');

const getJwk = () => {
  const envVar = 'TOKEN_X_PRIVATE_JWK';

  const privateJwk = requiredEnvString(envVar);

  const jwk = parseJSON<JWK>(privateJwk);

  if (jwk === null) {
    throw new Error(`Could not parse ${envVar}`);
  }

  return jwk;
};

const getTokenXClient = async () => {
  try {
    const wellKnownUrl = requiredEnvUrl('TOKEN_X_WELL_KNOWN_URL');
    const clientId = requiredEnvString('TOKEN_X_CLIENT_ID');

    const issuer = await Issuer.discover(wellKnownUrl);

    const keys = [getJwk()];

    return new issuer.Client({ client_id: clientId, token_endpoint_auth_method: 'private_key_jwt' }, { keys });
  } catch (error) {
    log.error({ error, msg: 'Failed to get Token X client' });
    throw error;
  }
};

export class TokenXClient {
  private static instance: ReturnType<typeof getTokenXClient> | null = null;

  static async getInstance() {
    if (this.instance === null) {
      this.instance = getTokenXClient();
    }

    return this.instance;
  }
}
