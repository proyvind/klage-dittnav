import { useMemo } from 'react';
import { ENVIRONMENT } from '../environment/environment';
import { Innsendingsytelse } from '../innsendingsytelser/innsendingsytelser';
import { INNGANG_KATEGORIER } from '../kategorier/kategorier';

export const useSupportsDigitalKlage = (innsendingsytelse: Innsendingsytelse) =>
  useMemo(
    () =>
      INNGANG_KATEGORIER.some(({ kategorier }) =>
        kategorier.some(
          (k) => k.innsendingsytelse === innsendingsytelse && k.digitalKlage.includes(ENVIRONMENT.environment)
        )
      ),
    [innsendingsytelse]
  );

export const useSupportsDigitalAnke = (innsendingsytelse: Innsendingsytelse) =>
  useMemo(
    () =>
      INNGANG_KATEGORIER.some(({ kategorier }) =>
        kategorier.some(
          (k) => k.innsendingsytelse === innsendingsytelse && k.digitalAnke.includes(ENVIRONMENT.environment)
        )
      ),
    [innsendingsytelse]
  );
