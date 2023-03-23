import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import dayjs, { extend } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { addSessionEvent } from '../../../logging/error-report/error-report';
import { SessionKey, State } from '../types';
import { getSessionAnkeKey } from './helpers';
import { readSessionAnke, saveSessionAnke } from './storage';
import { SessionAnkePayload, SessionAnkeUpdate } from './types';

extend(utc);

const setSessionAnke: CaseReducer<State, PayloadAction<SessionAnkePayload>> = (state, { payload }) => {
  addSessionEvent('Set session anke');

  const { key, anke } = payload;

  const ankeKey = getSessionAnkeKey(key);

  if (anke === null) {
    saveSessionAnke(key, null);

    delete state.anker[ankeKey];

    return state;
  }

  saveSessionAnke(key, anke);

  state.anker[ankeKey] = anke;

  return state;
};

const updateSessionAnke: CaseReducer<State, PayloadAction<SessionAnkeUpdate>> = (state, { payload }) => {
  addSessionEvent('Update session anke');

  const { key, update } = payload;

  const ankeKey = getSessionAnkeKey(key);
  const anke = state.anker[ankeKey];

  if (typeof anke === 'undefined' || anke === null) {
    throw new Error('Anke does not exist');
  }

  if (key !== anke.innsendingsytelse) {
    throw new Error('Innsendingsytelse must match');
  }

  const updated = { ...anke, ...update, modifiedByUser: dayjs().utc(true).toISOString() };

  saveSessionAnke(key, updated);

  state.anker[ankeKey] = updated;

  return state;
};

// Read from session storage if it exists, otherwise save to session storage.
const loadSessionAnke: CaseReducer<State, PayloadAction<SessionAnkePayload>> = (state, { payload }) => {
  addSessionEvent('Load session anke');

  const { key, anke } = payload;

  const savedAnke = readSessionAnke(key);
  const sessionKey = getSessionAnkeKey(key);

  if (typeof savedAnke === 'undefined') {
    if (anke === null) {
      delete state.anker[sessionKey];

      return state;
    }

    saveSessionAnke(key, anke);

    state.anker[sessionKey] = anke;

    return state;
  }

  state.anker[sessionKey] = savedAnke;

  return state;
};

const deleteSessionAnke: CaseReducer<State, PayloadAction<SessionKey>> = (state, { payload }) => {
  addSessionEvent('Delete session anke');

  const key = saveSessionAnke(payload, null);

  delete state.anker[key];

  return state;
};

export const ankeReducers = {
  setSessionAnke,
  loadSessionAnke,
  updateSessionAnke,
  deleteSessionAnke,
};
