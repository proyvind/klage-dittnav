import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { LoadingPage } from '@app/components/loading-page/loading-page';
import { useTranslation } from '@app/language/use-translation';
import { AppEventEnum } from '@app/logging/error-report/action';
import { addAppEvent } from '@app/logging/error-report/error-report';
import { useIsAuthenticatedQuery } from '@app/redux-api/user/api';
import { login } from '@app/user/login';

export const UpgradeSession = () => {
  const { user_loader } = useTranslation();
  const { isLoading, data } = useIsAuthenticatedQuery();

  // Upgrade session if user is authenticated and has selvbetjening token but not tokenx.
  // No session at all is allowed.
  const shouldUpgradeSession = data?.selvbetjening === true && data?.tokenx === false;

  useEffect(() => {
    if (shouldUpgradeSession) {
      addAppEvent(AppEventEnum.UPGRADE_SESSION);
      login();
    }
  }, [shouldUpgradeSession]);

  if (isLoading || shouldUpgradeSession) {
    return <LoadingPage>{user_loader.loading_user}</LoadingPage>;
  }

  return <Outlet />;
};
