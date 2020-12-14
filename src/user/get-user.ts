import { User } from './user';
import { logError } from '../logging/frontendLogger';
import { getJSON } from '../api/fetch';
import { NotLoggedInError } from '../api/errors';
import { ENVIRONMENT } from '../environment/environment';
import { login } from './login';

export const getUser = () =>
    getJSON<User>(ENVIRONMENT.userUrl, 'Kunne ikke hente bruker.').catch((error: Error) => {
        if (error instanceof NotLoggedInError) {
            throw error;
        } else {
            logError(error);
            throw error;
        }
    });

export const ensureAuth = () =>
    getUser().catch((error: Error) => {
        if (error instanceof NotLoggedInError) {
            login();
            return null;
        }
        throw error;
    });
