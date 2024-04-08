import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { ISessionCase } from '@app/components/case/uinnlogget/types';
import { addSessionEvent } from '@app/logging/error-report/error-report';
import { State } from '@app/redux/session/type';
import { createSessionCase, getSessionCaseKey } from './helpers';
import { readSessionCase, removeSessionCase, saveSessionCase } from './storage';
import { SessionCaseCreate, SessionCaseLoad, SessionCasePayload, SessionCaseRemove, SessionCaseUpdate } from './types';

const setSessionCase: CaseReducer<State, PayloadAction<SessionCasePayload>> = (state, { payload }) => {
  addSessionEvent('Set session case');

  const { type, innsendingsytelse, data } = payload;

  saveSessionCase(innsendingsytelse, data);

  return setState(state, getSessionCaseKey(type, innsendingsytelse), data);
};

const updateSessionCase: CaseReducer<State, PayloadAction<SessionCaseUpdate>> = (state, { payload }) => {
  addSessionEvent('Update session case');

  const { type, innsendingsytelse, data } = payload;

  const caseKey = getSessionCaseKey(type, innsendingsytelse);
  const existing = getState(state, caseKey);

  if (existing === undefined) {
    throw new Error(`Case with ID ${caseKey} does not exist`);
  }

  const updated = updateSessionCaseData(existing, data);

  const key = saveSessionCase(innsendingsytelse, updated);

  return setState(state, key, updated);
};

const loadSessionCase: CaseReducer<State, PayloadAction<SessionCaseLoad>> = (state, { payload }) => {
  addSessionEvent('Load session case');

  const { innsendingsytelse, type } = payload;

  const sessionKey = getSessionCaseKey(type, innsendingsytelse);
  const savedCase = readSessionCase(sessionKey);

  if (savedCase === undefined) {
    return state;
  }

  return setState(state, sessionKey, savedCase);
};

// Read from session storage if it exists, otherwise save to session storage.
const loadOrCreateSessionCase: CaseReducer<State, PayloadAction<SessionCaseCreate>> = (state, { payload }) => {
  addSessionEvent('Load or create session case');

  const { innsendingsytelse, data, type } = payload;

  const sessionKey = getSessionCaseKey(type, innsendingsytelse);
  const savedCase = readSessionCase(sessionKey);

  if (savedCase === undefined) {
    const newCase = createSessionCase(type, data.innsendingsytelse, data.internalSaksnummer);

    const key = saveSessionCase(innsendingsytelse, newCase);

    return setState(state, key, newCase);
  }

  return setState(state, sessionKey, savedCase);
};

const setState = (state: State, key: string, data: ISessionCase) => {
  state[key] = data;

  return state;
};

const getState = (state: State, key: string) => state[key];

const updateSessionCaseData = <T extends ISessionCase>(data: T, update: Partial<T>): ISessionCase => ({
  ...data,
  ...update,
  modifiedByUser: new Date().toISOString(),
});

const deleteSessionCase: CaseReducer<State, PayloadAction<SessionCaseRemove>> = (state, { payload }) => {
  addSessionEvent('Delete session case');

  const key = removeSessionCase(getSessionCaseKey(payload.type, payload.innsendingsytelse));

  delete state[key];

  return state;
};

export const caseReducers = {
  setSessionCase,
  updateSessionCase,
  loadSessionCase,
  deleteSessionCase,
  loadOrCreateSessionCase,
};
