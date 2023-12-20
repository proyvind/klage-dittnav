import { useEffect } from 'react';
import { ENVIRONMENT } from '@app/environment/environment';

export const NotFoundPage = () => {
  useEffect(() => {
    console.warn('404 - Redirecting to www.nav.no/klage');

    if (!ENVIRONMENT.isLocal) {
      location.replace(ENVIRONMENT.isProduction ? 'https://www.nav.no/klage' : 'https://www.ekstern.dev.nav.no/klage');
    }
  }, []);

  return null;
};
