import { dateToVedtakText, TIDLIGERE_VEDTAK, SISTE_VEDTAK, VedtakType } from './klage';

describe('Date to vedtak text', () => {
    it(`Should format "${TIDLIGERE_VEDTAK}" with a date`, () => {
        const vedtakText = dateToVedtakText(VedtakType.EARLIER, '2020-12-31');
        expect(vedtakText).toBe(`${TIDLIGERE_VEDTAK} - 31.12.2020`);
    });

    it(`Should format "${TIDLIGERE_VEDTAK}" without a date`, () => {
        const vedtakText = dateToVedtakText(VedtakType.EARLIER, null);
        expect(vedtakText).toBe(`${TIDLIGERE_VEDTAK} - Ingen dato satt`);
    });

    it(`Should format "${SISTE_VEDTAK}" without a date`, () => {
        const vedtakText = dateToVedtakText(VedtakType.LATEST, null);
        expect(vedtakText).toBe(SISTE_VEDTAK);
    });

    it(`Should return empty string when no choice is made`, () => {
        const vedtakText = dateToVedtakText(null, null);
        expect(vedtakText).toBe('');
    });
});
