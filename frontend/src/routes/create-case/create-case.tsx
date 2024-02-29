import { Alert } from '@navikt/ds-react';
import React from 'react';
import { LoadingPage } from '@app/components/loading-page/loading-page';
import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { CaseType } from '@app/redux-api/case/types';
import { useCase } from './use-case';

interface Props {
  innsendingsytelse: Innsendingsytelse;
  type: CaseType;
}

export const CreateCase = ({ innsendingsytelse, type }: Props) => {
  const { error, loading } = useCase(type, innsendingsytelse);

  if (error !== null) {
    return <Alert variant="error">{error}</Alert>;
  }

  return <LoadingPage>{loading}</LoadingPage>;
};
