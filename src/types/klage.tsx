import { Vedlegg } from './vedlegg';
import { Vedtak } from './vedtak';
import { formattedDateToDateObject, formatDate } from '../utils/date-util';
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
    ytelse: string;
    datoalternativ: string;
    vedtak?: string;
    vedtaksdatoobjekt?: Date;
    saksnummer?: string;
    vedlegg?: Vedlegg[];
    referrer?: string;
}

export interface Klage {
    id?: number;
    fritekst: string;
    tema: string;
    ytelse: string;
    vedtak?: string;
    saksnummer?: string;
    vedlegg?: Vedlegg[];
    referrer?: string;
}

export const klageSkjemaBasertPaaVedtak = (vedtak: Vedtak): KlageSkjema => {
    const klageskjema: KlageSkjema = {
        fritekst: '',
        tema: vedtak.tema,
        ytelse: vedtak.ytelse,
        datoalternativ: '',
        vedtaksdatoobjekt: undefined,
        saksnummer: vedtak.saksnummer,
        referrer: ''
    };
    return klageskjema;
};

export const klageSkjemaTilKlage = (klageskjema: KlageSkjema): Klage => {
    const getVedtaksDato = (): string => {
        let result = '';
        let foundDatoAlternativ = datoValg.find(valg => valg.value === klageskjema.datoalternativ);

        let vedtaksdatoobjekt = klageskjema.vedtaksdatoobjekt;

        if (foundDatoAlternativ !== undefined && vedtaksdatoobjekt) {
            result +=
                foundDatoAlternativ.value +
                (foundDatoAlternativ.id === 'tidligereVedtak' ? ' - ' + formatDate(vedtaksdatoobjekt) : '');
        } else if (vedtaksdatoobjekt) {
            result +=
                datoValg.find(valg => valg.id === 'tidligereVedtak')?.value + ' - ' + formatDate(vedtaksdatoobjekt);
        }

        return result;
    };

    return {
        id: klageskjema.id,
        fritekst: klageskjema.fritekst,
        tema: klageskjema.tema,
        ytelse: klageskjema.ytelse,
        vedtak: getVedtaksDato(),
        saksnummer: klageskjema.saksnummer,
        vedlegg: klageskjema.vedlegg,
        referrer: klageskjema.referrer
    };
};

export const klageTilKlageSkjema = (klage: Klage): KlageSkjema => {
    let klageSkjema: KlageSkjema;
    klageSkjema = {
        id: klage.id,
        fritekst: klage.fritekst,
        tema: klage.tema,
        ytelse: klage.ytelse,
        datoalternativ: getDatoAlternativ(klage.vedtak!!),
        vedtak: klage.vedtak,
        vedtaksdatoobjekt: getVedtaksDatoObjekt(klage.vedtak!!) || undefined,
        saksnummer: klage.saksnummer,
        referrer: klage.referrer
    };

    return klageSkjema;
};

const getVedtaksDatoObjekt = (vedtak: string) => {
    if (vedtak.startsWith('Tidligere vedtak -') && vedtak !== 'Tidligere vedtak - Ingen dato satt') {
        // Will have a string 'Tidligere vedtak - <date>'
        let splitString = vedtak.split(' ');
        const dateString = splitString[splitString.length - 1];
        return formattedDateToDateObject(dateString);
    }
};

const getDatoAlternativ = (vedtak: string) => {
    if (vedtak.startsWith('Tidligere vedtak')) {
        return 'Tidligere vedtak';
    } else if (vedtak.startsWith('Siste vedtak')) {
        return 'Siste vedtak';
    } else {
        return '';
    }
};
