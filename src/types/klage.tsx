import { Vedlegg } from './vedlegg';
import { Vedtak } from './vedtak';

export enum KlageStatus {
    DRAFT,
    DONE,
    DELETED
}

export interface Klage {
    id?: number;
    fritekst: string;
    tema: string;
    enhetId?: string;
    vedtaksdato: Date;
    referanse?: string;
    vedlegg?: Vedlegg[];
}

export const constructKlage = (vedtak: Vedtak, begrunnelse?: string): Klage => {
    const klage: Klage = {
        fritekst: begrunnelse ?? '',
        tema: vedtak.tema,
        enhetId: vedtak.enhet,
        vedtaksdato: new Date(vedtak.vedtaksdato),
        referanse: vedtak.NAV_referanse
    };
    return klage;
};
