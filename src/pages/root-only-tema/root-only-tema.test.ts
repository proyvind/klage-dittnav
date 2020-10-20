import { getTemaKey } from './root-only-tema';

describe('Tema in query should be parsed', () => {
    it('Should parse a valid tema key from query', () => {
        const search = '?tema=FOR';
        const temaKey = getTemaKey(search);
        expect(temaKey).toBe('FOR');
    });

    it('Should return null for invalid tema key in query', () => {
        const invalidSearch = '?tema=INVALID';
        const temaKey = getTemaKey(invalidSearch);
        expect(temaKey).toBeNull();
    });

    it('Should return null for invalid query', () => {
        const invalidSearch = 'Not a query';
        const temaKey = getTemaKey(invalidSearch);
        expect(temaKey).toBeNull();
    });
});
