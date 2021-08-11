import { ISODate, ISODateTime } from '../../../date/date';
import { Languages } from '../../../language/language';
import { TemaKey } from '../../../tema/tema';
import { Attachment } from '../../anke/attachment';

export enum AnkeStatus {
    DRAFT = 'DRAFT',
    DONE = 'DONE',
    DELETED = 'DELETED'
}

export enum AnkemulighetStatus {
    OPEN = 'OPEN'
}

export type AvailableAnkeStatus = AnkeStatus | AnkemulighetStatus;

export enum Utfall {
    TRUKKET = 'TRUKKET',
    RETUR = 'RETUR',
    OPPHEVET = 'OPPHEVET',
    MEDHOLD = 'MEDHOLD',
    DELVIS_MEDHOLD = 'DELVIS_MEDHOLD',
    OPPRETTHOLDT = 'OPPRETTHOLDT',
    UGUNST = 'UGUNST',
    AVVIST = 'AVVIST'
}
export interface FinalizedAnke {
    finalizedDate: ISODate;
    modifiedByUser: ISODateTime;
}

export type AnkeInternalSaksnummer = string;

export interface NewAnke {
    readonly ankeInternalSaksnummer: AnkeInternalSaksnummer;
    readonly language: Languages;
}

export interface UpdateAnke extends NewAnke {
    readonly fritekst: string;
    readonly tema: TemaKey;
}

export interface Anke extends UpdateAnke {
    readonly finalizedDate: ISODate | null;
    readonly modifiedByUser: ISODateTime;
    readonly status: AnkeStatus;
    readonly journalpostId: string | null;
    readonly vedtakDate: ISODate;
    readonly vedlegg: Attachment[];
}

export interface AvailableAnke {
    ankeStatus: AvailableAnkeStatus;
    innsendtDate: string;
    ankeInternalSaksnummer: AnkeInternalSaksnummer;
    tema: TemaKey;
    titleKey: string;
    utfall: Utfall;
    vedtakDate: string;
}
