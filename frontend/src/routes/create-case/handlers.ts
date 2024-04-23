import { NavigateFunction } from 'react-router-dom';
import { ISessionCase } from '@app/components/case/uinnlogget/types';
import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { Languages } from '@app/language/types';
import { AppEventEnum } from '@app/logging/error-report/action';
import { addAppEvent } from '@app/logging/error-report/error-report';
import { AppDispatch } from '@app/redux/configure-store';
import { createSessionCase } from '@app/redux/session/klage/helpers';
import { deleteSessionCase, setSessionCase, updateSessionCase } from '@app/redux/session/session';
import { useCreateCaseMutation, useResumeOrCreateCaseMutation } from '@app/redux-api/case/api';
import { CreateCaseParams } from '@app/redux-api/case/params';
import { CASE_TYPE_PATH_SEGMENTS, CaseType } from '@app/redux-api/case/types';

interface IHandler {
  language: Languages;
  internalSaksnummer: string | null;
  navigate: NavigateFunction;
  innsendingsytelse: Innsendingsytelse;
}

interface IHandleSession extends IHandler {
  dispatch: AppDispatch;
  sessionCase: ISessionCase | null;
  type: CaseType;
}

export const handleSessionCase = ({
  type,
  sessionCase,
  innsendingsytelse: ytelse,
  language,
  internalSaksnummer,
  navigate,
  dispatch,
}: IHandleSession) => {
  if (sessionCase === null) {
    addAppEvent(AppEventEnum.CREATE_SESSION_CASE);
    dispatch(
      setSessionCase({
        type,
        innsendingsytelse: ytelse,
        data: createSessionCase(type, ytelse, internalSaksnummer),
      }),
    );
  } else if (internalSaksnummer !== null && internalSaksnummer !== sessionCase.internalSaksnummer) {
    addAppEvent(AppEventEnum.RESUME_SESSION_CASE_WITH_SAKSNUMMER);
    dispatch(updateSessionCase({ type, innsendingsytelse: ytelse, data: { internalSaksnummer } }));
  } else {
    addAppEvent(AppEventEnum.RESUME_SESSION_CASE);
  }

  navigate(`/${language}/${CASE_TYPE_PATH_SEGMENTS[type]}/${ytelse}/begrunnelse`, { replace: true });
};

interface IHandleCreate extends IHandler {
  dispatch: AppDispatch;
  sessionCase: ISessionCase;
  createCase: ReturnType<typeof useCreateCaseMutation>[0];
}

export const handleCreateCase = ({
  sessionCase,
  internalSaksnummer,
  innsendingsytelse,
  language,
  createCase,
  dispatch,
  navigate,
}: IHandleCreate) => {
  addAppEvent(AppEventEnum.CREATE_CASE_FROM_SESSION_STORAGE);
  createCase(getCreatePayload(sessionCase, language, internalSaksnummer))
    .unwrap()
    .then(({ id }) => {
      dispatch(deleteSessionCase({ type: sessionCase.type, innsendingsytelse }));
      navigate(`/${language}/sak/${id}/begrunnelse`, { replace: true });
    });
};

interface IHandleResumeOrCreate extends IHandler {
  resumeOrCreateCase: ReturnType<typeof useResumeOrCreateCaseMutation>[0];
  language: Languages;
  type: CaseType;
}

export const handleResumeOrCreateCase = ({
  type,
  innsendingsytelse,
  internalSaksnummer,
  language,
  navigate,
  resumeOrCreateCase,
}: IHandleResumeOrCreate) => {
  addAppEvent(AppEventEnum.CREATE_OR_RESUME_CASE);
  resumeOrCreateCase({ innsendingsytelse, internalSaksnummer, type })
    .unwrap()
    .then(({ id }) => navigate(`/${language}/sak/${id}/begrunnelse`, { replace: true }));
};

const getCreatePayload = (
  { type, ...data }: ISessionCase,
  language: Languages,
  internalSaksnummer: string | null = null,
): CreateCaseParams => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, navn, modifiedByUser, ...rest } = data;

  return { type, ...rest, internalSaksnummer, language };
};
