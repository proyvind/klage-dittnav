import queryString from 'query-string';
import { ensureStringIsTema, getYtelseByTema, Tema } from '../types/tema';

interface ResumeState {
    klageId: string | null;
    ytelse: string | null;
    tema: string | null;
    saksnummer: string | null;
}

export enum StorageKey {
    KLAGE_ID = 'nav.klage.klageId',
    TEMA = 'nav.klage.tema',
    YTELSE = 'nav.klage.ytelse',
    SAKSNUMMER = 'nav.klage.saksnummer'
}

export function getResumeState(queryParams: string, storage: Storage): ResumeState {
    const query = queryString.parse(queryParams);
    const queryKlageId = getQueryString(query, 'klageid');
    if (queryKlageId !== null) {
        return {
            klageId: queryKlageId,
            saksnummer: null,
            tema: null,
            ytelse: null
        };
    }

    const queryTema = getQueryString(query, 'tema');
    const queryYtelse = getQueryString(query, 'ytelse') ?? getDefaultYtelse(queryTema);
    const querySaksnummer = getQueryString(query, 'saksnummer');

    const storedKlageId = getStorageItem(StorageKey.KLAGE_ID, storage);
    const storedTema = getStorageItem(StorageKey.TEMA, storage);
    const storedYtelse = getStorageItem(StorageKey.YTELSE, storage);
    const storedSaksnummer = getStorageItem(StorageKey.SAKSNUMMER, storage);

    if (
        storedKlageId !== null &&
        queryTema === storedTema &&
        queryYtelse === storedYtelse &&
        querySaksnummer === storedSaksnummer
    ) {
        return {
            klageId: storedKlageId,
            tema: storedTema,
            ytelse: storedYtelse,
            saksnummer: storedSaksnummer
        };
    }

    return {
        klageId: null,
        tema: ensureStringIsTema(queryTema),
        ytelse: queryYtelse,
        saksnummer: querySaksnummer
    };
}

function getDefaultYtelse(tema: string | null): Tema | null {
    if (tema === null || tema.length === 0) {
        return null;
    }
    return getYtelseByTema(tema);
}

function getQueryString(query: queryString.ParsedQuery<string>, paramName: string): string | null {
    const value = query[paramName];
    if (typeof value === 'string' && value.length !== 0) {
        return value;
    }

    return null;
}

function getStorageItem(key: string, storage: Storage): string | null {
    const value = storage.getItem(key);
    if (typeof value === 'string' && value.length !== 0) {
        return value;
    }

    return null;
}
