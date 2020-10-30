import { User } from '../types/user';
import { logError } from '../utils/logger/frontendLogger';
import { login } from '../utils/login';
import { getJSON } from '../utils/fetch/fetch';
import { NotLoggedInError } from '../utils/fetch/errors';
import { environment } from '../utils/environment';

export async function checkAuth(setUser: (user: User | null) => void, required: boolean) {
    try {
        const user = await getJSON<User>(environment.userUrl, 'Kunne ikke hente bruker.');
        setUser(user);
        return user;
    } catch (error) {
        if (error instanceof NotLoggedInError) {
            if (required) {
                login();
            } else {
                setUser(null);
            }
        } else {
            setUser(null);
            logError(error);
        }
        return null;
    }
}
