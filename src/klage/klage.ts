import { ISODate, ISODateTime, isoDateToPretty } from '../date/date';
import { TemaKey } from '../tema/tema';
import { Attachment } from './attachment';

export enum KlageStatus {
    DRAFT = 'DRAFT',
    DONE = 'DONE',
    DELETED = 'DELETED'
}

export enum VedtakType {
    EARLIER = 'EARLIER',
    LATEST = 'LATEST'
}

export interface FinalizedKlage {
    finalizedDate: ISODate;
    modifiedByUser: ISODateTime;
}

export interface NewKlage {
    readonly fritekst: string;
    readonly tema: TemaKey;
    readonly ytelse: string;
    readonly vedtakType: VedtakType | null;
    readonly vedtakDate: ISODate | null;
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

export const dateToVedtakText = (vedtakType: VedtakType | null, isoDate: ISODate | null): string => {
    if (vedtakType === null) {
        return '';
    }
    if (vedtakType === VedtakType.LATEST) {
        return SISTE_VEDTAK;
    }
    if (vedtakType === VedtakType.EARLIER) {
        const prettyDate = isoDateToPretty(isoDate);
        if (prettyDate === null) {
            return `${TIDLIGERE_VEDTAK} - Ingen dato satt`;
        }
        return `${TIDLIGERE_VEDTAK} - ${prettyDate}`;
    }

    throw new Error(`Unknown date choice state: ${vedtakType}`);
};
