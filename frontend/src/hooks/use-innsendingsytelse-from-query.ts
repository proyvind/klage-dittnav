import { useSearchParams } from 'react-router-dom';
import { getQueryValue } from '@app/functions/get-query-value';
import { Innsendingsytelse, ensureStringIsInnsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';

export const useInnsendingsytelseFromQuery = (): Innsendingsytelse | null => {
  const [query] = useSearchParams();
  const temaParam = query.get('tema');
  const titleParam = query.get('tittel');
  const temaKey = getQueryValue(temaParam);
  const titleKey = getQueryValue(titleParam);
  const innsendingsytelse = ensureStringIsInnsendingsytelse(titleKey) ?? ensureStringIsInnsendingsytelse(temaKey);

  return innsendingsytelse;
};
