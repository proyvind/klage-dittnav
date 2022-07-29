import React, { useEffect } from 'react';
import { useStatus } from '../hooks/use-user';
import { useTranslation } from '../language/use-translation';
import { LoadingPage } from '../loading-page/loading-page';
import { login } from './login';

interface Props {
  children: React.ReactElement;
}

export const UserLoader = ({ children }: Props) => {
  const { user_loader } = useTranslation();
  const { isLoading, data } = useStatus();

  useEffect(() => {
    if (!isLoading && data === false) {
      login();
    }
  }, [isLoading, data]);

  if (data === true) {
    return children;
  }

  return <LoadingPage>{user_loader.loading_user}</LoadingPage>;
};
