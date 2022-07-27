import { Alert } from '@navikt/ds-react';
import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { arraysShallowMatch } from '../../functions/arrays';
import { useTranslation } from '../../language/use-translation';
import { LoadingPage } from '../../loading-page/loading-page';
import { useGetKlageQuery, useUpdateKlageMutation } from '../../redux-api/case/klage/api';
import { Klage, UPDATABLE_KEYS } from '../../redux-api/case/klage/types';
import { CaseStatus } from '../../redux-api/case/types';
import { useLazyGetFullmaktsgiverQuery } from '../../redux-api/user/api';
import { klageStore } from './klage-store';

interface Props {
  Component: React.ComponentType<{ klage: Klage }>;
}

export const KlageLoader = ({ Component }: Props) => {
  const { klageId } = useParams();
  const { klage_loader } = useTranslation();
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState(klage_loader.loading_klage);

  const [updateKlage, { isLoading: isUpdating }] = useUpdateKlageMutation();
  const { data: klage, isLoading } = useGetKlageQuery(klageId ?? skipToken);
  const [getFullmaktsgiver] = useLazyGetFullmaktsgiverQuery();

  useEffect(() => {
    if (typeof klageId !== 'string') {
      setError(klage_loader.format_error('INGEN', new Error('Missing ID.')));
      return;
    }

    if (isLoading) {
      return;
    }

    if (typeof klage === 'undefined') {
      setError(klage_loader.format_error(klageId, new Error('Klage not found.')));
      return;
    }

    if (klage.fullmaktsgiver !== null) {
      getFullmaktsgiver({ temaKey: klage.tema, fullmaktsgiver: klage.fullmaktsgiver });
    }

    if (klage.status !== CaseStatus.DRAFT) {
      return;
    }

    setStatus(klage_loader.restoring);

    const local = klageStore.get();

    Promise.all(
      UPDATABLE_KEYS.map(async (key) => {
        const value = local[key];

        if (typeof value === 'undefined') {
          return;
        }

        const storedValue = klage[key];

        if (Array.isArray(value) && Array.isArray(storedValue) && arraysShallowMatch(value, storedValue)) {
          return;
        }

        if (storedValue !== value) {
          return updateKlage({ id: klageId, key, value }).unwrap();
        }
      })
    ).finally(klageStore.clear);
  }, [klageId, klage, klage_loader, updateKlage, getFullmaktsgiver, isLoading]);

  if (error !== null) {
    return <Alert variant="error">{error}</Alert>;
  }

  if (isLoading || isUpdating || typeof klage === 'undefined') {
    return <LoadingPage>{status}</LoadingPage>;
  }

  return <Component klage={klage} />;
};
