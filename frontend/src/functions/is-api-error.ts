import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

export interface ApiError {
  status: number;
  data: ApiErrorData;
}

export interface ApiErrorData {
  status: number;
  detail: string;
  title: string;
}

export const isApiError = (error: unknown): error is ApiError => {
  if (isError(error)) {
    if (
      error['data'] !== null &&
      typeof error['data'] === 'object' &&
      Number.isInteger(error.data['status']) &&
      typeof error.data['detail'] === 'string' &&
      typeof error.data['title'] === 'string'
    ) {
      return true;
    }
  }

  return false;
};

export const isError = (error: unknown): error is FetchBaseQueryError => {
  if (error !== null && typeof error === 'object') {
    if (typeof error['status'] === 'string' || typeof error['status'] === 'number') {
      return true;
    }
  }

  return false;
};
