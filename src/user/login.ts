import { ENVIRONMENT } from '../environment/environment';
import { currentPath } from '../routes/current-path';

export const LOGGED_IN_REDIRECT_PATH_KEY = 'logged-in-redirect-path';

export function login() {
    const redirectAfter = currentPath(window.location);
    localStorage.setItem(LOGGED_IN_REDIRECT_PATH_KEY, redirectAfter);
    window.location.replace(ENVIRONMENT.loginUrl);
}
