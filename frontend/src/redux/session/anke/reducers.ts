import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { addSessionEvent } from '../../../logging/error-report/error-report';
import { State } from '../types';
import { getSessionAnkeKey } from './helpers';
import { readSessionAnke, saveSessionAnke } from './storage';
import { SessionAnkeKey, SessionAnkePayload, SessionAnkeUpdate } from './types';

dayjs.extend(utc);

const setSessionAnke: CaseReducer<State, PayloadAction<SessionAnkePayload>> = (state, { payload }) => {
  const { key, anke } = payload;

  addSessionEvent('setSessionAnke', key);

  const ankeKey = getSessionAnkeKey(key);

  if (anke === null) {
    saveSessionAnke(null, key);

    delete state.anker[ankeKey];

    return state;
  }

  saveSessionAnke(anke, key);

  state.anker[ankeKey] = anke;

  return state;
};

const updateSessionAnke: CaseReducer<State, PayloadAction<SessionAnkeUpdate>> = (state, { payload }) => {
  const { key, update } = payload;

  addSessionEvent('updateSessionAnke', key);

  const ankeKey = getSessionAnkeKey(key);
  const anke = state.anker[ankeKey];

  if (typeof anke === 'undefined' || anke === null) {
    throw new Error('Anke does not exist');
  }

  const updated = { ...anke, ...update, modifiedByUser: dayjs().utc(true).toISOString() };

  saveSessionAnke(updated, key);

  state.anker[ankeKey] = updated;

  return state;
};

const loadSessionAnke: CaseReducer<State, PayloadAction<SessionAnkePayload>> = (state, { payload }) => {
  const { key, anke } = payload;

  addSessionEvent('loadSessionAnke', key);

  const savedAnke = readSessionAnke(key);
  const sessionKey = getSessionAnkeKey(key);

  if (typeof savedAnke === 'undefined') {
    if (anke === null) {
      state.anker[sessionKey] = null;

      return state;
    }

    saveSessionAnke(anke, key);

    state.anker[sessionKey] = anke;

    return state;
  }

  state.anker[sessionKey] = savedAnke;

  return state;
};

const deleteSessionAnke: CaseReducer<State, PayloadAction<SessionAnkeKey>> = (state, { payload }) => {
  const key = saveSessionAnke(null, payload);

  addSessionEvent('deleteSessionAnke', key);

  delete state.anker[key];

  return state;
};

export const ankeReducers = {
  setSessionAnke,
  loadSessionAnke,
  updateSessionAnke,
  deleteSessionAnke,
};
