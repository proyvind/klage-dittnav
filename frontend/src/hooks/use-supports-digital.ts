import { useMemo } from 'react';
import { ENVIRONMENT } from '../environment/environment';
import { INNGANG_KATEGORIER } from '../kategorier/kategorier';
import { TemaKey } from '../tema/tema';

export const useSupportsDigitalKlage = (temaKey?: TemaKey, titleKey?: string | null) =>
  useMemo(() => {
    if (titleKey === null || typeof titleKey === 'undefined' || typeof temaKey === 'undefined') {
      return false;
    }

    return INNGANG_KATEGORIER.some(({ kategorier }) =>
      kategorier.some(
        (k) => k.temaKey === temaKey && k.titleKey === titleKey && k.digitalKlage.includes(ENVIRONMENT.environment)
      )
    );
  }, [temaKey, titleKey]);

export const useSupportsDigitalAnke = (temaKey?: TemaKey, titleKey?: string | null) =>
  useMemo(() => {
    if (titleKey === null || typeof titleKey === 'undefined' || typeof temaKey === 'undefined') {
      return false;
    }

    return INNGANG_KATEGORIER.some(({ kategorier }) =>
      kategorier.some(
        (k) => k.temaKey === temaKey && k.titleKey === titleKey && k.digitalAnke.includes(ENVIRONMENT.environment)
      )
    );
  }, [temaKey, titleKey]);
