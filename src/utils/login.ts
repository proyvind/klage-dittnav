import { environment } from './environment';

export const LOGGED_IN_REDIRECT_PATH_KEY = 'logged-in-redirect-path';

export function login(redirectAfter: string = current(window.location)) {
    localStorage.setItem(LOGGED_IN_REDIRECT_PATH_KEY, redirectAfter);
    window.location.replace(environment.loginUrl);
}

const current = ({ pathname, search, hash }: Location) => pathname + search + hash;
