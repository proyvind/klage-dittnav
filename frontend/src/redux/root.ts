import { combineReducers } from 'redux';
import { ankeApi } from '../redux-api/case/anke/api';
import { availableAnkeApi } from '../redux-api/case/available-anke/api';
import { klageApi } from '../redux-api/case/klage/api';
import { titlesApi } from '../redux-api/titles';
import { userApi } from '../redux-api/user/api';
import { statusApi } from '../redux-api/user/status-api';

export const rootReducer = combineReducers({
  [statusApi.reducerPath]: statusApi.reducer,
  [titlesApi.reducerPath]: titlesApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [klageApi.reducerPath]: klageApi.reducer,
  [ankeApi.reducerPath]: ankeApi.reducer,
  [availableAnkeApi.reducerPath]: availableAnkeApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
