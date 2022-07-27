import { createApi } from '@reduxjs/toolkit/query/react';
import { queryStringify } from '../../../functions/query-string';
import { TemaKey } from '../../../tema/tema';
import { API_BASE_QUERY } from '../../common';
import { AvailableAnke } from './types';

export const availableAnkeApi = createApi({
  reducerPath: 'availableAnkeApi',
  baseQuery: API_BASE_QUERY,
  endpoints: (builder) => ({
    getAvailableAnker: builder.query<AvailableAnke[], TemaKey>({
      query: (tema) => {
        const query = queryStringify({ tema });
        return `/anker/available${query}`;
      },
    }),
  }),
});

export const { useGetAvailableAnkerQuery, useLazyGetAvailableAnkerQuery } = availableAnkeApi;
