import { Alert } from '@navikt/ds-react';
import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import React, { useEffect } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { displayFnr } from '../functions/display';
import { useTitleKey } from '../hooks/use-titles';
import { useLanguage } from '../language/use-language';
import { useTranslation } from '../language/use-translation';
import { LoadingPage } from '../loading-page/loading-page';
import { getQueryValue } from '../query/get-query-value';
import { useCreateKlageMutation } from '../redux-api/case/klage/api';
import { useGetFullmaktsgiverQuery } from '../redux-api/user/api';
import { TemaKey, ensureStringIsTema } from '../tema/tema';

export const CreateKlage = () => {
  const [query] = useSearchParams();
  const language = useLanguage();
  const { klage_create, klage_loader, fullmakt } = useTranslation();

  const tema = query.get('tema');

  const titleKey = useTitleKey(getQueryValue(query.get('tittel')));
  const temaKey = ensureStringIsTema(getQueryValue(tema));
  const ytelse = getQueryValue(query.get('ytelse'));
  const saksnummer = getQueryValue(query.get('saksnummer'));
  const fullmaktsgiver = getQueryValue(query.get('fullmaktsgiver'));

  const [hasFullmaktsgiver, hasFullmaktsgiverIsLoading] = useHasFullmaktsgiver(temaKey, fullmaktsgiver);

  const [createKlage, { data: klage, isLoading, isError: createHasFailed }] = useCreateKlageMutation();

  useEffect(() => {
    if (createHasFailed) {
      return;
    }

    if (temaKey === null) {
      return;
    }

    if (hasFullmaktsgiverIsLoading || isLoading) {
      return;
    }

    if (fullmaktsgiver !== null && !hasFullmaktsgiver) {
      return;
    }

    createKlage({
      tema: temaKey,
      titleKey: titleKey ?? undefined,
      ytelse: ytelse ?? undefined,
      internalSaksnummer: saksnummer,
      fullmaktsgiver,
    });
  }, [
    temaKey,
    klage_create,
    tema,
    hasFullmaktsgiverIsLoading,
    createKlage,
    titleKey,
    ytelse,
    saksnummer,
    fullmaktsgiver,
    language,
    isLoading,
    hasFullmaktsgiver,
    createHasFailed,
  ]);

  if (temaKey === null) {
    return <Alert variant="error">{klage_create.invalid_tema(tema?.toString())}</Alert>;
  }

  if (createHasFailed) {
    return <Alert variant="error">{klage_create.create_error}</Alert>;
  }

  if (fullmaktsgiver !== null && !hasFullmaktsgiver && !hasFullmaktsgiverIsLoading) {
    const error = klage_create.finne_fullmaktsgiver_error(displayFnr(fullmaktsgiver));
    return <Alert variant="error">{error}</Alert>;
  }

  if (hasFullmaktsgiverIsLoading) {
    return <LoadingPage>{fullmakt.loading}</LoadingPage>;
  }

  if (isLoading || typeof klage === 'undefined') {
    return <LoadingPage>{klage_loader.loading_klage}</LoadingPage>;
  }

  return <Navigate to={`/${language}/klage/${klage.id}/begrunnelse`} />;
};

const useHasFullmaktsgiver = (temaKey: TemaKey | null, fullmaktsgiver: string | null): [boolean, boolean] => {
  const query = temaKey === null || fullmaktsgiver === null ? skipToken : { temaKey, fullmaktsgiver };
  const { isLoading, isFetching, isSuccess } = useGetFullmaktsgiverQuery(query);

  return [isSuccess, isLoading || isFetching];
};
