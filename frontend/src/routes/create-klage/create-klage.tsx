import { Alert } from '@navikt/ds-react';
import React from 'react';
import { LoadingPage } from '@app/components/loading-page/loading-page';
import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { useKlage } from './use-klage';

interface Props {
  innsendingsytelse: Innsendingsytelse;
}

export const CreateKlage = ({ innsendingsytelse }: Props) => {
  const { error, loading } = useKlage(innsendingsytelse);

  if (error !== null) {
    return <Alert variant="error">{error}</Alert>;
  }

  return <LoadingPage>{loading}</LoadingPage>;
};
