import { createApi } from '@reduxjs/toolkit/query/react';
import { TemaKey } from '../../tema/tema';
import { API_BASE_QUERY } from '../common';
import { IUser } from './types';

export interface GetFullmaktsgiverParams {
  temaKey: TemaKey;
  fullmaktsgiver: string;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: API_BASE_QUERY,
  endpoints: (builder) => ({
    getUser: builder.query<IUser, void>({
      query: () => '/bruker',
    }),
    // Get another user's data. Only possible if that user has granted "fullmakt".
    getFullmaktsgiver: builder.query<IUser, GetFullmaktsgiverParams>({
      query: ({ temaKey, fullmaktsgiver }) => `/fullmaktsgiver/${temaKey}/${fullmaktsgiver}`,
    }),
  }),
});

export const { useGetUserQuery, useLazyGetUserQuery, useGetFullmaktsgiverQuery, useLazyGetFullmaktsgiverQuery } =
  userApi;
