import { Tema } from '../types/tema';
import { getResumeState, StorageKey } from './get-resume-state';

describe('Resume klage', () => {
    it('Should NOT get values from an empty query and sessionStorage', () => {
        const mockSessionStorage = new MockSessionStorage();
        const queryString = '';
        const pathName = '/begrunnelse';
        const resumeState = getResumeState(queryString, mockSessionStorage, pathName);
        expect(resumeState).toStrictEqual({
            klageId: null,
            tema: null,
            ytelse: null,
            saksnummer: null
        });
    });

    it('Should get klage ID from query, with empty sessionStorage', () => {
        const mockSessionStorage = new MockSessionStorage();
        const expectedKlageId = '123';
        const queryString = `?klageid=${expectedKlageId}&tema=FOR&ytelse=test`;
        const pathName = '/begrunnelse';
        const resumeState = getResumeState(queryString, mockSessionStorage, pathName);
        expect(resumeState).toStrictEqual({
            klageId: expectedKlageId,
            tema: null,
            ytelse: null,
            saksnummer: null
        });
    });

    it('Should get klage ID from sessionStorage, if query matches tema and ytelse', () => {
        const expectedKlageId = '123';
        const expectedYtelse = 'test';
        const expectedTema = 'FOR';
        const mockSessionStorage = new MockSessionStorage({
            [StorageKey.KLAGE_ID]: expectedKlageId,
            [StorageKey.YTELSE]: expectedYtelse,
            [StorageKey.TEMA]: expectedTema
        });
        const queryString = `?tema=${expectedTema}&ytelse=${expectedYtelse}`;
        const pathName = '/begrunnelse';
        const resumeState = getResumeState(queryString, mockSessionStorage, pathName);
        expect(resumeState).toStrictEqual({
            klageId: expectedKlageId,
            tema: expectedTema,
            ytelse: expectedYtelse,
            saksnummer: null
        });
    });

    it('Should get klage ID from sessionStorage, if query matches tema, ytelse and saksnummer', () => {
        const expectedKlageId = '123';
        const expectedYtelse = 'test';
        const expectedTema = 'FOR';
        const expectedSaksnummer = 'saksnummer';
        const mockSessionStorage = new MockSessionStorage({
            [StorageKey.KLAGE_ID]: expectedKlageId,
            [StorageKey.YTELSE]: expectedYtelse,
            [StorageKey.TEMA]: expectedTema,
            [StorageKey.SAKSNUMMER]: expectedSaksnummer
        });
        const queryString = `?tema=${expectedTema}&ytelse=${expectedYtelse}&saksnummer=${expectedSaksnummer}`;
        const pathName = '/begrunnelse';
        const resumeState = getResumeState(queryString, mockSessionStorage, pathName);
        expect(resumeState).toStrictEqual({
            klageId: expectedKlageId,
            tema: expectedTema,
            ytelse: expectedYtelse,
            saksnummer: expectedSaksnummer
        });
    });

    it('Should get klage ID from sessionStorage, if query matches tema and sessionStorage matches default ytelse for tema', () => {
        const expectedKlageId = '123';
        const expectedTema = 'FOR';
        const expectedYtelse = Tema[expectedTema];
        const mockSessionStorage = new MockSessionStorage({
            [StorageKey.KLAGE_ID]: expectedKlageId,
            [StorageKey.YTELSE]: expectedYtelse,
            [StorageKey.TEMA]: expectedTema
        });
        const queryString = `?tema=${expectedTema}`;
        const pathName = '/begrunnelse';
        const resumeState = getResumeState(queryString, mockSessionStorage, pathName);
        expect(resumeState).toStrictEqual({
            klageId: expectedKlageId,
            tema: expectedTema,
            ytelse: expectedYtelse,
            saksnummer: null
        });
    });

    it('Should get tema and default ytelse, if query only has tema', () => {
        const expectedTema = 'FOR';
        const expectedYtelse = Tema[expectedTema];
        const mockSessionStorage = new MockSessionStorage({
            [StorageKey.KLAGE_ID]: '123',
            [StorageKey.YTELSE]: 'testytelse',
            [StorageKey.TEMA]: expectedTema,
            [StorageKey.SAKSNUMMER]: ''
        });
        const queryString = `?tema=${expectedTema}`;
        const pathName = '/begrunnelse';
        const resumeState = getResumeState(queryString, mockSessionStorage, pathName);
        expect(resumeState).toStrictEqual({
            klageId: null,
            tema: expectedTema,
            ytelse: expectedYtelse,
            saksnummer: null
        });
    });

    it('Should NOT get klage ID, tema, ytelse or saksnummer from sessionStorage, when query is empty', () => {
        const mockSessionStorage = new MockSessionStorage({
            [StorageKey.YTELSE]: 'test',
            [StorageKey.TEMA]: 'FOR',
            [StorageKey.SAKSNUMMER]: 'saksnummer'
        });
        const queryString = ``;
        const pathName = '/begrunnelse';
        const resumeState = getResumeState(queryString, mockSessionStorage, pathName);
        expect(resumeState).toStrictEqual({
            klageId: null,
            tema: null,
            ytelse: null,
            saksnummer: null
        });
    });

    it('Should NOT get klage ID from sessionStorage, when query matches only klage ID', () => {
        const klageId = '123';
        const expectedYtelse = 'test';
        const expectedTema = 'FOR';
        const expectedSaksnummer = 'saksnummer';
        const mockSessionStorage = new MockSessionStorage({
            [StorageKey.KLAGE_ID]: klageId,
            [StorageKey.YTELSE]: expectedYtelse + 'mismatched_and_ignored',
            [StorageKey.TEMA]: expectedTema + 'mismatched_and_ignored',
            [StorageKey.SAKSNUMMER]: expectedSaksnummer + 'mismatched_and_ignored'
        });
        const queryString = `?tema=${expectedTema}&ytelse=${expectedYtelse}&saksnummer=${expectedSaksnummer}`;
        const pathName = '/begrunnelse';
        const resumeState = getResumeState(queryString, mockSessionStorage, pathName);
        expect(resumeState).toStrictEqual({
            klageId: null,
            tema: expectedTema,
            ytelse: expectedYtelse,
            saksnummer: expectedSaksnummer
        });
    });

    it('Should NOT get klage ID from sessionStorage, when query matches only tema and sessionStorage ytelse does not match default ytelse', () => {
        const klageId = '123';
        const expectedTema = 'FOR';
        const expectedYtelse = Tema[expectedTema];
        const mockSessionStorage = new MockSessionStorage({
            [StorageKey.KLAGE_ID]: klageId,
            [StorageKey.YTELSE]: expectedYtelse + 'mismatched',
            [StorageKey.TEMA]: expectedTema
        });
        const queryString = `?tema=${expectedTema}`;
        const pathName = '/begrunnelse';
        const resumeState = getResumeState(queryString, mockSessionStorage, pathName);
        expect(resumeState).toStrictEqual({
            klageId: null,
            tema: expectedTema,
            ytelse: expectedYtelse,
            saksnummer: null
        });
    });

    it('Should get klage ID from sessionStorage, when current page is Oppsummering', () => {
        const expectedKlageId = '123';
        const expectedTema = 'FOR';
        const expectedYtelse = Tema[expectedTema];
        const mockSessionStorage = new MockSessionStorage({
            [StorageKey.KLAGE_ID]: expectedKlageId,
            [StorageKey.YTELSE]: expectedYtelse,
            [StorageKey.TEMA]: expectedTema
        });
        const queryString = ``;
        const pathName = '/oppsummering';
        const resumeState = getResumeState(queryString, mockSessionStorage, pathName);
        expect(resumeState).toStrictEqual({
            klageId: expectedKlageId,
            tema: expectedTema,
            ytelse: expectedYtelse,
            saksnummer: null
        });
    });
});

class MockSessionStorage implements Storage {
    private values: Map<string, string>;

    constructor(initialValues: { [name: string]: string } = {}) {
        this.values = new Map(Object.entries(initialValues));
    }

    public getItem(key: string): string | null {
        const value = this.values.get(key);
        if (typeof value === 'string') {
            return value;
        }
        return null;
    }

    public setItem(key: string, value: string) {
        this.values.set(key, value);
    }

    public removeItem(key: string): void {
        this.values.delete(key);
    }

    public key(index: number): string | null {
        if (index < 0 || index >= this.length) {
            return null;
        }
        const keys = Array.from(this.values.keys());
        return keys[index];
    }

    public clear() {
        this.values.clear();
    }

    get length(): number {
        return this.values.size;
    }
}
