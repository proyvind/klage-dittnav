import { combineReducers } from 'redux';
import { ankeApi } from '@app/redux-api/case/anke/api';
import { klageApi } from '@app/redux-api/case/klage/api';
import { innsendingsytelserApi } from '@app/redux-api/innsendingsytelser';
import { userApi } from '@app/redux-api/user/api';
import { sessionSlice } from './session/session';

export const rootReducer = combineReducers({
  [innsendingsytelserApi.reducerPath]: innsendingsytelserApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [klageApi.reducerPath]: klageApi.reducer,
  [ankeApi.reducerPath]: ankeApi.reducer,
  session: sessionSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
