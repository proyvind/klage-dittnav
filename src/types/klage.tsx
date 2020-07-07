import { Vedlegg } from './vedlegg';
import { Vedtak } from './vedtak';
import { formatDate } from '../utils/date-util';
import { datoValg } from '../components/begrunnelse/datoValg';

export enum KlageStatus {
    DRAFT,
    DONE,
    DELETED
}
export interface KlageSkjema {
    id?: number;
    fritekst: string;
    tema: string;
    enhetId?: string;
    datoalternativ: string;
    vedtaksdato?: string;
    vedtaksdatoobjekt?: Date;
    referanse?: string;
    vedlegg?: Vedlegg[];
}

export interface Klage {
    id?: number;
    fritekst: string;
    tema: string;
    enhetId?: string;
    vedtaksdato?: string;
    referanse?: string;
    vedlegg?: Vedlegg[];
}

export const klageSkjemaBasertPaaVedtak = (vedtak: Vedtak): KlageSkjema => {
    const klageskjema: KlageSkjema = {
        fritekst: '',
        tema: vedtak.tema,
        enhetId: vedtak.enhet,
        datoalternativ: '',
        vedtaksdatoobjekt: new Date(vedtak.vedtaksdato),
        referanse: vedtak.NAV_referanse
    };
    return klageskjema;
};

export const klageSkjemaTilKlage = (klageskjema: KlageSkjema): Klage => {
    const getVedtaksDato = () => {
        let vedtaksdato = klageskjema.datoalternativ;

        let foundDatoAlternativ = datoValg.find(valg => valg.value === klageskjema.datoalternativ);
        if (foundDatoAlternativ && foundDatoAlternativ.canIncludeDate) {
            vedtaksdato += ' - ' + formatDate(klageskjema.vedtaksdatoobjekt);
        }
        return vedtaksdato;
    };

    let klage: Klage;
    klage = {
        id: klageskjema.id,
        fritekst: klageskjema.fritekst,
        tema: klageskjema.tema,
        enhetId: klageskjema.enhetId,
        vedtaksdato: getVedtaksDato(),
        referanse: klageskjema.referanse,
        vedlegg: klageskjema.vedlegg
    };
    return klage;
};
