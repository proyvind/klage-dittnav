import { ISODate, ISODateTime } from '../date/date';
import { TemaKey } from '../tema/tema';
import { Attachment } from './attachment';

export enum KlageStatus {
    DRAFT = 'DRAFT',
    DONE = 'DONE',
    DELETED = 'DELETED'
}

export enum Reason {
    AVSLAG_PAA_SOKNAD = 'AVSLAG_PAA_SOKNAD',
    UENIG_I_VEDTAK_OM_TILBAKEBETALING = 'UENIG_I_VEDTAK_OM_TILBAKEBETALING',
    FOR_LITE_UTBETALT = 'FOR_LITE_UTBETALT',
    UENIG_I_NOE_ANNET = 'UENIG_I_NOE_ANNET'
}

export interface FinalizedKlage {
    finalizedDate: ISODate;
    modifiedByUser: ISODateTime;
}

export interface NewKlage {
    readonly checkboxesSelected: Reason[];
    readonly fritekst: string;
    readonly saksnummer: string | null;
    readonly tema: TemaKey;
    readonly vedtakDate: ISODate | null;
    readonly ytelse: string;
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

export function reasonsMatch<Reasons>(a1: Reasons[], a2: Reasons[]): boolean {
    if (a1.length !== a2.length) {
        return false;
    }

    return a1.every(v => a2.includes(v));
}
