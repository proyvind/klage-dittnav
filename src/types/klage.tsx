import { Vedlegg } from './vedlegg';
import { DatoValg } from '../components/begrunnelse/datoValg';
import { isoDateToPretty, prettyDateToISO } from '../utils/date';

export interface KlageDraft {
    fritekst: string;
    tema: string;
    ytelse: string;
    vedtak: string;
    saksnummer: string | null;
    vedlegg: Vedlegg[];
    journalpostId: string | null;
}

export interface Klage extends KlageDraft {
    readonly id: string | number;
}

export interface KlageSkjema {
    id: string | null;
    fritekst: string;
    tema: string;
    ytelse: string;
    datoalternativ: DatoValg;
    vedtak: string | null;
    saksnummer: string | null;
    vedlegg: Vedlegg[];
}

export const klageSkjemaToKlageDraft = (klageSkjema: KlageSkjema): KlageDraft => ({
    fritekst: klageSkjema.fritekst,
    tema: klageSkjema.tema,
    ytelse: klageSkjema.ytelse,
    vedtak: dateToVedtakText(klageSkjema),
    saksnummer: klageSkjema.saksnummer,
    vedlegg: klageSkjema.vedlegg,
    journalpostId: null
});

export const klageSkjemaToKlage = (klageSkjema: KlageSkjema): Klage => {
    if (klageSkjema.id === null || klageSkjema.id.length === 0) {
        throw new Error('KlageSkjema is missing required property "id". Did you mean to create a draft?');
    }
    return {
        id: ensureInt(klageSkjema.id),
        fritekst: klageSkjema.fritekst,
        tema: klageSkjema.tema,
        ytelse: klageSkjema.ytelse,
        vedtak: dateToVedtakText(klageSkjema),
        saksnummer: klageSkjema.saksnummer,
        vedlegg: klageSkjema.vedlegg,
        journalpostId: null
    };
};

const ensureInt = (klageId: string): number => {
    const parsed = Number.parseInt(klageId, 10);
    if (Number.isNaN(parsed)) {
        throw new Error(
            `KlageSkjema property "id" is not parsable to an integer. Expected string parsable to integer, got "${klageId}".`
        );
    }
    return parsed;
};

export const klageToKlageSkjema = (klage: Klage): KlageSkjema => {
    const { isoDate, dateChoice } = parseVedtakText(klage.vedtak);
    return {
        id: klage.id.toString(),
        fritekst: klage.fritekst,
        tema: klage.tema,
        ytelse: klage.ytelse,
        datoalternativ: dateChoice,
        vedtak: isoDate,
        saksnummer: klage.saksnummer,
        vedlegg: klage.vedlegg
    };
};

export const TIDLIGERE_VEDTAK = 'Tidligere vedtak';
export const SISTE_VEDTAK = 'Siste vedtak';

export const dateToVedtakText = (klageSkjema: KlageSkjema): string => {
    if (klageSkjema.datoalternativ === DatoValg.INGEN) {
        return '';
    }
    if (klageSkjema.datoalternativ === DatoValg.SISTE_VEDTAK) {
        return SISTE_VEDTAK;
    }
    if (klageSkjema.datoalternativ === DatoValg.TIDLIGERE_VEDTAK) {
        const prettyDate = isoDateToPretty(klageSkjema.vedtak);
        if (prettyDate === null) {
            return `${TIDLIGERE_VEDTAK} - Ingen dato satt`;
        }
        return `${TIDLIGERE_VEDTAK} - ${prettyDate}`;
    }

    throw new Error(`Unknown date choice state: ${klageSkjema.datoalternativ}`);
};

export interface ParsedVedtakText {
    dateChoice: DatoValg;
    isoDate: string | null;
}

const tidligereVedtakRegex = /\d{2}.\d{2}.\d{4}$/;
export const parseVedtakText = (vedtak: string | null): ParsedVedtakText => {
    if (vedtak === null) {
        return {
            dateChoice: DatoValg.INGEN,
            isoDate: null
        };
    }

    if (vedtak === SISTE_VEDTAK) {
        return {
            dateChoice: DatoValg.SISTE_VEDTAK,
            isoDate: null
        };
    }

    if (vedtak.startsWith(TIDLIGERE_VEDTAK)) {
        const match = vedtak.match(tidligereVedtakRegex);
        return {
            dateChoice: DatoValg.TIDLIGERE_VEDTAK,
            isoDate: match === null ? null : prettyDateToISO(match[0])
        };
    }

    return {
        dateChoice: DatoValg.INGEN,
        isoDate: null
    };
};
