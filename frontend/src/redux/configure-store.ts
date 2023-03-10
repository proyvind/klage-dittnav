import { Middleware, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { ankeApi } from '../redux-api/case/anke/api';
import { klageApi } from '../redux-api/case/klage/api';
import { titlesApi } from '../redux-api/titles';
import { userApi } from '../redux-api/user/api';
import { RootState, rootReducer } from './root';

interface RejectedApiAction {
  meta: {
    rejectedWithValue: true;
  };
  payload: {
    status: number;
    title: string;
    detail: string;
  };
}

const isRejectedWithValue = (action: unknown): action is RejectedApiAction =>
  typeof action === 'object' && action !== null && action?.['meta']?.['rejectedWithValue'] === true;

const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    console.error('rtkQueryError', action);

    if (action.payload.status === 401) {
      userApi.util.invalidateTags(['isAuthenticated']);
    }
  }

  return next(action);
};

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
    }).concat([titlesApi.middleware, userApi.middleware, klageApi.middleware, ankeApi.middleware, rtkQueryErrorLogger]),
});

export type AppDispatch = typeof reduxStore.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
