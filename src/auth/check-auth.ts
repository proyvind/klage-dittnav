import { User } from '../user/user';
import { logError } from '../logging/frontendLogger';
import { login } from './login';
import { getJSON } from '../api/fetch';
import { NotLoggedInError } from '../api/errors';
import { environment } from '../environment/environment';

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
