import { Vedlegg } from './vedlegg';

export enum KlageStatus {
    DRAFT,
    DONE,
    DELETED
}

export interface Klage {
    id?: number;
    foedselsnummer: string;
    fritekst: string;
    status: KlageStatus;
    tema: string;
    enhetId?: string;
    vedtaksdato: Date;
    referanse?: string;
    vedlegg?: Vedlegg[];
}
