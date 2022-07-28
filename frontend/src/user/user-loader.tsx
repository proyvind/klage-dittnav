import { Alert, BodyShort } from '@navikt/ds-react';
import React, { useEffect } from 'react';
import { useTranslation } from '../language/use-translation';
import { LoadingPage } from '../loading-page/loading-page';
import { useGetUserQuery } from '../redux-api/user/api';
import { LoginButton } from '../styled-components/login-button';
import { login } from './login';

interface Props {
  children: React.ReactElement;
}

export const UserLoader = ({ children }: Props) => {
  const { user_loader } = useTranslation();
  const { isLoading, isError } = useGetUserQuery();

  useEffect(() => {
    if (isError) {
      login();
    }
  }, [isError]);

  if (isLoading || isError) {
    return <LoadingPage>{user_loader.loading_user}</LoadingPage>;
  }

  if (isError) {
    return (
      <Alert variant="error">
        <BodyShort>{user_loader.other_error}</BodyShort>
        <LoginButton onClick={login}>{user_loader.log_in}</LoginButton>
      </Alert>
    );
  }

  return children;
};
