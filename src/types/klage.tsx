import { Vedlegg } from './vedlegg';
import { DatoValg } from '../components/begrunnelse/datoValg';
import { ISODate, ISODateTime, isoDateToPretty, prettyDateToISO } from '../utils/date';
import { TemaKey } from './tema';

export enum KlageStatus {
    DRAFT,
    DONE,
    DELETED
}

export interface NewKlage {
    readonly fritekst: string;
    readonly tema: TemaKey;
    readonly ytelse: string;
    readonly vedtak: string;
    readonly saksnummer: string | null;
}

export interface UpdateKlage extends NewKlage {
    readonly id: string | number;
}

export interface ReadOnlyKlage extends UpdateKlage {
    readonly finalizedDate: ISODate | null;
    readonly modifiedByUser: ISODateTime;
    readonly status: KlageStatus;
    readonly journalpostId: string | null;
    readonly vedlegg: Vedlegg[];
}

export const TIDLIGERE_VEDTAK = 'Tidligere vedtak';
export const SISTE_VEDTAK = 'Siste vedtak';

export const dateToVedtakText = (dateOption: DatoValg | null, isoDate: ISODate | null): string => {
    if (dateOption === null || dateOption === DatoValg.INGEN) {
        return '';
    }
    if (dateOption === DatoValg.SISTE_VEDTAK) {
        return SISTE_VEDTAK;
    }
    if (dateOption === DatoValg.TIDLIGERE_VEDTAK) {
        const prettyDate = isoDateToPretty(isoDate);
        if (prettyDate === null) {
            return `${TIDLIGERE_VEDTAK} - Ingen dato satt`;
        }
        return `${TIDLIGERE_VEDTAK} - ${prettyDate}`;
    }

    throw new Error(`Unknown date choice state: ${dateOption}`);
};

export interface ParsedVedtakText {
    dateOption: DatoValg;
    isoDate: ISODate | null;
}

const tidligereVedtakRegex = /\d{2}.\d{2}.\d{4}$/;
export const parseVedtakText = (vedtak: string | null): ParsedVedtakText => {
    if (vedtak === null) {
        return {
            dateOption: DatoValg.INGEN,
            isoDate: null
        };
    }

    if (vedtak === SISTE_VEDTAK) {
        return {
            dateOption: DatoValg.SISTE_VEDTAK,
            isoDate: null
        };
    }

    if (vedtak.startsWith(TIDLIGERE_VEDTAK)) {
        const match = vedtak.match(tidligereVedtakRegex);
        return {
            dateOption: DatoValg.TIDLIGERE_VEDTAK,
            isoDate: match === null ? null : prettyDateToISO(match[0])
        };
    }

    return {
        dateOption: DatoValg.INGEN,
        isoDate: null
    };
};
