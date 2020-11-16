import { isoDateTimeToPretty, isoDateToPretty, isoTimeToPretty, prettyDateToISO } from './date';

describe('ISO dates should be pretty formatted', () => {
    it('Should pretty format valid ISO dates', () => {
        const isoDate = '2020-12-31';
        const pretty = isoDateToPretty(isoDate);
        expect(pretty).toBe('31.12.2020');
    });

    it('Should return null for invalid ISO dates', () => {
        const invalidIsoDate = 'Not a date at all.';
        const pretty = isoDateToPretty(invalidIsoDate);
        expect(pretty).toBeNull();
    });
});

describe('ISO times should be pretty formatted', () => {
    it('Should pretty format valid ISO times', () => {
        const iso = '14:25:19.734593';
        const pretty = isoTimeToPretty(iso);
        expect(pretty).toBe('14:25:19');
    });

    it('Should return null for invalid ISO times', () => {
        const iso = 'Not a time at all.';
        const pretty = isoTimeToPretty(iso);
        expect(pretty).toBeNull();
    });
});

describe('ISO datetimes should be pretty formatted', () => {
    it('Should pretty format valid ISO datetimes', () => {
        const iso = '2020-10-29T14:25:19.734593';
        const pretty = isoDateTimeToPretty(iso);
        expect(pretty).toBe('29.10.2020 14:25:19');
    });

    it('Should return null for invalid ISO datetimes', () => {
        const iso = 'Not a date at all.';
        const pretty = isoDateTimeToPretty(iso);
        expect(pretty).toBeNull();
    });
});

describe('Pretty dates should be parsed to ISO dates', () => {
    it('Should ISO format valid pretty dates', () => {
        const pretty = '31.12.2020';
        const isoDate = prettyDateToISO(pretty);
        expect(isoDate).toBe('2020-12-31');
    });

    it('Should return null for invalid pretty dates', () => {
        const pretty = 'Not a date at all.';
        const isoDate = prettyDateToISO(pretty);
        expect(isoDate).toBeNull();
    });
});
