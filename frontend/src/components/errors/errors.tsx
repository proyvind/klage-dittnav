import { Refresh } from '@navikt/ds-icons';
import { Alert, BodyShort, Button } from '@navikt/ds-react';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import React from 'react';
import styled from 'styled-components';
import { isApiError, isError } from '../../functions/is-api-error';
import { useTranslation } from '../../language/use-translation';
import { LoginButton } from '../../styled-components/login-button';

export interface ErrorProps {
  error?: FetchBaseQueryError | SerializedError;
  retry?: () => void;
  logIn: () => void;
  show: boolean;
  isRetryLoading?: boolean;
}

export const Errors = ({ error, retry, show, isRetryLoading = false, logIn }: ErrorProps) => {
  const { common, errorMessages } = useTranslation();

  if (!show) {
    return null;
  }

  if (isError(error)) {
    if (error.status === 401) {
      return (
        <ErrorAlert variant="error">
          <BodyShort>{common.logged_out}</BodyShort>
          <LoginButton onClick={logIn}>{common.log_in}</LoginButton>
        </ErrorAlert>
      );
    }

    if (isApiError(error)) {
      return (
        <ErrorAlert variant="error">
          <BodyShort>{errorMessages[error.data.detail]}</BodyShort>
        </ErrorAlert>
      );
    }
  }

  return (
    <ErrorAlert variant="error">
      <BodyShort>{common.generic_error}</BodyShort>
      <Retry isLoading={isRetryLoading} onClick={retry}>
        {common.retry}
      </Retry>
    </ErrorAlert>
  );
};

interface RetryProps {
  onClick?: () => void;
  isLoading: boolean;
  children: string;
}

const Retry = ({ isLoading, onClick, children }: RetryProps) => {
  if (typeof onClick === 'undefined') {
    return null;
  }

  return (
    <RetryButton onClick={onClick} loading={isLoading} variant="secondary">
      <Refresh /> {children}
    </RetryButton>
  );
};

const RetryButton = styled(Button)`
  margin-top: 16px;
`;

const ErrorAlert = styled(Alert)`
  margin-top: 8px;
`;
