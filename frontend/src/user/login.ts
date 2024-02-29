import { currentPath } from '@app/routes/current-path';

const getLoginRedirectPath = (): string => {
  const redirectAfter = currentPath(window.location);

  return `/oauth2/login?redirect=${redirectAfter}`;
};

export const login = () => window.location.assign(getLoginRedirectPath());
