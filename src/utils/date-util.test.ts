import { formatDate, isValidDateString, toISOString, parseDate } from './date-util';

describe('Dato-testing', () => {
    it('Returnerer gyldig dato-format fra en gyldig dato-streng', () => {
        expect(formatDate(new Date('2012-12-31'))).toBe('31.12.2012');
    });

    it('Returnerer default-tekst om dato er ugyldig', () => {
        expect(formatDate(new Date('2012-13-31'))).toBe('Ingen dato satt');
    });

    it('Valider dato-streng', () => {
        expect(isValidDateString('2012-12-13')).toBe(true);
        expect(isValidDateString('2012-13-12')).toBe(false);
    });

    it('Valider at formatert dato-objekt er gyldig dato', () => {
        let dateObject = parseDate('12.12.2012');
        expect(isValidDateString(dateObject.toDateString())).toBe(true);
    });
    it('Valider at iso-dato gir korrekt resultat', () => {
        expect(toISOString(new Date('2019-01-32'))).toBe('');
        expect(toISOString(new Date('2012-01-31'))).toBe('2012-01-31');
    });
});
