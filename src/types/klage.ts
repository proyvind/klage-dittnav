import { Attachment } from './attachment';
import { DateOption } from '../components/begrunnelse/datoValg';
import { ISODate, ISODateTime, isoDateToPretty, prettyDateToISO } from '../utils/date';
import { TemaKey } from './tema';

export enum KlageStatus {
    DRAFT = 'DRAFT',
    DONE = 'DONE',
    DELETED = 'DELETED'
}

export interface FinalizedKlage {
    finalizedDate: ISODate;
    modifiedByUser: ISODateTime;
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

export interface Klage extends UpdateKlage {
    readonly finalizedDate: ISODate | null;
    readonly modifiedByUser: ISODateTime;
    readonly status: KlageStatus;
    readonly journalpostId: string | null;
    readonly vedlegg: Attachment[];
}

export const TIDLIGERE_VEDTAK = 'Tidligere vedtak';
export const SISTE_VEDTAK = 'Siste vedtak';

export const dateToVedtakText = (dateOption: DateOption | null, isoDate: ISODate | null): string => {
    if (dateOption === null || dateOption === DateOption.INGEN) {
        return '';
    }
    if (dateOption === DateOption.SISTE_VEDTAK) {
        return SISTE_VEDTAK;
    }
    if (dateOption === DateOption.TIDLIGERE_VEDTAK) {
        const prettyDate = isoDateToPretty(isoDate);
        if (prettyDate === null) {
            return `${TIDLIGERE_VEDTAK} - Ingen dato satt`;
        }
        return `${TIDLIGERE_VEDTAK} - ${prettyDate}`;
    }

    throw new Error(`Unknown date choice state: ${dateOption}`);
};

export interface ParsedVedtakText {
    readonly dateOption: DateOption;
    readonly isoDate: ISODate | null;
}

const tidligereVedtakRegex = /\d{2}.\d{2}.\d{4}$/;
export const parseVedtakText = (vedtak: string | null): ParsedVedtakText => {
    if (vedtak === null) {
        return {
            dateOption: DateOption.INGEN,
            isoDate: null
        };
    }

    if (vedtak === SISTE_VEDTAK) {
        return {
            dateOption: DateOption.SISTE_VEDTAK,
            isoDate: null
        };
    }

    if (vedtak.startsWith(TIDLIGERE_VEDTAK)) {
        const match = vedtak.match(tidligereVedtakRegex);
        return {
            dateOption: DateOption.TIDLIGERE_VEDTAK,
            isoDate: match === null ? null : prettyDateToISO(match[0])
        };
    }

    return {
        dateOption: DateOption.INGEN,
        isoDate: null
    };
};
