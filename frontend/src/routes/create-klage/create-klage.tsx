import { Alert } from '@navikt/ds-react';
import React from 'react';
import { LoadingPage } from '../../components/loading-page/loading-page';
import { useKlage } from './use-klage';

export const CreateKlage = () => {
  const { error, loading } = useKlage();

  if (error !== null) {
    return <Alert variant="error">{error}</Alert>;
  }

  return <LoadingPage>{loading}</LoadingPage>;
};
