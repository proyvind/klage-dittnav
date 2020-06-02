import { Vedlegg } from './vedlegg';
import { Bruker } from './bruker';
import { Vedtak } from './vedtak';

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

export const constructKlage = (person: Bruker, vedtak: Vedtak, begrunnelse: string, draft: boolean): Klage => {
    const klage: Klage = {
        foedselsnummer: person.foedselsnummer,
        fritekst: begrunnelse,
        status: draft ? KlageStatus.DRAFT : KlageStatus.DONE,
        tema: vedtak.tema,
        enhetId: vedtak.enhet,
        vedtaksdato: vedtak.vedtaksdato,
        referanse: vedtak.NAV_referanse
    };
    return klage;
};
