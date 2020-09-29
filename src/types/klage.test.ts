import { DatoValg } from '../components/begrunnelse/datoValg';
import {
    parseVedtakText,
    dateToVedtakText,
    ParsedVedtakText,
    TIDLIGERE_VEDTAK,
    SISTE_VEDTAK,
    KlageSkjema
} from './klage';
import { Tema } from './tema';

describe('Parse the date and choice from a vedtak text', () => {
    it(`Should parse a "${TIDLIGERE_VEDTAK}" text with a date`, () => {
        const vedtakText = `${TIDLIGERE_VEDTAK} - 31.12.2020`;
        const parsed = parseVedtakText(vedtakText);
        expect(parsed).toStrictEqual({
            dateChoice: DatoValg.TIDLIGERE_VEDTAK,
            isoDate: '2020-12-31'
        } as ParsedVedtakText);
    });

    it(`Should parse a "${TIDLIGERE_VEDTAK}" text without date`, () => {
        const vedtakText = `${TIDLIGERE_VEDTAK} - Ingen dato satt`;
        const parsed = parseVedtakText(vedtakText);
        expect(parsed).toStrictEqual({
            dateChoice: DatoValg.TIDLIGERE_VEDTAK,
            isoDate: null
        } as ParsedVedtakText);
    });

    it(`Should parse a "${SISTE_VEDTAK}" text without date`, () => {
        const vedtakText = SISTE_VEDTAK;
        const parsed = parseVedtakText(vedtakText);
        expect(parsed).toStrictEqual({
            dateChoice: DatoValg.SISTE_VEDTAK,
            isoDate: null
        } as ParsedVedtakText);
    });

    it('Should parse a null text', () => {
        const vedtakText = null;
        const parsed = parseVedtakText(vedtakText);
        expect(parsed).toStrictEqual({
            dateChoice: DatoValg.INGEN,
            isoDate: null
        } as ParsedVedtakText);
    });

    it('Should parse an empty text', () => {
        const vedtakText = '';
        const parsed = parseVedtakText(vedtakText);
        expect(parsed).toStrictEqual({
            dateChoice: DatoValg.INGEN,
            isoDate: null
        } as ParsedVedtakText);
    });
});

describe('Date to vedtak text', () => {
    it(`Should format "${TIDLIGERE_VEDTAK}" with a date`, () => {
        const klageSkjema: KlageSkjema = {
            datoalternativ: DatoValg.TIDLIGERE_VEDTAK,
            vedtak: '2020-12-31',
            fritekst: '',
            id: null,
            referrer: null,
            saksnummer: null,
            tema: 'FOR',
            vedlegg: [],
            ytelse: Tema.FOR
        };

        const vedtakText = dateToVedtakText(klageSkjema);
        expect(vedtakText).toBe(`${TIDLIGERE_VEDTAK} - 31.12.2020`);
    });

    it(`Should format "${TIDLIGERE_VEDTAK}" without a date`, () => {
        const klageSkjema: KlageSkjema = {
            datoalternativ: DatoValg.TIDLIGERE_VEDTAK,
            vedtak: null,
            fritekst: '',
            id: null,
            referrer: null,
            saksnummer: null,
            tema: 'FOR',
            vedlegg: [],
            ytelse: Tema.FOR
        };

        const vedtakText = dateToVedtakText(klageSkjema);
        expect(vedtakText).toBe(`${TIDLIGERE_VEDTAK} - Ingen dato satt`);
    });

    it(`Should format "${SISTE_VEDTAK}" without a date`, () => {
        const klageSkjema: KlageSkjema = {
            datoalternativ: DatoValg.SISTE_VEDTAK,
            vedtak: null,
            fritekst: '',
            id: null,
            referrer: null,
            saksnummer: null,
            tema: 'FOR',
            vedlegg: [],
            ytelse: Tema.FOR
        };

        const vedtakText = dateToVedtakText(klageSkjema);
        expect(vedtakText).toBe(SISTE_VEDTAK);
    });

    it(`Should return empty string when no choice is made`, () => {
        const klageSkjema: KlageSkjema = {
            datoalternativ: DatoValg.INGEN,
            vedtak: null,
            fritekst: '',
            id: null,
            referrer: null,
            saksnummer: null,
            tema: 'FOR',
            vedlegg: [],
            ytelse: Tema.FOR
        };

        const vedtakText = dateToVedtakText(klageSkjema);
        expect(vedtakText).toBe('');
    });
});
