import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { ankeApi } from '../redux-api/case/anke/api';
import { availableAnkeApi } from '../redux-api/case/available-anke/api';
import { klageApi } from '../redux-api/case/klage/api';
import { titlesApi } from '../redux-api/titles';
import { userApi } from '../redux-api/user/api';
import { RootState, rootReducer } from './root';

export const reduxStore = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these field paths in all actions.
        ignoredActionPaths: [
          'payload.payload.file',
          'payload.file',
          'meta.baseQueryMeta.request',
          'meta.baseQueryMeta.response',
          'meta.arg.originalArgs.file',
        ],
      },
    }).concat([
      titlesApi.middleware,
      userApi.middleware,
      klageApi.middleware,
      ankeApi.middleware,
      availableAnkeApi.middleware,
    ]),
});

export type AppDispatch = typeof reduxStore.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
