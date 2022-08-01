import { createApi } from '@reduxjs/toolkit/query/react';
import { TemaKey } from '../../tema/tema';
import { API_BASE_QUERY } from '../common';
import { IAuthResponse, IUser } from './types';

export interface GetFullmaktsgiverParams {
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
        const authenticated = typeof data !== 'undefined';
        dispatch(userApi.util.updateQueryData('isAuthenticated', undefined, () => ({ authenticated })));
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

        if (!data.authenticated) {
          dispatch(userApi.util.updateQueryData('getUser', undefined, () => undefined));
        }
      },
    }),
  }),
});

export const {
  useGetFullmaktsgiverQuery,
  useGetUserQuery,
  useIsAuthenticatedQuery,
  useLazyGetFullmaktsgiverQuery,
  useLazyGetUserQuery,
} = userApi;
