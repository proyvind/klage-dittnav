import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import { useGetUserQuery, useIsAuthenticatedQuery } from '../redux-api/user/api';

export const useIsAuthenticated = (skip?: typeof skipToken) => {
  const { data, ...rest } = useIsAuthenticatedQuery(skip);

  return { ...rest, data: data?.tokenx };
};

export const useUser = () => {
  const { data } = useIsAuthenticated();

  return useGetUserQuery(data === true ? undefined : skipToken);
};
