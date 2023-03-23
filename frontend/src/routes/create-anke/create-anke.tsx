import { Alert } from '@navikt/ds-react';
import React from 'react';
import { LoadingPage } from '@app/components/loading-page/loading-page';
import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { useAnke } from './use-anke';

interface Props {
  innsendingsytelse: Innsendingsytelse;
}

export const CreateAnke = ({ innsendingsytelse }: Props) => {
  const { error, loading } = useAnke(innsendingsytelse);

  if (error !== null) {
    return <Alert variant="error">{error}</Alert>;
  }

  return <LoadingPage>{loading}</LoadingPage>;
};
