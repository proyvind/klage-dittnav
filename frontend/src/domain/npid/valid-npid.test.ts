import { validNpid } from './valid-npid';

describe('npid', () => {
  describe('prod', () => {
    describe('valid', () => {
      it('should handle 100% valid NPID', () => {
        expect.assertions(1);
        expect(validNpid('04257549963', true)).toBe(true);
      });
    });

    describe('invalid', () => {
      it('should handle NPID with valid control ciphers but invalid date-part', () => {
        expect.assertions(1);
        expect(validNpid('21617823087', true)).toBe(false);
      });

      it('should handle 100% invalid NPIDs', () => {
        expect.assertions(2);
        expect(validNpid('01234567890', true)).toBe(false);
        expect(validNpid('99999999999', true)).toBe(false);
      });

      it('should handle NPID with invalid control cipers but valid date-part', () => {
        expect.assertions(1);
        expect(validNpid('04257549999', true)).toBe(false);
      });
    });
  });

  describe('dev/local/test', () => {
    describe('valid', () => {
      it('should handle 100% valid NPID', () => {
        expect.assertions(1);
        expect(validNpid('04257549963', false)).toBe(true);
      });

      it('should handle NPID with valid control ciphers but invalid date-part', () => {
        expect.assertions(1);
        expect(validNpid('21617823087', false)).toBe(true);
      });
    });

    describe('invalid', () => {
      it('should handle 100% invalid NPIDs', () => {
        expect.assertions(2);
        expect(validNpid('01234567890')).toBe(false);
        expect(validNpid('99999999999')).toBe(false);
      });

      it('should handle NPID with invalid control cipers but valid date-part', () => {
        expect.assertions(1);
        expect(validNpid('04257549999', false)).toBe(false);
      });
    });
  });
});
