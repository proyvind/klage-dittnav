import { Alert } from '@navikt/ds-react';
import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import React, { useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LoadingPage } from '../components/loading-page/loading-page';
import { displayFnr } from '../functions/display';
import { getQueryValue } from '../functions/get-query-value';
import { useSessionKlage } from '../hooks/use-session-klage';
import { useIsAuthenticated, useUser } from '../hooks/use-user';
import { useLanguage } from '../language/use-language';
import { useTranslation } from '../language/use-translation';
import { AppEventEnum } from '../logging/error-report/action';
import { addAppEvent } from '../logging/error-report/error-report';
import { useAppDispatch } from '../redux/configure-store';
import { createSessionKlage } from '../redux/session/klage/helpers';
import { deleteSessionKlage, setSessionKlage } from '../redux/session/session';
import { useCreateKlageMutation, useResumeOrCreateKlageMutation } from '../redux-api/case/klage/api';
import { useGetFullmaktsgiverQuery } from '../redux-api/user/api';
import { TemaKey, ensureStringIsTema } from '../tema/tema';

export const CreateKlage = () => {
  const [query] = useSearchParams();
  const language = useLanguage();
  const navigate = useNavigate();
  const { klage_create, klage_loader, fullmakt } = useTranslation();
  const { isLoading: authIsLoading, data: isAuthenticated } = useIsAuthenticated();
  const { data: user, isLoading: userIsLoading } = useUser();

  const tema = query.get('tema');

  const temaKey = ensureStringIsTema(getQueryValue(tema));
  const titleKey = getQueryValue(query.get('tittel'));
  const saksnummer = getQueryValue(query.get('saksnummer'));

  const fullmaktsgiver = getQueryValue(query.get('fullmaktsgiver'));

  const [hasFullmaktsgiver, hasFullmaktsgiverIsLoading] = useHasFullmaktsgiver(temaKey, fullmaktsgiver);

  const [createKlage, { isLoading: createIsLoading, isError: createHasFailed, isSuccess: createIsSuccess }] =
    useCreateKlageMutation();

  const [resumeOrCreateKlage, { isLoading: resumeIsLoading, isError: resumeHasFailed, isSuccess: resumeIsSuccess }] =
    useResumeOrCreateKlageMutation();

  const sessionKlage = useSessionKlage(temaKey, titleKey);
  const dispatch = useAppDispatch();

  const sessionKlageIsLoading = typeof sessionKlage === 'undefined';

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
      sessionKlageIsLoading,
    [
      authIsLoading,
      createHasFailed,
      createIsLoading,
      createIsSuccess,
      resumeHasFailed,
      resumeIsLoading,
      resumeIsSuccess,
      sessionKlageIsLoading,
      userIsLoading,
    ]
  );

  useEffect(() => {
    if (isInitialized || temaKey === null || isAuthenticated === true) {
      return;
    }

    if (!sessionKlageIsLoading) {
      if (sessionKlage === null) {
        addAppEvent(AppEventEnum.CREATE_SESSION_CASE);
        dispatch(
          setSessionKlage({
            key: { temaKey, titleKey },
            klage: createSessionKlage(language, temaKey, titleKey, saksnummer),
          })
        );
      } else {
        addAppEvent(AppEventEnum.RESUME_SESSION_CASE);
      }
    }

    const q = saksnummer !== null && saksnummer.length !== 0 ? `?saksnummer=${saksnummer}` : '';
    const t = titleKey !== null && titleKey.length !== 0 ? titleKey : 'NONE';
    navigate(`/${language}/klage/uinnlogget/${temaKey}/${t}/begrunnelse${q}`, { replace: true });
  }, [
    dispatch,
    isAuthenticated,
    language,
    isInitialized,
    navigate,
    saksnummer,
    temaKey,
    titleKey,
    sessionKlage,
    sessionKlageIsLoading,
    authIsLoading,
    userIsLoading,
  ]);

  useEffect(() => {
    if (isInitialized || temaKey === null || isAuthenticated === false) {
      return;
    }

    if (hasFullmaktsgiverIsLoading || (fullmaktsgiver !== null && !hasFullmaktsgiver)) {
      return;
    }

    if (
      !sessionKlageIsLoading &&
      sessionKlage !== null &&
      sessionKlage.foedselsnummer === user?.folkeregisteridentifikator?.identifikasjonsnummer
    ) {
      addAppEvent(AppEventEnum.CREATE_CASE_FROM_SESSION_STORAGE);
      createKlage({
        tema: sessionKlage.tema,
        titleKey: sessionKlage.titleKey ?? sessionKlage.tema,
        checkboxesSelected: sessionKlage.checkboxesSelected,
        userSaksnummer: sessionKlage.userSaksnummer,
        language: sessionKlage.language,
        vedtakDate: sessionKlage.vedtakDate,
        internalSaksnummer: saksnummer,
        fritekst: sessionKlage.fritekst,
        hasVedlegg: sessionKlage.hasVedlegg,
        fullmaktsgiver,
      })
        .unwrap()
        .then(({ id }) => {
          dispatch(deleteSessionKlage({ temaKey, titleKey }));
          navigate(`/${language}/klage/${id}/begrunnelse`, { replace: true });
        });

      return;
    }

    addAppEvent(AppEventEnum.CREATE_OR_RESUME_CASE);
    resumeOrCreateKlage({
      tema: temaKey,
      titleKey: titleKey ?? temaKey,
      internalSaksnummer: saksnummer,
      fullmaktsgiver,
    })
      .unwrap()
      .then(({ id }) => navigate(`/${language}/klage/${id}/begrunnelse`, { replace: true }));
  }, [
    createKlage,
    fullmaktsgiver,
    hasFullmaktsgiver,
    hasFullmaktsgiverIsLoading,
    isAuthenticated,
    language,
    isInitialized,
    navigate,
    resumeOrCreateKlage,
    saksnummer,
    sessionKlage,
    temaKey,
    titleKey,
    sessionKlageIsLoading,
    dispatch,
    user?.folkeregisteridentifikator?.identifikasjonsnummer,
  ]);

  if (temaKey === null) {
    return <Alert variant="error">{klage_create.invalid_tema(tema?.toString())}</Alert>;
  }

  if (createHasFailed || resumeHasFailed) {
    return <Alert variant="error">{klage_create.create_error}</Alert>;
  }

  if (fullmaktsgiver !== null && !hasFullmaktsgiver && !hasFullmaktsgiverIsLoading) {
    const error = klage_create.finne_fullmaktsgiver_error(displayFnr(fullmaktsgiver));

    return <Alert variant="error">{error}</Alert>;
  }

  if (hasFullmaktsgiverIsLoading) {
    return <LoadingPage>{fullmakt.loading}</LoadingPage>;
  }

  if (createIsLoading || resumeIsLoading) {
    return <LoadingPage>{klage_loader.loading_klage}</LoadingPage>;
  }

  return <LoadingPage>{klage_loader.loading_klage}</LoadingPage>;
};

const useHasFullmaktsgiver = (temaKey: TemaKey | null, fullmaktsgiver: string | null): [boolean, boolean] => {
  const query = temaKey === null || fullmaktsgiver === null ? skipToken : { temaKey, fullmaktsgiver };
  const { isLoading, isFetching, isSuccess } = useGetFullmaktsgiverQuery(query);

  return [isSuccess, isLoading || isFetching];
};
