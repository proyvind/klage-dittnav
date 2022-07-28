import { createSlice } from '@reduxjs/toolkit';
import { ankeReducers } from './anke/reducers';
import { klageReducers } from './klage/reducers';
import { State } from './types';

const initialState: State = {
  klager: {},
  anker: {},
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    ...klageReducers,
    ...ankeReducers,
  },
});

// eslint-disable-next-line import/no-unused-modules
export const {
  setSessionAnke,
  loadSessionAnke,
  updateSessionAnke,
  deleteSessionAnke,
  setSessionKlage,
  loadSessionKlage,
  updateSessionKlage,
  deleteSessionKlage,
} = sessionSlice.actions;
