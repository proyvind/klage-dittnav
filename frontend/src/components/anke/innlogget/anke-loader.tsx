import { Alert } from '@navikt/ds-react';
import { skipToken } from '@reduxjs/toolkit/query';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from '@app/language/use-translation';
import { addErrorEvent, sendErrorReport } from '@app/logging/error-report/error-report';
import { useGetAnkeQuery, useUpdateAnkeMutation } from '@app/redux-api/case/anke/api';
import { Anke } from '@app/redux-api/case/anke/types';
import { LoadingPage } from '../../loading-page/loading-page';

interface Props {
  Component: React.ComponentType<{ anke: Anke }>;
}

export const AnkeLoader = ({ Component }: Props) => {
  const { ankeId } = useParams();
  const { anke_loader } = useTranslation();
  const [error, setError] = useState<string | null>(null);

  const [updateAnke, { isLoading: isUpdating }] = useUpdateAnkeMutation();
  const { data: anke, isLoading } = useGetAnkeQuery(ankeId ?? skipToken);

  useEffect(() => {
    if (typeof ankeId !== 'string') {
      const e = new Error('ID for anke is missing');
      addErrorEvent(e.message, e.stack);
      sendErrorReport();
      setError(anke_loader.format_error('INGEN', e));

      return;
    }

    if (isLoading) {
      return;
    }

    if (typeof anke === 'undefined') {
      const e = new Error('Anke not found.');
      addErrorEvent(e.message, e.stack);
      sendErrorReport();
      setError(anke_loader.format_error(ankeId, e));
    }
  }, [ankeId, anke, anke_loader, updateAnke, isLoading]);

  if (error !== null) {
    return <Alert variant="error">{error}</Alert>;
  }

  if (isLoading || isUpdating || typeof anke === 'undefined') {
    return <LoadingPage>{anke_loader.loading_anke}</LoadingPage>;
  }

  return <Component anke={anke} />;
};
