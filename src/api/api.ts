import { ENVIRONMENT } from '../environment/environment';
import { logError } from '../logging/frontendLogger';
import { foedselsnrFormat } from '../routes/klageskjema/summary/text-formatting';
import { User } from '../user/user';
import { getJSON } from './fetch';

export async function getFullmaktsgiver(tema: string, fnr: string) {
    const url = ENVIRONMENT.hasFullmaktForUrl(tema, fnr);
    try {
        return await getJSON<User>(url, `Finner ikke fullmaktsgiver med personnummer ${foedselsnrFormat('' + fnr)}`);
    } catch (error) {
        if (error instanceof Error) {
            logError(error, 'Get fullmaktsgiver user error.', { resource: url });
        }
        throw error;
    }
}
