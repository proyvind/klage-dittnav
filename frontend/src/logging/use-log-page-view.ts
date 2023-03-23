import { useEffect } from 'react';
import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { PageIdentifier, logPageView } from './amplitude';

export const useLogPageView = (page: PageIdentifier, innsendingsytelse?: Innsendingsytelse, title?: string) => {
  useEffect(() => {
    logPageView(page, innsendingsytelse, title);
  }, [page, innsendingsytelse, title]);
};
