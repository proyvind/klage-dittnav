import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import dayjs, { extend } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { addSessionEvent } from '../../../logging/error-report/error-report';
import { SessionKey, State } from '../types';
import { getSessionKlageKey } from './helpers';
import { readSessionKlage, saveSessionKlage } from './storage';
import { SessionKlagePayload, SessionKlageUpdate } from './types';

extend(utc);

const setSessionKlage: CaseReducer<State, PayloadAction<SessionKlagePayload>> = (state, { payload }) => {
  addSessionEvent('Set session klage');

  const { key, klage } = payload;

  const klageKey = getSessionKlageKey(key);

  if (klage === null) {
    saveSessionKlage(key, null);

    delete state.klager[klageKey];

    return state;
  }

  saveSessionKlage(key, klage);

  state.klager[klageKey] = klage;

  return state;
};

const updateSessionKlage: CaseReducer<State, PayloadAction<SessionKlageUpdate>> = (state, { payload }) => {
  addSessionEvent('Update session Klage');

  const { key, update } = payload;

  const klageKey = getSessionKlageKey(key);
  const klage = state.klager[klageKey];

  if (typeof klage === 'undefined' || klage === null) {
    throw new Error('Klage does not exist');
  }

  if (key !== klage.innsendingsytelse) {
    throw new Error('Innsendingsytelse must match');
  }

  const updated = { ...klage, ...update, modifiedByUser: dayjs().utc(true).toISOString() };

  saveSessionKlage(key, updated);

  state.klager[klageKey] = updated;

  return state;
};

// Read from session storage if it exists, otherwise save to session storage.
const loadSessionKlage: CaseReducer<State, PayloadAction<SessionKlagePayload>> = (state, { payload }) => {
  addSessionEvent('Load session klage');

  const { key, klage } = payload;

  const sessionKey = getSessionKlageKey(key);
  const savedKlage = readSessionKlage(sessionKey);

  if (typeof savedKlage === 'undefined') {
    if (klage === null) {
      delete state.klager[sessionKey];

      return state;
    }

    saveSessionKlage(key, klage);

    state.klager[sessionKey] = klage;

    return state;
  }

  state.klager[sessionKey] = savedKlage;

  return state;
};

const deleteSessionKlage: CaseReducer<State, PayloadAction<SessionKey>> = (state, { payload }) => {
  addSessionEvent('Delete session klage');

  const key = saveSessionKlage(payload, null);

  delete state.klager[key];

  return state;
};

export const klageReducers = { setSessionKlage, updateSessionKlage, loadSessionKlage, deleteSessionKlage };
