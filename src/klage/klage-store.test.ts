import { TemaKey } from '../tema/tema';
import { Klage, KlageStatus, VedtakType } from './klage';
import { KlageStorage, KLAGE_STORAGE_KEYS } from './klage-store';

describe('Klage store', () => {
    const BASE_KLAGE: Klage = {
        id: '123',
        finalizedDate: null,
        journalpostId: null,
        modifiedByUser: '2020-12-31T15:45:59.123',
        saksnummer: null,
        tema: TemaKey.FOR,
        vedlegg: [],
        ytelse: 'En ytelse',
        status: KlageStatus.DRAFT,
        fritekst: '',
        vedtakType: null,
        vedtakDate: null
    };

    it('Should store klage values', () => {
        const storage = new MockStorage();
        const klageStore = new KlageStorage(storage);
        const expectedFritekst = 'fritekst';
        const expectedVedtakDate = '2020-12-31';
        const expectedVedtakType = VedtakType.EARLIER;

        klageStore.store(expectedFritekst, expectedVedtakType, expectedVedtakDate);

        const fritekst = storage.getItem(KLAGE_STORAGE_KEYS.KLAGE_FRITEKST);
        const dateOption = storage.getItem(KLAGE_STORAGE_KEYS.KLAGE_VEDTAK_TYPE);
        const isoDate = storage.getItem(KLAGE_STORAGE_KEYS.KLAGE_VEDTAK_DATE);

        expect(fritekst).toBe(expectedFritekst);
        expect(dateOption).toBe(expectedVedtakType);
        expect(isoDate).toBe(expectedVedtakDate);
    });

    it('Should overwrite klage when fritekst is different, vedtak is equal, and klage status is DRAFT', () => {
        const storage = new MockStorage();
        const klageStore = new KlageStorage(storage);
        const expectedFritekst = 'a new and better fritekst';
        const expectedVedtakDate = '2020-12-31';
        const expectedVedtakType = VedtakType.EARLIER;

        klageStore.store(expectedFritekst, expectedVedtakType, expectedVedtakDate);

        const klage: Klage = {
            ...BASE_KLAGE,
            status: KlageStatus.DRAFT,
            fritekst: 'old and poor fritekst',
            vedtakType: expectedVedtakType,
            vedtakDate: expectedVedtakDate
        };
        const expectedKlage: Klage = {
            ...klage,
            fritekst: expectedFritekst,
            vedtakType: expectedVedtakType,
            vedtakDate: expectedVedtakDate
        };
        const restoredKlage = klageStore.restore(klage);

        expect(restoredKlage).not.toBe(expectedKlage);
        expect(restoredKlage).toStrictEqual(expectedKlage);
    });

    it('Should overwrite klage when fritekst is equal, vedtak is different, and klage status is DRAFT', () => {
        const storage = new MockStorage();
        const klageStore = new KlageStorage(storage);
        const expectedFritekst = 'fritekst';
        const expectedVedtakDate = '2020-12-31';
        const expectedVedtakType = VedtakType.EARLIER;

        klageStore.store(expectedFritekst, expectedVedtakType, expectedVedtakDate);

        const klage: Klage = {
            ...BASE_KLAGE,
            status: KlageStatus.DRAFT,
            fritekst: expectedFritekst,
            vedtakType: VedtakType.LATEST,
            vedtakDate: null
        };
        const expectedKlage: Klage = {
            ...klage,
            fritekst: expectedFritekst,
            vedtakType: expectedVedtakType,
            vedtakDate: expectedVedtakDate
        };
        const restoredKlage = klageStore.restore(klage);

        expect(restoredKlage).not.toBe(expectedKlage);
        expect(restoredKlage).toStrictEqual(expectedKlage);
    });

    it('Should not overwrite klage when values are null', () => {
        const storage = new MockStorage();
        const klageStore = new KlageStorage(storage);
        const expectedFritekst = 'fritekst';
        const expectedVedtakDate = '2020-12-31';
        const expectedVedtakType = VedtakType.EARLIER;

        const expectedKlage: Klage = {
            ...BASE_KLAGE,
            status: KlageStatus.DRAFT,
            fritekst: expectedFritekst,
            vedtakType: expectedVedtakType,
            vedtakDate: expectedVedtakDate
        };
        const restoredKlage = klageStore.restore(expectedKlage);

        expect(restoredKlage).toBe(expectedKlage);
    });

    it('Should not overwrite klage when values are equal', () => {
        const storage = new MockStorage();
        const klageStore = new KlageStorage(storage);
        const expectedFritekst = 'fritekst';
        const expectedVedtakDate = '2020-12-31';
        const expectedVedtakType = VedtakType.EARLIER;

        klageStore.store(expectedFritekst, expectedVedtakType, expectedVedtakDate);

        const expectedKlage: Klage = {
            ...BASE_KLAGE,
            status: KlageStatus.DRAFT,
            fritekst: expectedFritekst,
            vedtakType: expectedVedtakType,
            vedtakDate: expectedVedtakDate
        };
        const restoredKlage = klageStore.restore(expectedKlage);

        expect(restoredKlage).toBe(expectedKlage);
    });

    it('Should not overwrite klage when status is not DRAFT', () => {
        const storage = new MockStorage();
        const klageStore = new KlageStorage(storage);
        const expectedFritekst = 'fritekst';
        const expectedVedtakDate = '2020-12-31';
        const expectedVedtakType = VedtakType.EARLIER;

        klageStore.store(expectedFritekst, expectedVedtakType, expectedVedtakDate);

        const expectedKlage: Klage = {
            ...BASE_KLAGE,
            status: KlageStatus.DONE,
            fritekst: 'outdated',
            vedtakType: expectedVedtakType,
            vedtakDate: expectedVedtakDate
        };
        const restoredKlage = klageStore.restore(expectedKlage);

        expect(restoredKlage).toBe(expectedKlage);
    });

    it('Should ONLY clear storage keys it owns', () => {
        const storage = new MockStorage({
            shouldBe: 'still here',
            shouldStill: 'be here',
            [KLAGE_STORAGE_KEYS.KLAGE_FRITEKST]: 'not here',
            [KLAGE_STORAGE_KEYS.KLAGE_VEDTAK_TYPE]: 'not here',
            [KLAGE_STORAGE_KEYS.KLAGE_VEDTAK_DATE]: 'not here'
        });
        const klageStore = new KlageStorage(storage);
        klageStore.clear();

        expect(storage.getItem('shouldBe')).toBe('still here');
        expect(storage.getItem('shouldStill')).toBe('be here');
        expect(storage.getItem(KLAGE_STORAGE_KEYS.KLAGE_FRITEKST)).toBeNull();
        expect(storage.getItem(KLAGE_STORAGE_KEYS.KLAGE_VEDTAK_TYPE)).toBeNull();
        expect(storage.getItem(KLAGE_STORAGE_KEYS.KLAGE_VEDTAK_DATE)).toBeNull();
    });
});

class MockStorage implements Storage {
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