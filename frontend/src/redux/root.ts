import { combineReducers } from 'redux';
import { ankeApi } from '../redux-api/case/anke/api';
import { klageApi } from '../redux-api/case/klage/api';
import { innsendingsytelserApi } from '../redux-api/innsendingsytelser';
import { userApi } from '../redux-api/user/api';
import { sessionSlice } from './session/session';

export const rootReducer = combineReducers({
  [innsendingsytelserApi.reducerPath]: innsendingsytelserApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [klageApi.reducerPath]: klageApi.reducer,
  [ankeApi.reducerPath]: ankeApi.reducer,
  session: sessionSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
