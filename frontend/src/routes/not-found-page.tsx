import { useEffect } from 'react';
import { ENVIRONMENT } from '@app/environment/environment';
import { redirectToNav } from '@app/functions/redirect-to-nav';

export const NotFoundPage = () => {
  useEffect(() => {
    console.warn('404 - Redirecting to www.nav.no/klage');

    if (!ENVIRONMENT.isLocal) {
      redirectToNav();
    }
  }, []);

  return null;
};
