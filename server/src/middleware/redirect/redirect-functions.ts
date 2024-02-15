import { isDeployedToProd } from '@app/config/env';
import {
  ExternalRedirectLabels,
  InternalRedirectLabels,
  externalRedirectCounter,
  internalRedirectCounter,
  viewCountCounter,
} from '@app/middleware/redirect/counters';
import {
  deleteRedirectedCookie,
  getHasSaksnummer,
  getRedirectedFrom,
  getReferrer,
  getSaksnummer,
  removeSaksnummer,
} from '@app/middleware/redirect/functions';
import { log } from '@app/middleware/redirect/logger';
import { Request, Response } from '@app/types/http';

const YTELSE_OVERVIEW_URL = isDeployedToProd ? 'https://www.nav.no/klage' : 'https://www.ekstern.dev.nav.no/klage';

export const redirectToExternalKlagePage = (req: Request, res: Response) => {
  const has_saksnummer = getHasSaksnummer(req);
  const redirected_from = getRedirectedFrom(req);

  const shared: ExternalRedirectLabels = {
    has_saksnummer,
    referrer: getReferrer(req),
  };

  log.warn({
    msg: `Invalid URL. Redirecting to external URL ${YTELSE_OVERVIEW_URL}`,
    data: { ...shared, url: req.url, redirected_from, reason: 'invalid', session_id: res.locals.sessionId },
  });

  externalRedirectCounter.inc({
    ...shared,
    url: removeSaksnummer(req.url),
    redirected_from: removeSaksnummer(redirected_from),
  });

  deleteRedirectedCookie(res);
  res.redirect(301, YTELSE_OVERVIEW_URL);
};

export const redirectToInternalPage = (req: Request, res: Response, path: string) => {
  const saksnummer = getSaksnummer(req);
  const path_with_saksnummer = saksnummer === null ? path : `${path}?saksnummer=${saksnummer}`;
  const redirected_from = getRedirectedFrom(req);

  const shared: InternalRedirectLabels = {
    referrer: getReferrer(req),
    has_saksnummer: saksnummer !== null ? 'true' : 'false',
  };

  log.warn({
    msg: `Redirecting to internal path ${path_with_saksnummer}`,
    data: {
      ...shared,
      url: req.url,
      redirect_to: path_with_saksnummer,
      redirected_from,
      reason: 'deprecated',
      session_id: res.locals.sessionId,
    },
  });

  internalRedirectCounter.inc({
    ...shared,
    url: removeSaksnummer(req.url),
    redirected_to: path,
    redirected_from: removeSaksnummer(redirected_from),
  });

  res.cookie('redirected_from', req.url, { httpOnly: true, sameSite: 'strict' });
  res.redirect(301, path_with_saksnummer);
};

export const noRedirect = (req: Request, res: Response, next: () => void) => {
  const redirected_from = getRedirectedFrom(req);
  const referrer = getReferrer(req);

  viewCountCounter.inc({
    url: removeSaksnummer(req.url),
    redirected_from: removeSaksnummer(redirected_from),
    referrer: removeSaksnummer(referrer),
  });

  deleteRedirectedCookie(res);

  return next();
};
