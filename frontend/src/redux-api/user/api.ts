import { createApi } from '@reduxjs/toolkit/query/react';
import { setTokenExpires } from '../../logging/error-report/error-report';
import { TemaKey } from '../../tema/tema';
import { API_BASE_QUERY } from '../common';
import { IAuthResponse, IUser } from './types';

interface GetFullmaktsgiverParams {
  temaKey: TemaKey;
  fullmaktsgiver: string;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: API_BASE_QUERY,
  tagTypes: ['isAuthenticated', 'user'],
  endpoints: (builder) => ({
    getUser: builder.query<IUser, void>({
      query: () => '/bruker',
      providesTags: ['user'],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        const tokenx = typeof data !== 'undefined';
        dispatch(userApi.util.updateQueryData('isAuthenticated', undefined, (draft) => ({ ...draft, tokenx })));

        setTokenExpires(data.tokenExpires);
      },
    }),
    // Get another user's data. Only possible if that user has granted "fullmakt".
    getFullmaktsgiver: builder.query<IUser, GetFullmaktsgiverParams>({
      query: ({ temaKey, fullmaktsgiver }) => `/fullmaktsgiver/${temaKey}/${fullmaktsgiver}`,
    }),
    isAuthenticated: builder.query<IAuthResponse, void>({
      query: () => '/bruker/authenticated',
      providesTags: ['isAuthenticated'],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;

        if (!data.tokenx) {
          dispatch(userApi.util.updateQueryData('getUser', undefined, () => undefined));
        }
      },
    }),
  }),
});

// eslint-disable-next-line import/no-unused-modules
export const {
  useGetFullmaktsgiverQuery,
  useGetUserQuery,
  useIsAuthenticatedQuery,
  useLazyGetFullmaktsgiverQuery,
  useLazyGetUserQuery,
} = userApi;
