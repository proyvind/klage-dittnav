import React from 'react';
import { Redirect } from 'react-router-dom';
import { LOGGED_IN_REDIRECT_PATH_KEY } from '../../utils/login';

export const loggedInRedirect = () => <Redirect to={getRedirectPath(localStorage)} />;

function getRedirectPath(storage: Storage) {
    const redirectPath = storage.getItem(LOGGED_IN_REDIRECT_PATH_KEY);
    if (redirectPath !== null) {
        storage.removeItem(LOGGED_IN_REDIRECT_PATH_KEY);
        if (redirectPath.startsWith('/')) {
            return redirectPath;
        }
    }

    return '/';
}
