import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import { useGetUserQuery } from '../redux-api/user/api';
import { useGetStatusQuery } from '../redux-api/user/status-api';

export const useStatus = () => {
  const { data, ...rest } = useGetStatusQuery();
  return { ...rest, data: data?.authenticated };
};

export const useUser = () => {
  const { data } = useStatus();
  return useGetUserQuery(data === true ? undefined : skipToken);
};
