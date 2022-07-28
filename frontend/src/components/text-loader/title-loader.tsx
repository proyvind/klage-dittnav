import React from 'react';
import { useLanguage } from '../../language/use-language';
import { useGetLanguageTitlesQuery } from '../../redux-api/titles';
import { TextLoader } from './text-loader';

interface Props {
  titleKey: string;
}

export const TitleLoader = ({ titleKey }: Props) => {
  const lang = useLanguage();
  const { data: titles, isLoading } = useGetLanguageTitlesQuery(lang);

  return (
    <TextLoader isLoading={isLoading} $minWidth="200px">
      {titles?.[titleKey] ?? titleKey}
    </TextLoader>
  );
};
