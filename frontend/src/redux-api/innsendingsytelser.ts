import { createApi } from '@reduxjs/toolkit/query/react';
import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { Languages } from '@app/language/types';
import { API_BASE_QUERY } from './common';

type InnsendingsytelserMap = Record<Innsendingsytelse, string>;

export const innsendingsytelserApi = createApi({
  reducerPath: 'innsendingsytelserApi',
  baseQuery: API_BASE_QUERY,
  endpoints: (builder) => ({
    getInnsendingsytelser: builder.query<InnsendingsytelserMap, Languages>({
      query: (lang) => `/innsendingsytelser/${lang}`,
    }),
  }),
});

export const { useGetInnsendingsytelserQuery } = innsendingsytelserApi;
