import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { useLanguage } from '@app/language/use-language';
import { useTranslation } from '@app/language/use-translation';
import { useGetInnsendingsytelserQuery } from '@app/redux-api/innsendingsytelser';

export const useInnsendingsytelseName = (innsendingsytelse: Innsendingsytelse): [string, boolean] => {
  const lang = useLanguage();
  const { common } = useTranslation();
  const { data, isLoading } = useGetInnsendingsytelserQuery(lang);

  if (isLoading || data === undefined) {
    return [common.loading, true];
  }

  return [data[innsendingsytelse] ?? innsendingsytelse, false];
};
