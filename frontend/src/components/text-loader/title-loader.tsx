import React from 'react';
import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { useLanguage } from '@app/language/use-language';
import { useGetInnsendingsytelserQuery } from '@app/redux-api/innsendingsytelser';
import { TextLoader } from './text-loader';

interface Props {
  innsendingsytelse: Innsendingsytelse;
}

export const TitleLoader = ({ innsendingsytelse }: Props) => {
  const lang = useLanguage();
  const { data, isLoading } = useGetInnsendingsytelserQuery(lang);

  return (
    <TextLoader isLoading={isLoading} $minWidth="200px">
      {data?.[innsendingsytelse] ?? innsendingsytelse}
    </TextLoader>
  );
};
