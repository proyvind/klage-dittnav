import { Alert } from '@navikt/ds-react';
import React from 'react';
import { LoadingPage } from '../../components/loading-page/loading-page';
import { useAnke } from './use-anke';

export const CreateAnke = () => {
  const { error, loading } = useAnke();

  if (error !== null) {
    return <Alert variant="error">{error}</Alert>;
  }

  return <LoadingPage>{loading}</LoadingPage>;
};
