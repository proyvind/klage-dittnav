import { useEffect } from 'react';
import { TemaKey } from '../tema/tema';
import { PageIdentifier, logPageView } from './amplitude';

export const useLogPageView = (page: PageIdentifier, temaKey?: TemaKey, title?: string) => {
  useEffect(() => {
    logPageView(page, temaKey, title);
  }, [page, temaKey, title]);
};
