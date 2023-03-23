import { currentPath } from '@app/routes/current-path';

export const getLoginRedirectPath = (): string => {
  const redirectAfter = currentPath(window.location);

  return `/oauth2/login?redirect=${redirectAfter}`;
};

export const login = () => window.location.assign(getLoginRedirectPath());
