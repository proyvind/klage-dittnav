import { isInnsendingsytelse } from '@app/innsendingsytelser';
import { isAnonymousStep, isLang, isLoggedInStep, isSak } from '@app/middleware/redirect/guards';
import { ensureAuthentication } from '@app/middleware/redirect/is-authenticated';
import {
  noRedirect,
  redirectToExternalKlagePage,
  redirectToInternalPage,
} from '@app/middleware/redirect/redirect-functions';
import { Request, Response } from '@app/types/http';

// eslint-disable-next-line complexity
export const redirectMiddleware = async (req: Request, res: Response, next: () => void) => {
  if (req.method !== 'GET') {
    return next();
  }

  const [, first, second, third, fourth, fifth] = req.path.split('/'); // The first element is an empty string. Ex.: ['', 'nb', 'klage', 'DAGPENGER'].

  if (!isLang(first) || third === undefined) {
    return redirectToExternalKlagePage(req, res);
  }

  // Logged in paths.
  if (isSak(second)) {
    if (fourth === undefined || !isLoggedInStep(fourth)) {
      return redirectToInternalPage(req, res, `/${first}/${second}/${third}/begrunnelse`);
    }

    await ensureAuthentication(req, res, next);

    return;
  }

  // Not logged in ettersendelse paths.
  if (second === 'ettersendelse') {
    // Legacy path handling.
    if (third !== 'klage' && third !== 'anke') {
      if (third === 'uinnlogget' || third === 'ny') {
        if (!isInnsendingsytelse(fourth)) {
          return redirectToExternalKlagePage(req, res);
        }

        const path = isAnonymousStep(fifth)
          ? `/${first}/${second}/klage/${fourth}/${fifth}`
          : `/${first}/${second}/klage/${fourth}`;

        return redirectToInternalPage(req, res, path);
      }

      if (!isInnsendingsytelse(third)) {
        return redirectToExternalKlagePage(req, res);
      }

      return redirectToInternalPage(req, res, `/${first}/${second}/klage/${third}`);
    }

    if (!isInnsendingsytelse(fourth)) {
      return redirectToExternalKlagePage(req, res);
    }

    if (fifth === undefined || isAnonymousStep(fifth)) {
      return noRedirect(req, res, next);
    }

    return redirectToInternalPage(req, res, `/${first}/${second}/${third}/${fourth}`);
  }

  // Not logged in klage/anke paths.
  if (second !== 'klage' && second !== 'anke') {
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

  if (!isInnsendingsytelse(third)) {
    return redirectToExternalKlagePage(req, res);
  }

  if (fourth === undefined || isAnonymousStep(fourth)) {
    return noRedirect(req, res, next);
  }

  return redirectToInternalPage(req, res, `/${first}/${second}/${third}`);
};
