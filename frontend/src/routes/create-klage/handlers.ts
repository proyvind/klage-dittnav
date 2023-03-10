import { NavigateFunction } from 'react-router-dom';
import { ISessionKlage } from '../../components/klage/uinnlogget/types';
import { Languages } from '../../language/types';
import { AppEventEnum } from '../../logging/error-report/action';
import { addAppEvent } from '../../logging/error-report/error-report';
import { AppDispatch } from '../../redux/configure-store';
import { createSessionKlage } from '../../redux/session/klage/helpers';
import { deleteSessionKlage, setSessionKlage, updateSessionKlage } from '../../redux/session/session';
import { SessionKey } from '../../redux/session/types';
import { useCreateKlageMutation, useResumeOrCreateKlageMutation } from '../../redux-api/case/klage/api';
import { NewKlage } from '../../redux-api/case/klage/types';

interface IHandler {
  language: Languages;
  internalSaksnummer: string | null;
  navigate: NavigateFunction;
  key: SessionKey;
}

interface IHandleSession extends IHandler {
  dispatch: AppDispatch;
  sessionKlage: ISessionKlage | null;
}

export const handleSessionKlage = ({
  sessionKlage,
  key,
  language,
  internalSaksnummer,
  navigate,
  dispatch,
}: IHandleSession) => {
  if (sessionKlage === null) {
    addAppEvent(AppEventEnum.CREATE_SESSION_CASE);
    dispatch(
      setSessionKlage({ key, klage: createSessionKlage(language, key.temaKey, key.titleKey, internalSaksnummer) })
    );
  } else if (internalSaksnummer !== null && internalSaksnummer !== sessionKlage.internalSaksnummer) {
    addAppEvent(AppEventEnum.RESUME_SESSION_CASE_WITH_SAKSNUMMER);
    dispatch(updateSessionKlage({ key, update: { internalSaksnummer, userSaksnummer: null } }));
  } else {
    addAppEvent(AppEventEnum.RESUME_SESSION_CASE);
  }

  const t = key.titleKey !== null && key.titleKey.length !== 0 ? key.titleKey : 'NONE';
  navigate(`/${language}/klage/uinnlogget/${key.temaKey}/${t}/begrunnelse`, { replace: true });
};

interface IHandleCreate extends IHandler {
  dispatch: AppDispatch;
  sessionKlage: ISessionKlage;
  fullmaktsgiver: string | null;
  createKlage: ReturnType<typeof useCreateKlageMutation>[0];
}

export const handleCreateKlage = ({
  sessionKlage,
  internalSaksnummer,
  fullmaktsgiver,
  key,
  language,
  createKlage,
  dispatch,
  navigate,
}: IHandleCreate) => {
  addAppEvent(AppEventEnum.CREATE_CASE_FROM_SESSION_STORAGE);
  createKlage(getCreatePayload(sessionKlage, internalSaksnummer, fullmaktsgiver))
    .unwrap()
    .then(({ id }) => {
      dispatch(deleteSessionKlage(key));
      navigate(`/${language}/klage/${id}/begrunnelse`, { replace: true });
    });
};

interface IHandleResumeOrCreate extends IHandler {
  resumeOrCreateKlage: ReturnType<typeof useResumeOrCreateKlageMutation>[0];
  fullmaktsgiver: string | null;
  language: Languages;
}

export const handleResumeOrCreateKlage = ({
  key,
  internalSaksnummer,
  fullmaktsgiver,
  language,
  navigate,
  resumeOrCreateKlage,
}: IHandleResumeOrCreate) => {
  addAppEvent(AppEventEnum.CREATE_OR_RESUME_CASE);
  resumeOrCreateKlage({ tema: key.temaKey, titleKey: key.titleKey ?? key.temaKey, internalSaksnummer, fullmaktsgiver })
    .unwrap()
    .then(({ id }) => navigate(`/${language}/klage/${id}/begrunnelse`, { replace: true }));
};

const getCreatePayload = (
  sessionKlage: ISessionKlage,
  internalSaksnummer: string | null,
  fullmaktsgiver: string | null
): NewKlage => ({
  tema: sessionKlage.tema,
  titleKey: sessionKlage.titleKey ?? sessionKlage.tema,
  checkboxesSelected: sessionKlage.checkboxesSelected,
  userSaksnummer: sessionKlage.userSaksnummer,
  language: sessionKlage.language,
  vedtakDate: sessionKlage.vedtakDate,
  internalSaksnummer,
  fritekst: sessionKlage.fritekst,
  hasVedlegg: sessionKlage.hasVedlegg,
  fullmaktsgiver,
});
