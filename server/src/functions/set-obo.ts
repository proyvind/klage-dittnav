import { getOnBehalfOfAccessToken } from '@app/auth/on-behalf-of';
import { TokenXClient } from '@app/auth/token-x-client';
import { getLogger } from '@app/logger';
import { Request } from '@app/types/http';

const log = getLogger('obo-token');

export const setOboToken = async (req: Request, appName: string) => {
  const authClient = await TokenXClient.getInstance();
  const tokenXtoken = req.header('Authorization');

  if (typeof tokenXtoken === 'string') {
    try {
      const obo_access_token = await getOnBehalfOfAccessToken(authClient, tokenXtoken, appName);
      req.headers['authorization'] = `Bearer ${obo_access_token}`;
      req.headers['idporten-token'] = tokenXtoken;
    } catch (error) {
      log.warn({
        msg: `Failed to prepare request with OBO token for route ${appName}`,
        error,
        data: { appName },
      });
    }
  }
};
