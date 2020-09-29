import { isoDateToPretty, prettyDateToISO } from './date';

describe('Dates should be pretty printed for users', () => {
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
