import { combineReducers } from 'redux';
import { ankeApi } from '../redux-api/case/anke/api';
import { klageApi } from '../redux-api/case/klage/api';
import { titlesApi } from '../redux-api/titles';
import { userApi } from '../redux-api/user/api';
import { sessionSlice } from './session/session';

export const rootReducer = combineReducers({
  [titlesApi.reducerPath]: titlesApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [klageApi.reducerPath]: klageApi.reducer,
  [ankeApi.reducerPath]: ankeApi.reducer,
  session: sessionSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
