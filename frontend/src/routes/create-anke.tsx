import { Alert } from '@navikt/ds-react';
import React, { useEffect } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useLanguage } from '../language/use-language';
import { useTranslation } from '../language/use-translation';
import { LoadingPage } from '../loading-page/loading-page';
import { getQueryValue } from '../query/get-query-value';
import { useCreateAnkeMutation } from '../redux-api/case/anke/api';

export const CreateAnke = () => {
  const { search } = useLocation();
  const language = useLanguage();
  const { anke_create, anke_loader } = useTranslation();
  const { saksnummer } = useParams();
  const ankeInternalSaksnummer = getQueryValue(saksnummer);
  const [resumeOrCreateAnke, { isError, isLoading, data: anke }] = useCreateAnkeMutation();

  useEffect(() => {
    if (ankeInternalSaksnummer === null) {
      return;
    }

    resumeOrCreateAnke({ language, ankeInternalSaksnummer });
  }, [search, anke, anke_create, language, saksnummer, ankeInternalSaksnummer, resumeOrCreateAnke]);

  if (isError || ankeInternalSaksnummer === null) {
    return <Alert variant="error">{anke_create.create_error}</Alert>;
  }

  if (isLoading || typeof anke === 'undefined') {
    return <LoadingPage>{anke_loader.loading_anke}</LoadingPage>;
  }

  return <Navigate to={`/${language}/anke/${anke.ankeInternalSaksnummer}/begrunnelse`} replace />;
};
