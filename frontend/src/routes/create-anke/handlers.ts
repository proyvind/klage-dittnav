import { NavigateFunction } from 'react-router';
import { Languages } from '../../language/types';
import { AppEventEnum } from '../../logging/error-report/action';
import { addAppEvent } from '../../logging/error-report/error-report';
import { AppDispatch } from '../../redux/configure-store';
import { createSessionAnke } from '../../redux/session/anke/helpers';
import { deleteSessionAnke, setSessionAnke, updateSessionAnke } from '../../redux/session/session';
import { SessionKey } from '../../redux/session/types';
import { useCreateAnkeMutation, useResumeOrCreateAnkeMutation } from '../../redux-api/case/anke/api';
import { NewAnke } from '../../redux-api/case/anke/types';
import { ISessionAnke } from './../../components/anke/uinnlogget/types';

interface IHandler {
  language: Languages;
  internalSaksnummer: string | null;
  navigate: NavigateFunction;
  key: SessionKey;
}

interface IHandleSession extends IHandler {
  dispatch: AppDispatch;
  sessionAnke: ISessionAnke | null;
}

export const handleSessionAnke = ({
  dispatch,
  internalSaksnummer,
  key,
  language,
  navigate,
  sessionAnke,
}: IHandleSession) => {
  if (sessionAnke === null) {
    addAppEvent(AppEventEnum.CREATE_SESSION_CASE);
    dispatch(setSessionAnke({ key, anke: createSessionAnke(language, key.temaKey, key.titleKey, internalSaksnummer) }));
  } else if (internalSaksnummer !== null && internalSaksnummer !== sessionAnke.internalSaksnummer) {
    addAppEvent(AppEventEnum.RESUME_SESSION_CASE_WITH_SAKSNUMMER);
    dispatch(updateSessionAnke({ key, update: { internalSaksnummer, userSaksnummer: null } }));
  } else {
    addAppEvent(AppEventEnum.RESUME_SESSION_CASE);
  }

  const t = key.titleKey !== null && key.titleKey.length !== 0 ? key.titleKey : 'NONE';
  navigate(`/${language}/anke/uinnlogget/${key.temaKey}/${t}/begrunnelse`, { replace: true });
};

interface IHandleCreate extends IHandler {
  dispatch: AppDispatch;
  sessionAnke: ISessionAnke;
  createAnke: ReturnType<typeof useCreateAnkeMutation>[0];
}

export const handleCreateAnke = ({
  createAnke,
  dispatch,
  internalSaksnummer,
  language,
  navigate,
  sessionAnke,
  key,
}: IHandleCreate) => {
  addAppEvent(AppEventEnum.CREATE_CASE_FROM_SESSION_STORAGE);
  createAnke(getCreatePayload(sessionAnke, internalSaksnummer))
    .unwrap()
    .then((anke) => {
      dispatch(deleteSessionAnke(key));
      navigate(`/${language}/anke/${anke.id}/begrunnelse`, { replace: true });
    });
};

const getCreatePayload = (sessionAnke: ISessionAnke, internalSaksnummer: string | null): NewAnke => ({
  tema: sessionAnke.tema,
  titleKey: sessionAnke.titleKey ?? sessionAnke.tema,
  userSaksnummer: sessionAnke.userSaksnummer,
  language: sessionAnke.language,
  vedtakDate: sessionAnke.vedtakDate,
  internalSaksnummer,
  fritekst: sessionAnke.fritekst,
  enhetsnummer: sessionAnke.enhetsnummer,
  hasVedlegg: sessionAnke.hasVedlegg,
});

interface IHandleResumeOrCreate extends IHandler {
  resumeOrCreateAnke: ReturnType<typeof useResumeOrCreateAnkeMutation>[0];
}

export const handleResumeOrCreateAnke = ({
  internalSaksnummer,
  language,
  navigate,
  resumeOrCreateAnke,
  key,
}: IHandleResumeOrCreate) => {
  addAppEvent(AppEventEnum.CREATE_OR_RESUME_CASE);
  resumeOrCreateAnke({ tema: key.temaKey, titleKey: key.titleKey ?? key.temaKey, internalSaksnummer })
    .unwrap()
    .then((anke) => navigate(`/${language}/anke/${anke.id}/begrunnelse`, { replace: true }));
};
