import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

interface ApiError {
  status: number;
  data: ApiErrorData;
}

interface ApiErrorData {
  status: number;
  detail: string;
  title: string;
}

export const isApiError = (error: unknown): error is ApiError => {
  if (isError(error)) {
    if (
      error['data'] !== null &&
      typeof error['data'] === 'object' &&
      'status' in error.data &&
      Number.isInteger(error.data.status) &&
      'detail' in error.data &&
      typeof error.data.detail === 'string' &&
      'title' in error.data &&
      typeof error.data.title === 'string'
    ) {
      return true;
    }
  }

  return false;
};

export const isError = (error: unknown): error is FetchBaseQueryError => {
  if (error !== null && typeof error === 'object') {
    if ('status' in error && (typeof error.status === 'string' || typeof error.status === 'number')) {
      return true;
    }
  }

  return false;
};
