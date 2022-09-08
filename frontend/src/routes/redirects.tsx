import React, { useEffect } from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import { LoadingPage } from '../components/loading-page/loading-page';
import { queryStringify } from '../functions/query-string';
import { useIsAuthenticated } from '../hooks/use-user';
import { useLanguage } from '../language/use-language';
import { useTranslation } from '../language/use-translation';
import { AppEventEnum } from '../logging/error-report/action';
import { addAppEvent } from '../logging/error-report/error-report';
import { useIsAuthenticatedQuery } from '../redux-api/user/api';
import { login } from '../user/login';

export const LoginIfUnauthorized = () => {
  const { user_loader } = useTranslation();
  const { data } = useIsAuthenticated();

  useEffect(() => {
    if (data === false) {
      login();
    }
  }, [data]);

  if (data === true) {
    return <Outlet />;
  }

  return <LoadingPage>{user_loader.loading_user}</LoadingPage>;
};

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

export const RedirectIfAuthorized = ({ type }: { type: 'klage' | 'anke' }) => {
  const { data } = useIsAuthenticated();
  const lang = useLanguage();
  const { user_loader } = useTranslation();
  const { temaKey, titleKey } = useParams();

  if (data === false) {
    return <Outlet />;
  }

  if (data === true) {
    const query = queryStringify({ tema: temaKey, tittel: titleKey });

    return <Navigate to={`/${lang}/${type}/ny${query}`} replace />;
  }

  return <LoadingPage>{user_loader.loading_user}</LoadingPage>;
};
