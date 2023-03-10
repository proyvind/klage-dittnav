import { useSearchParams } from 'react-router-dom';
import { getQueryValue } from '../functions/get-query-value';
import { Innsendingsytelse, ensureStringIsInnsendingsytelse } from '../innsendingsytelser/innsendingsytelser';

export const useInnsendingsytelseFromQuery = (): Innsendingsytelse | null => {
  const [query] = useSearchParams();
  const temaParam = query.get('tema');
  const titleParam = query.get('tittel');
  const temaKey = getQueryValue(temaParam);
  const titleKey = getQueryValue(titleParam);
  const innsendingsytelse = ensureStringIsInnsendingsytelse(titleKey) ?? ensureStringIsInnsendingsytelse(temaKey);

  return innsendingsytelse;
};
