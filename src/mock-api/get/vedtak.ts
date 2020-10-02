import { Vedtak } from '../../types/vedtak';
import { getYtelseByTema, Tema } from '../../types/tema';
import queryString from 'query-string';

export function getKlageId(query: queryString.ParsedQuery<string>): string | null {
    if (typeof query.klageid === 'string' && query.klageid.length > 0) {
        return query.klageid;
    }
    return null;
}

export const queryToVedtak = (query: queryString.ParsedQuery<string>): Vedtak | null => {
    const tema = getTema(query);
    if (tema !== null) {
        return {
            vedtak: '',
            tema: tema,
            ytelse: getYtelse(tema, query?.ytelse),
            saksnummer: getSaksnummer(query)
        };
    }

    return null;
};

function getYtelse(tema: string, ytelse: string | string[] | null | undefined) {
    if (ytelse === null || typeof ytelse === 'undefined' || Array.isArray(ytelse)) {
        return Tema.UKJ;
    }
    return getYtelseByTema(tema) ?? Tema.UKJ;
}

function getTema(query: queryString.ParsedQuery<string>): string {
    if (typeof query.tema === 'string' && query.tema.length > 0) {
        return query.tema;
    }
    return '';
}

function getSaksnummer(query: queryString.ParsedQuery<string>): string {
    if (typeof query.saksnummer === 'string') {
        return query.saksnummer;
    }
    return '';
}
