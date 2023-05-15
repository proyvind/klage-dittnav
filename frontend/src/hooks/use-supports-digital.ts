import { useMemo } from 'react';
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
          return tema.innsendingsytelse === innsendingsytelse;
        }

        return tema.innsendingsytelser.some((k) => k.innsendingsytelse === innsendingsytelse);
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
          return tema.innsendingsytelse === innsendingsytelse;
        }

        return tema.innsendingsytelser.some((k) => k.innsendingsytelse === innsendingsytelse);
      }),
    [innsendingsytelse]
  );
