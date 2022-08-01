import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import { useGetUserQuery, useIsAuthenticatedQuery } from '../redux-api/user/api';

export const useStatus = () => {
  const { data, ...rest } = useIsAuthenticatedQuery();
  return { ...rest, data: data?.authenticated };
};

export const useUser = () => {
  const { data } = useStatus();
  return useGetUserQuery(data === true ? undefined : skipToken);
};
