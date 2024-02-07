import { NavigateFunction } from 'react-router-dom';
import { ISessionKlage } from '@app/components/klage/uinnlogget/types';
import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { Languages } from '@app/language/types';
import { AppEventEnum } from '@app/logging/error-report/action';
import { addAppEvent } from '@app/logging/error-report/error-report';
import { AppDispatch } from '@app/redux/configure-store';
import { createSessionKlage } from '@app/redux/session/klage/helpers';
import { deleteSessionKlage, setSessionKlage, updateSessionKlage } from '@app/redux/session/session';
import { useCreateKlageMutation, useResumeOrCreateKlageMutation } from '@app/redux-api/case/klage/api';
import { NewKlage } from '@app/redux-api/case/klage/types';

interface IHandler {
  language: Languages;
  internalSaksnummer: string | null;
  navigate: NavigateFunction;
  innsendingsytelse: Innsendingsytelse;
}

interface IHandleSession extends IHandler {
  dispatch: AppDispatch;
  sessionKlage: ISessionKlage | null;
}

export const handleSessionKlage = ({
  sessionKlage,
  innsendingsytelse: key,
  language,
  internalSaksnummer,
  navigate,
  dispatch,
}: IHandleSession) => {
  if (sessionKlage === null) {
    addAppEvent(AppEventEnum.CREATE_SESSION_CASE);
    dispatch(setSessionKlage({ key, klage: createSessionKlage(language, key, internalSaksnummer) }));
  } else if (internalSaksnummer !== null && internalSaksnummer !== sessionKlage.internalSaksnummer) {
    addAppEvent(AppEventEnum.RESUME_SESSION_CASE_WITH_SAKSNUMMER);
    dispatch(updateSessionKlage({ key, update: { internalSaksnummer, userSaksnummer: null } }));
  } else {
    addAppEvent(AppEventEnum.RESUME_SESSION_CASE);
  }

  navigate(`/${language}/klage/${key}/begrunnelse`, { replace: true });
};

interface IHandleCreate extends IHandler {
  dispatch: AppDispatch;
  sessionKlage: ISessionKlage;
  createKlage: ReturnType<typeof useCreateKlageMutation>[0];
}

export const handleCreateKlage = ({
  sessionKlage,
  internalSaksnummer,
  innsendingsytelse: key,
  language,
  createKlage,
  dispatch,
  navigate,
}: IHandleCreate) => {
  addAppEvent(AppEventEnum.CREATE_CASE_FROM_SESSION_STORAGE);
  createKlage(getCreatePayload(sessionKlage, internalSaksnummer))
    .unwrap()
    .then(({ id }) => {
      dispatch(deleteSessionKlage(key));
      navigate(`/${language}/klage/${id}/begrunnelse`, { replace: true });
    });
};

interface IHandleResumeOrCreate extends IHandler {
  resumeOrCreateKlage: ReturnType<typeof useResumeOrCreateKlageMutation>[0];
  language: Languages;
}

export const handleResumeOrCreateKlage = ({
  innsendingsytelse,
  internalSaksnummer,
  language,
  navigate,
  resumeOrCreateKlage,
}: IHandleResumeOrCreate) => {
  addAppEvent(AppEventEnum.CREATE_OR_RESUME_CASE);
  resumeOrCreateKlage({ innsendingsytelse, internalSaksnummer })
    .unwrap()
    .then(({ id }) => navigate(`/${language}/klage/${id}/begrunnelse`, { replace: true }));
};

const getCreatePayload = (sessionKlage: ISessionKlage, internalSaksnummer: string | null): NewKlage => ({
  innsendingsytelse: sessionKlage.innsendingsytelse,
  checkboxesSelected: sessionKlage.checkboxesSelected,
  userSaksnummer: sessionKlage.userSaksnummer,
  language: sessionKlage.language,
  vedtakDate: sessionKlage.vedtakDate,
  internalSaksnummer,
  fritekst: sessionKlage.fritekst,
  hasVedlegg: sessionKlage.hasVedlegg,
});
