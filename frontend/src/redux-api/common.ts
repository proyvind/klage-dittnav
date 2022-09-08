import { FetchArgs, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { addApiEvent, sendErrorReport } from '../logging/user-trace';

const IS_LOCALHOST = window.location.hostname === 'localhost';

const mode: RequestMode | undefined = IS_LOCALHOST ? 'cors' : undefined;

const staggeredBaseQuery = (baseUrl: string) => {
  const fetch = fetchBaseQuery({
    baseUrl,
    mode,
    credentials: 'include',
  });

  return retry(
    async (args: string | FetchArgs, api, extraOptions) => {
      const result = await fetch(args, api, extraOptions);

      if (typeof args === 'string') {
        addApiEvent(args, 'GET', result.meta?.response?.status ?? 0, result.error?.data?.['detail']);
      } else {
        addApiEvent(args.url, args.method ?? 'GET', result.meta?.response?.status ?? 0, result.error?.data?.['detail']);
      }

      if (result.meta?.response?.ok !== true) {
        sendErrorReport();
      }

      if (typeof result.error === 'undefined') {
        return result;
      }

      if (typeof result.error.status === 'string') {
        console.error('Request failed with error', result.error.status);
        retry.fail(result.error);
      }

      if (result.error.status === 401) {
        retry.fail(result.error.data);
      } else if (
        result.error.status === 400 ||
        result.error.status === 403 ||
        result.error.status === 404 ||
        result.error.status === 405 ||
        result.error.status === 413 ||
        result.error.status === 501
      ) {
        retry.fail(result.error);
      }

      return result;
    },
    { maxRetries: 3 }
  );
};

export const API_PATH = '/api/klage-dittnav-api/api';
export const API_BASE_QUERY = staggeredBaseQuery(API_PATH);
