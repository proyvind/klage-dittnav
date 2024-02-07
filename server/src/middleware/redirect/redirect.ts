import { isInnsendingsytelse } from '@app/innsendingsytelser';
import { isAnonymousStep, isLang, isLoggedInStep, isType } from '@app/middleware/redirect/guards';
import {
  noRedirect,
  redirectToExternalKlagePage,
  redirectToInternalPage,
} from '@app/middleware/redirect/redirect-functions';
import { Request, Response } from '@app/types/http';

export const redirectMiddleware = (req: Request, res: Response, next: () => void) => {
  if (req.method !== 'GET') {
    return next();
  }

  const [, first, second, third, fourth, fifth] = req.path.split('/'); // The first element is an empty string. Ex.: ['', 'nb', 'klage', 'DAGPENGER'].

  if (!isLang(first) || !isType(second) || third === undefined) {
    return redirectToExternalKlagePage(req, res);
  }

  // Handle /ny and /uinnlogget for now.
  if (third === 'uinnlogget' || third === 'ny') {
    if (!isInnsendingsytelse(fourth)) {
      return redirectToExternalKlagePage(req, res);
    }

    const path = isAnonymousStep(fifth) ? `/${first}/${second}/${fourth}/${fifth}` : `/${first}/${second}/${fourth}`;

    return redirectToInternalPage(req, res, path);
  }

  const hasYtelse = isInnsendingsytelse(third);
  const hasStep = isLoggedInStep(fourth);

  if (!hasYtelse && !hasStep) {
    return redirectToInternalPage(req, res, `/${first}/${second}/${third}/begrunnelse`);
  }

  return noRedirect(req, res, next);
};
