import React from 'react';
import { Innsendingsytelse } from '../../innsendingsytelser/innsendingsytelser';
import { useLanguage } from '../../language/use-language';
import { useGetInnsendingsytelserQuery } from '../../redux-api/innsendingsytelser';
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
