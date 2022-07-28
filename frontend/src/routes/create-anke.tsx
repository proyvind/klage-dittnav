import { Alert } from '@navikt/ds-react';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import React, { useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LoadingPage } from '../components/loading-page/loading-page';
import { getQueryValue } from '../functions/get-query-value';
import { useSessionAnke } from '../hooks/use-session-anke';
import { useIsAuthenticated, useUser } from '../hooks/use-user';
import { useLanguage } from '../language/use-language';
import { useTranslation } from '../language/use-translation';
import { useCreateAnkeMutation, useResumeOrCreateAnkeMutation } from '../redux-api/case/anke/api';
import { useAppDispatch } from '../redux/configure-store';
import { createSessionAnke } from '../redux/session/anke/helpers';
import { deleteSessionAnke, setSessionAnke } from '../redux/session/session';
import { ensureStringIsTema } from '../tema/tema';

export const CreateAnke = () => {
  const [query] = useSearchParams();
  const language = useLanguage();
  const navigate = useNavigate();
  const { anke_create, anke_loader } = useTranslation();
  const { isLoading: authIsLoading, data: isAuthenticated } = useIsAuthenticated();
  const { data: user, isLoading: userIsLoading } = useUser();

  const tema = query.get('tema');

  const temaKey = ensureStringIsTema(getQueryValue(tema));
  const titleKey = getQueryValue(query.get('tittel'));
  const saksnummer = getQueryValue(query.get('saksnummer'));

  const [resumeOrCreateAnke, { isLoading: resumeIsLoading, isError: resumeHasFailed, isSuccess: resumeIsSuccess }] =
    useResumeOrCreateAnkeMutation();

  const [createAnke, { isLoading: createIsLoading, isError: createHasFailed, isSuccess: createIsSuccess }] =
    useCreateAnkeMutation();

  const key = useMemo(() => {
    if (typeof saksnummer === 'string') {
      return saksnummer;
    }

    if (temaKey === null) {
      return skipToken;
    }

    return { temaKey, titleKey };
  }, [saksnummer, temaKey, titleKey]);

  const sessionAnke = useSessionAnke(key);
  const dispatch = useAppDispatch();

  const sessionAnkeIsLoading = typeof sessionAnke === 'undefined';

  const isInitialized = useMemo(
    () =>
      createIsSuccess ||
      resumeIsSuccess ||
      authIsLoading ||
      userIsLoading ||
      resumeIsLoading ||
      createIsLoading ||
      createHasFailed ||
      resumeHasFailed ||
      sessionAnkeIsLoading,
    [
      authIsLoading,
      createHasFailed,
      createIsLoading,
      createIsSuccess,
      resumeHasFailed,
      resumeIsLoading,
      resumeIsSuccess,
      sessionAnkeIsLoading,
      userIsLoading,
    ]
  );

  useEffect(() => {
    if (isInitialized || temaKey === null || isAuthenticated === true) {
      return;
    }

    if (!sessionAnkeIsLoading && sessionAnke === null && key !== skipToken) {
      dispatch(
        setSessionAnke({
          key,
          anke: createSessionAnke(language, temaKey, titleKey, saksnummer),
        })
      );
    }

    const q = saksnummer !== null && saksnummer.length !== 0 ? `?saksnummer=${saksnummer}` : '';
    const t = titleKey !== null && titleKey.length !== 0 ? titleKey : 'NONE';
    navigate(`/${language}/anke/uinnlogget/${temaKey}/${t}/begrunnelse${q}`, { replace: true });
  }, [
    dispatch,
    isAuthenticated,
    language,
    isInitialized,
    saksnummer,
    temaKey,
    titleKey,
    sessionAnkeIsLoading,
    sessionAnke,
    key,
    navigate,
  ]);

  useEffect(() => {
    if (isInitialized || temaKey === null || isAuthenticated === false) {
      return;
    }

    if (
      !sessionAnkeIsLoading &&
      sessionAnke !== null &&
      key !== skipToken &&
      sessionAnke.foedselsnummer === user?.folkeregisteridentifikator?.identifikasjonsnummer
    ) {
      createAnke({
        fritekst: sessionAnke.fritekst,
        hasVedlegg: sessionAnke.hasVedlegg,
        tema: sessionAnke.tema,
        vedtakDate: sessionAnke.vedtakDate ?? undefined,
      })
        .unwrap()
        .then((anke) => {
          dispatch(deleteSessionAnke(key));
          navigate(`/${language}/anke/${anke.id}/begrunnelse`, { replace: true });
        });

      return;
    }

    resumeOrCreateAnke({ tema: temaKey, titleKey })
      .unwrap()
      .then((anke) => navigate(`/${language}/anke/${anke.id}/begrunnelse`, { replace: true }));
  }, [
    isAuthenticated,
    language,
    isInitialized,
    navigate,
    saksnummer,
    temaKey,
    titleKey,
    sessionAnkeIsLoading,
    dispatch,
    sessionAnke,
    key,
    createAnke,
    resumeOrCreateAnke,
    user?.folkeregisteridentifikator?.identifikasjonsnummer,
  ]);

  if (temaKey === null) {
    return <Alert variant="error">{anke_create.invalid_tema(tema?.toString())}</Alert>;
  }

  if (createHasFailed || resumeHasFailed) {
    return <Alert variant="error">{anke_create.create_error}</Alert>;
  }

  if (createIsLoading || resumeIsLoading) {
    return <LoadingPage>{anke_loader.loading_anke}</LoadingPage>;
  }

  return <LoadingPage>{anke_loader.loading_anke}</LoadingPage>;
};

export default CreateAnke;
