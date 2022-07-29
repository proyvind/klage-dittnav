import { currentPath } from '../routes/current-path';

export const LOGGED_IN_REDIRECT_PATH_KEY = 'logged-in-redirect-path';

export const getLoginRedirectPath = (): string => {
  const redirectAfter = currentPath(window.location);
  return `/oauth2/login?redirect=${redirectAfter}`;
};

export const login = () => window.location.assign(getLoginRedirectPath());
