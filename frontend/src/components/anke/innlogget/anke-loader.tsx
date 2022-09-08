import { Alert } from '@navikt/ds-react';
import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { arraysShallowMatch } from '../../../functions/arrays';
import { useTranslation } from '../../../language/use-translation';
import { AppEventEnum } from '../../../logging/error-report/action';
import { addAppEvent, addErrorEvent, sendErrorReport } from '../../../logging/error-report/error-report';
import { useGetAnkeQuery, useUpdateAnkeMutation } from '../../../redux-api/case/anke/api';
import { Anke, UPDATABLE_KEYS } from '../../../redux-api/case/anke/types';
import { CaseStatus } from '../../../redux-api/case/types';
import { LoadingPage } from '../../loading-page/loading-page';
import { ankeStore } from './anke-store';

interface Props {
  Component: React.ComponentType<{ anke: Anke }>;
}

export const AnkeLoader = ({ Component }: Props) => {
  const { ankeId } = useParams();
  const { anke_loader } = useTranslation();
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState(anke_loader.loading_anke);

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

      return;
    }

    if (anke.status !== CaseStatus.DRAFT) {
      return;
    }

    setStatus(anke_loader.restoring);

    addAppEvent(AppEventEnum.CASE_FROM_SESSION_STORAGE);
    const local = ankeStore.get();

    Promise.all(
      UPDATABLE_KEYS.map(async (key) => {
        const value = local[key];

        if (typeof value === 'undefined') {
          return;
        }

        const storedValue = anke[key];

        if (Array.isArray(value) && Array.isArray(storedValue) && arraysShallowMatch(value, storedValue)) {
          return;
        }

        if (storedValue !== value) {
          addAppEvent(AppEventEnum.UPDATE_CASE_FROM_SESSION_STORAGE);

          return updateAnke({ id: ankeId, key, value }).unwrap();
        }
      })
    ).finally(ankeStore.clear);
  }, [ankeId, anke, anke_loader, updateAnke, isLoading]);

  if (error !== null) {
    return <Alert variant="error">{error}</Alert>;
  }

  if (isLoading || isUpdating || typeof anke === 'undefined') {
    return <LoadingPage>{status}</LoadingPage>;
  }

  return <Component anke={anke} />;
};
