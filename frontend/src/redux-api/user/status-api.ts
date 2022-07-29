import { createApi } from '@reduxjs/toolkit/query/react';
import { ENVIRONMENT, EnvString } from '../../environment/environment';
import { staggeredBaseQuery } from '../common';
import { userApi } from './api';

export interface UnauthenticatedUser {
  authenticated: boolean;
}

export interface AuthenticatedUser extends UnauthenticatedUser {
  name: string;
  securityLevel: '1' | '2' | '3' | '4';
}

const getDomain = (): string => {
  if (ENVIRONMENT.environment === EnvString.LOCAL) {
    return '';
  }

  if (ENVIRONMENT.environment === EnvString.DEV) {
    return 'https://innloggingsstatus.dev.nav.no';
  }

  return 'https://innloggingsstatus.nav.no';
};

export const statusApi = createApi({
  reducerPath: 'statusApi',
  baseQuery: staggeredBaseQuery(getDomain()),
  endpoints: (builder) => ({
    getStatus: builder.query<UnauthenticatedUser | AuthenticatedUser, void>({
      query: () => '/person/innloggingsstatus/auth',
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;

        if (!data.authenticated) {
          dispatch(userApi.util.updateQueryData('getUser', undefined, () => undefined));
        }
      },
    }),
  }),
});

export const { useGetStatusQuery } = statusApi;
