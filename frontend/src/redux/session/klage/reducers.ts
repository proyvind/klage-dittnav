import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { ISessionKlage } from '../../../components/klage/uinnlogget/types';
import { addSessionEvent } from '../../../logging/error-report/error-report';
import { State } from '../types';
import { getSessionKlageKey } from './helpers';
import { readSessionKlage, saveSessionKlage } from './storage';
import { SessionKlageKey, SessionKlagePayload, SessionKlageUpdate } from './types';

dayjs.extend(utc);

const setSessionKlage: CaseReducer<State, PayloadAction<SessionKlagePayload>> = (state, { payload }) => {
  const { key, klage } = payload;

  addSessionEvent('setSessionKlage', key);

  const klageKey = getSessionKlageKey(key.temaKey, key.titleKey);

  if (klage === null) {
    saveSessionKlage(key.temaKey, key.titleKey, null);

    delete state.klager[klageKey];

    return state;
  }

  saveSessionKlage(key.temaKey, key.titleKey, klage);

  state.klager[klageKey] = klage;

  return state;
};

const updateSessionKlage: CaseReducer<State, PayloadAction<SessionKlageUpdate>> = (state, { payload }) => {
  const { temaKey, titleKey, update } = payload;

  if (temaKey === null) {
    throw new Error('TemaKey must be defined');
  }

  const klageKey = getSessionKlageKey(temaKey, titleKey);

  addSessionEvent('updateSessionKlage', klageKey);

  const klage = state.klager[klageKey];

  if (typeof klage === 'undefined' || klage === null) {
    throw new Error('Klage does not exist');
  }

  if (temaKey !== klage.tema || titleKey !== klage.titleKey) {
    throw new Error('TemaKey and titleKey must match');
  }

  const updated: ISessionKlage = { ...klage, ...update, modifiedByUser: dayjs().utc(true).toISOString() };

  saveSessionKlage(temaKey, titleKey, updated);

  state.klager[klageKey] = updated;

  return state;
};

const loadSessionKlage: CaseReducer<State, PayloadAction<SessionKlagePayload>> = (state, { payload }) => {
  const { key, klage } = payload;

  addSessionEvent('loadSessionKlage', key);

  const { temaKey, titleKey } = key;
  const savedKlage = readSessionKlage(temaKey, titleKey);
  const sessionKey = getSessionKlageKey(temaKey, titleKey);

  if (typeof savedKlage === 'undefined') {
    if (klage === null) {
      state.klager[sessionKey] = null;

      return state;
    }

    saveSessionKlage(temaKey, titleKey, klage);

    state.klager[sessionKey] = klage;

    return state;
  }

  state.klager[sessionKey] = savedKlage;

  return state;
};

const deleteSessionKlage: CaseReducer<State, PayloadAction<SessionKlageKey>> = (state, { payload }) => {
  const { temaKey, titleKey } = payload;

  const key = saveSessionKlage(temaKey, titleKey, null);

  addSessionEvent('saveSessionKlage', key);

  delete state.klager[key];

  return state;
};

export const klageReducers = { setSessionKlage, updateSessionKlage, loadSessionKlage, deleteSessionKlage };
