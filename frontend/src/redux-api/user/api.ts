import { createApi } from '@reduxjs/toolkit/query/react';
import { setTokenExpires } from '../../logging/error-report/error-report';
import { API_BASE_QUERY } from '../common';
import { IAuthResponse, IUser } from './types';

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
export const { useGetUserQuery, useIsAuthenticatedQuery, useLazyGetUserQuery } = userApi;
