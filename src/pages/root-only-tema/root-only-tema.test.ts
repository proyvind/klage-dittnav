import { ensureStringIsTema } from '../../types/tema';
import { getRedirectPath, getTemaKey } from './root-only-tema';

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

describe('Generate redirect path from tema key', () => {
    it('Should generate a valid path from supported tema key', () => {
        const temaKey = ensureStringIsTema('FOR');
        const redirectPath = getRedirectPath(temaKey);
        expect(redirectPath).toBe('/klage-anke/FOR');
    });

    it('Should generate valid path for an unsupported tema key', () => {
        const temaKey = ensureStringIsTema('KOM');
        const redirectPath = getRedirectPath(temaKey);
        expect(redirectPath).toBe('/klage-anke/KOM');
    });

    it('Should generate root path for an invalid tema key', () => {
        const temaKey = ensureStringIsTema('INVALID');
        const redirectPath = getRedirectPath(temaKey);
        expect(redirectPath).toBe('/klage-anke');
    });
});
