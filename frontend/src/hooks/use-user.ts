import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import { useGetUserQuery } from '../redux-api/user/api';
import { useGetStatusQuery } from '../redux-api/user/status-api';

export const useStatus = () => {
  const { data: status, ...rest } = useGetStatusQuery();
  return { ...rest, data: status?.authenticated === true };
};

export const useUser = () => {
  const { data: status } = useGetStatusQuery();
  return useGetUserQuery(status?.authenticated === true ? undefined : skipToken);
};
