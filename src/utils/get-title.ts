import queryString from 'query-string';
import { TemaKey, Tema } from '../types/tema';
import { getQueryValue } from './get-query-value';

export function getTitle(query: queryString.ParsedQuery, temaKey: TemaKey): string {
    const title = getQueryValue(query.tittel);
    if (title !== null) {
        return title;
    }

    const ytelse = getQueryValue(query.ytelse);
    if (ytelse !== null) {
        return ytelse;
    }

    return Tema[temaKey];
}
