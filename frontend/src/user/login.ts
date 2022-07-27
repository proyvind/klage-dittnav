import { currentPath } from '../routes/current-path';

export const LOGGED_IN_REDIRECT_PATH_KEY = 'logged-in-redirect-path';

export const login = () => {
  const redirectAfter = currentPath(window.location);
  window.location.replace(`/oauth2/login?redirect=${redirectAfter}`);
};
