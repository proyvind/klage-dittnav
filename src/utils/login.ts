import Environment from './environment';

export const LOGGED_IN_REDIRECT_PATH_KEY = 'logged-in-redirect-path';

export function login(redirectAfter: string = current(window.location)) {
    localStorage.setItem(LOGGED_IN_REDIRECT_PATH_KEY, redirectAfter);
    window.location.replace(
        `${Environment.REACT_APP_LOGINSERVICE_URL}?redirect=${Environment.REACT_APP_URL}${LOGGED_IN_PATH}`
    );
}

export const LOGGED_IN_PATH = '/loggedin-redirect';

const current = ({ pathname, search, hash }: Location) => pathname + search + hash;
