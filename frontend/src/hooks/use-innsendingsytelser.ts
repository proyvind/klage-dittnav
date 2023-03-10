import { Innsendingsytelse } from '../innsendingsytelser/innsendingsytelser';
import { useLanguage } from '../language/use-language';
import { useTranslation } from '../language/use-translation';
import { useGetInnsendingsytelserQuery } from '../redux-api/innsendingsytelser';

export const useInnsendingsytelseName = (innsendingsytelse: Innsendingsytelse): [string, boolean] => {
  const lang = useLanguage();
  const { common } = useTranslation();
  const { data, isLoading } = useGetInnsendingsytelserQuery(lang);

  if (isLoading || typeof data === 'undefined') {
    return [common.loading, true];
  }

  return [data[innsendingsytelse] ?? `${lang}_YTELSE_${innsendingsytelse}`, false];
};

export const useInnsendingsytelserNames = (innsendingsytelser: Innsendingsytelse[]): [string[], boolean] => {
  const lang = useLanguage();
  const { data, isLoading } = useGetInnsendingsytelserQuery(lang);

  if (isLoading || typeof data === 'undefined') {
    return [[], true];
  }

  const titles = innsendingsytelser.map((innsendingsytelse) => data[innsendingsytelse] ?? innsendingsytelse);

  return [titles, isLoading];
};
