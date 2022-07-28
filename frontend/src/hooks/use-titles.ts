import { useLanguage } from '../language/use-language';
import { useGetLanguageTitlesQuery } from '../redux-api/titles';
import { TemaKey } from '../tema/tema';

export const useTemaName = (temaKey: TemaKey) => {
  const lang = useLanguage();
  const { data: titles, isLoading } = useGetLanguageTitlesQuery(lang);

  if (isLoading || typeof titles === 'undefined') {
    return temaKey;
  }

  return titles[temaKey] ?? `${lang}_TITLE_${temaKey}`;
};

export const useTitle = (titleKey?: string | null): [string, boolean] => {
  const lang = useLanguage();
  const { data = {}, isLoading } = useGetLanguageTitlesQuery(lang);

  const title = typeof titleKey === 'string' ? data[titleKey] ?? '' : '';

  return [title, isLoading];
};

export const useTitleOrTemaName = (temaKey: TemaKey, titleKey?: string | null): [string, boolean] => {
  const temaName = useTemaName(temaKey);
  const [title, isLoading] = useTitle(titleKey);

  if (typeof titleKey === 'string') {
    return [title, isLoading];
  }

  return [temaName, false];
};

export const useTitles = (titleKeys: string[]): [string[], boolean] => {
  const lang = useLanguage();
  const { data = {}, isLoading } = useGetLanguageTitlesQuery(lang);

  const titles = titleKeys.map((titleKey) => data[titleKey] ?? titleKey);

  return [titles, isLoading];
};
