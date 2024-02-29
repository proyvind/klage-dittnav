import { Alert } from '@navikt/ds-react';
import { skipToken } from '@reduxjs/toolkit/query';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { redirectToNav } from '@app/functions/redirect-to-nav';
import { useTranslation } from '@app/language/use-translation';
import { addErrorEvent, sendErrorReport } from '@app/logging/error-report/error-report';
import { useGetCaseQuery, useUpdateCaseMutation } from '@app/redux-api/case/api';
import { Case } from '@app/redux-api/case/types';
import { LoadingPage } from '../../loading-page/loading-page';

interface Props {
  Component: React.ComponentType<{ data: Case }>;
}

export const CaseLoader = ({ Component }: Props) => {
  const { id } = useParams();
  const { case_loader: klage_loader } = useTranslation();
  const [error, setError] = useState<string | null>(null);

  const [updateCase, { isLoading: isUpdating }] = useUpdateCaseMutation();
  const { data, isLoading } = useGetCaseQuery(id ?? skipToken);

  useEffect(() => {
    if (typeof id !== 'string') {
      const e = new Error('ID is missing');
      addErrorEvent(e.message, e.stack);
      sendErrorReport();
      setError(klage_loader.format_error('INGEN', e));

      console.error('ID is missing');
      redirectToNav();

      return;
    }

    if (isLoading) {
      return;
    }

    if (data === undefined) {
      const e = new Error('Case not found.');
      addErrorEvent(e.message, e.stack);
      sendErrorReport();
      setError(klage_loader.format_error(id, e));

      console.error('Case not found.');
      redirectToNav();
    }
  }, [id, data, klage_loader, updateCase, isLoading]);

  if (error !== null) {
    return <Alert variant="error">{error}</Alert>;
  }

  if (isLoading || isUpdating || data === undefined) {
    return <LoadingPage>{klage_loader.loading}</LoadingPage>;
  }

  return <Component data={data} />;
};
