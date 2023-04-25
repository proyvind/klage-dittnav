import { useMemo } from 'react';
import { ENVIRONMENT } from '@app/environment/environment';
import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { INNGANG_KATEGORIER, TemaType } from '@app/kategorier/kategorier';

export const useSupportsDigitalKlage = (innsendingsytelse: Innsendingsytelse) =>
  useMemo(
    () =>
      INNGANG_KATEGORIER.some((tema) => {
        if (tema.type === TemaType.EXTERNAL) {
          return false;
        }

        if (tema.type === TemaType.INNSENDINGSYTELSE) {
          return tema.innsendingsytelse === innsendingsytelse && tema.digitalKlage.includes(ENVIRONMENT.environment);
        }

        return tema.innsendingsytelser.some(
          (k) => k.innsendingsytelse === innsendingsytelse && k.digitalKlage.includes(ENVIRONMENT.environment)
        );
      }),
    [innsendingsytelse]
  );

export const useSupportsDigitalAnke = (innsendingsytelse: Innsendingsytelse) =>
  useMemo(
    () =>
      INNGANG_KATEGORIER.some((tema) => {
        if (tema.type === TemaType.EXTERNAL) {
          return false;
        }

        if (tema.type === TemaType.INNSENDINGSYTELSE) {
          return tema.innsendingsytelse === innsendingsytelse && tema.digitalAnke.includes(ENVIRONMENT.environment);
        }

        return tema.innsendingsytelser.some(
          (k) => k.innsendingsytelse === innsendingsytelse && k.digitalAnke.includes(ENVIRONMENT.environment)
        );
      }),
    [innsendingsytelse]
  );
