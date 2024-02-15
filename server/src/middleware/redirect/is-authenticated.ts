import { KLAGE_DITTNAV_API_CLIENT_ID } from '@app/config/config';
import { setOboToken } from '@app/functions/set-obo';
import { getLogger } from '@app/logger';
import { noRedirect } from '@app/middleware/redirect/redirect-functions';
import { Request, Response } from '@app/types/http';

const log = getLogger('auth-check');

const AUTH_URL = 'http://klage-dittnav-api/api/bruker/authenticated';

interface Authenticated {
  authenticated: boolean;
  tokenx: boolean;
  selvbetjening: boolean;
}

export const ensureAuthentication = async (req: Request, res: Response, next: () => void): Promise<void> => {
  // Skipping auth check during test run. Assuming user is not authenticated.
  if (process.env.NODE_ENV === 'test') {
    return redirectToLogin(req, res);
  }

  try {
    await setOboToken(req, KLAGE_DITTNAV_API_CLIENT_ID);

    const headers = new Headers();

    for (const [key, value] of Object.entries(req.headers)) {
      headers.append(key, value as string);
    }

    const response = await fetch(AUTH_URL, { headers, method: 'GET' });

    if (!response.ok) {
      log.warn({
        msg: `Auth service responded with error status (${response.status}). Assuming user is not authenticated.`,
        data: { status: response.status, url: req.url, authenticated: false },
      });

      redirectToLogin(req, res);

      return;
    }

    const auth = (await response.json()) as Authenticated;

    if (!auth.authenticated) {
      log.warn({
        msg: 'User is not authenticated',
        data: { status: response.status, url: req.url, ...auth },
      });

      redirectToLogin(req, res);

      return;
    }

    log.debug({ msg: 'User is authenticated', data: { url: req.url, ...auth } });
  } catch (error) {
    log.error({
      error,
      msg: 'Could not reach auth service. Failed to check if user is authenticated.',
      data: { url: req.url, authenticated: false },
    });

    redirectToLogin(req, res);

    return;
  }

  return noRedirect(req, res, next);
};

const redirectToLogin = (req: Request, res: Response): void => {
  const redirectAfter = encodeURIComponent(req.url);

  res.redirect(302, `/oauth2/login?redirect=${redirectAfter}`);
};
