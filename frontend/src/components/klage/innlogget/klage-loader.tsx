import { Alert } from '@navikt/ds-react';
import { skipToken } from '@reduxjs/toolkit/query';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from '@app/language/use-translation';
import { addErrorEvent, sendErrorReport } from '@app/logging/error-report/error-report';
import { useGetKlageQuery, useUpdateKlageMutation } from '@app/redux-api/case/klage/api';
import { Klage } from '@app/redux-api/case/klage/types';
import { LoadingPage } from '../../loading-page/loading-page';

interface Props {
  Component: React.ComponentType<{ klage: Klage }>;
}

export const KlageLoader = ({ Component }: Props) => {
  const { klageId } = useParams();
  const { klage_loader } = useTranslation();
  const [error, setError] = useState<string | null>(null);

  const [updateKlage, { isLoading: isUpdating }] = useUpdateKlageMutation();
  const { data: klage, isLoading } = useGetKlageQuery(klageId ?? skipToken);

  useEffect(() => {
    if (typeof klageId !== 'string') {
      const e = new Error('ID for klage is missing');
      addErrorEvent(e.message, e.stack);
      sendErrorReport();
      setError(klage_loader.format_error('INGEN', e));

      return;
    }

    if (isLoading) {
      return;
    }

    if (typeof klage === 'undefined') {
      const e = new Error('Klage not found.');
      addErrorEvent(e.message, e.stack);
      sendErrorReport();
      setError(klage_loader.format_error(klageId, e));
    }
  }, [klageId, klage, klage_loader, updateKlage, isLoading]);

  if (error !== null) {
    return <Alert variant="error">{error}</Alert>;
  }

  if (isLoading || isUpdating || typeof klage === 'undefined') {
    return <LoadingPage>{klage_loader.loading_klage}</LoadingPage>;
  }

  return <Component klage={klage} />;
};
