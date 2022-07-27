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

export const useTitle = (titleKey: string): string => {
  const lang = useLanguage();
  const { data: titles, isLoading } = useGetLanguageTitlesQuery(lang);

  if (isLoading || typeof titles === 'undefined') {
    return titleKey;
  }

  return titles[titleKey] ?? titleKey;
};

export const useTitleOrYtelse = (temaKey: TemaKey, titleKey?: string | null, ytelse?: string | null) => {
  const temaName = useTemaName(temaKey);
  const title = useTitle(titleKey ?? '');

  if (typeof titleKey === 'string') {
    return title;
  }

  if (typeof ytelse === 'string') {
    return ytelse;
  }

  return temaName;
};

export const useTitleKey = (titleKey: string | null): string | null => {
  const lang = useLanguage();
  const { data: titles, isLoading } = useGetLanguageTitlesQuery(lang);

  if (titleKey === null || isLoading || typeof titles === 'undefined') {
    return null;
  }

  return titles[titleKey] !== undefined ? titleKey : null;
};
