import { FetchArgs, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { isNotUndefined } from '@app/functions/is-not-type-guards';
import { addApiEvent, sendErrorReport } from '@app/logging/error-report/error-report';

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

      const argsIsString = typeof args === 'string';

      const data = result.error?.data;
      const hasData = typeof data === 'object' && data !== null;

      const title = hasData ? 'title' in data && data.title : undefined;
      const detail = hasData ? 'detail' in data && data.detail : undefined;

      addApiEvent(
        argsIsString ? args : args.url,
        argsIsString ? 'GET' : args.method ?? 'GET',
        result.meta?.response?.status ?? result.error?.status,
        [title, detail].filter(isNotUndefined).join(' - '),
      );

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
    { maxRetries: 3 },
  );
};

export const API_PATH = '/api/klage-dittnav-api/api';
export const API_BASE_QUERY = staggeredBaseQuery(API_PATH);
