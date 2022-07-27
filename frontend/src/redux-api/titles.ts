import { createApi } from '@reduxjs/toolkit/query/react';
import { Languages } from '../language/types';
import { API_BASE_QUERY } from './common';

type LanguageTitlesType = Record<string, string>;

export const titlesApi = createApi({
  reducerPath: 'titlesApi',
  baseQuery: API_BASE_QUERY,
  endpoints: (builder) => ({
    getLanguageTitles: builder.query<LanguageTitlesType, Languages>({
      query: (lang) => `/titles/${lang}`,
    }),
  }),
});

export const { useGetLanguageTitlesQuery } = titlesApi;
