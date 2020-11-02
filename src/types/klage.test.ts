import { DatoValg } from '../components/begrunnelse/datoValg';
import { parseVedtakText, dateToVedtakText, ParsedVedtakText, TIDLIGERE_VEDTAK, SISTE_VEDTAK } from './klage';

describe('Parse the date and choice from a vedtak text', () => {
    it(`Should parse a "${TIDLIGERE_VEDTAK}" text with a date`, () => {
        const vedtakText = `${TIDLIGERE_VEDTAK} - 31.12.2020`;
        const parsed = parseVedtakText(vedtakText);
        expect(parsed).toStrictEqual({
            dateOption: DatoValg.TIDLIGERE_VEDTAK,
            isoDate: '2020-12-31'
        } as ParsedVedtakText);
    });

    it(`Should parse a "${TIDLIGERE_VEDTAK}" text without date`, () => {
        const vedtakText = `${TIDLIGERE_VEDTAK} - Ingen dato satt`;
        const parsed = parseVedtakText(vedtakText);
        expect(parsed).toStrictEqual({
            dateOption: DatoValg.TIDLIGERE_VEDTAK,
            isoDate: null
        } as ParsedVedtakText);
    });

    it(`Should parse a "${SISTE_VEDTAK}" text without date`, () => {
        const vedtakText = SISTE_VEDTAK;
        const parsed = parseVedtakText(vedtakText);
        expect(parsed).toStrictEqual({
            dateOption: DatoValg.SISTE_VEDTAK,
            isoDate: null
        } as ParsedVedtakText);
    });

    it('Should parse a null text', () => {
        const vedtakText = null;
        const parsed = parseVedtakText(vedtakText);
        expect(parsed).toStrictEqual({
            dateOption: DatoValg.INGEN,
            isoDate: null
        } as ParsedVedtakText);
    });

    it('Should parse an empty text', () => {
        const vedtakText = '';
        const parsed = parseVedtakText(vedtakText);
        expect(parsed).toStrictEqual({
            dateOption: DatoValg.INGEN,
            isoDate: null
        } as ParsedVedtakText);
    });
});

describe('Date to vedtak text', () => {
    it(`Should format "${TIDLIGERE_VEDTAK}" with a date`, () => {
        const vedtakText = dateToVedtakText(DatoValg.TIDLIGERE_VEDTAK, '2020-12-31');
        expect(vedtakText).toBe(`${TIDLIGERE_VEDTAK} - 31.12.2020`);
    });

    it(`Should format "${TIDLIGERE_VEDTAK}" without a date`, () => {
        const vedtakText = dateToVedtakText(DatoValg.TIDLIGERE_VEDTAK, null);
        expect(vedtakText).toBe(`${TIDLIGERE_VEDTAK} - Ingen dato satt`);
    });

    it(`Should format "${SISTE_VEDTAK}" without a date`, () => {
        const vedtakText = dateToVedtakText(DatoValg.SISTE_VEDTAK, null);
        expect(vedtakText).toBe(SISTE_VEDTAK);
    });

    it(`Should return empty string when no choice is made`, () => {
        const vedtakText = dateToVedtakText(DatoValg.INGEN, null);
        expect(vedtakText).toBe('');
    });
});
