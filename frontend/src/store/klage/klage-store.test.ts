import { Reason } from '../../redux-api/case/klage/types';
import { KLAGE_STORAGE_KEYS, KlageStorage } from './klage-store';

describe('klage store', () => {
  it('should store klage values', () => {
    expect.assertions(4);

    const storage = new MockStorage();
    const klageStore = new KlageStorage(storage);
    const expectedFritekst = 'fritekst';
    const expectedVedtakDate = '2020-12-31';
    const expectedUserSaksnummer = '123';
    const expectedReasons = [Reason.AVSLAG_PAA_SOKNAD];

    klageStore.store(expectedFritekst, expectedReasons, expectedVedtakDate, expectedUserSaksnummer);

    const fritekst = klageStore.getFritekst();
    const reasons = klageStore.getReasons();
    const isoDate = klageStore.getVedtakDate();
    const userSaksnummer = klageStore.getUserSaksnummer();

    expect(fritekst).toBe(expectedFritekst);
    expect(reasons).toStrictEqual(expectedReasons);
    expect(isoDate).toBe(expectedVedtakDate);
    expect(userSaksnummer).toBe(expectedUserSaksnummer);
  });

  it('should ONLY clear storage keys it owns', () => {
    expect.assertions(5);

    const storage = new MockStorage({
      shouldBe: 'still here',
      shouldStill: 'be here',
      [KLAGE_STORAGE_KEYS.KLAGE_FRITEKST]: 'not here',
      [KLAGE_STORAGE_KEYS.KLAGE_REASONS]: 'not here',
      [KLAGE_STORAGE_KEYS.KLAGE_VEDTAK_DATE]: 'not here',
    });
    const klageStore = new KlageStorage(storage);
    klageStore.clear();

    expect(storage.getItem('shouldBe')).toBe('still here');
    expect(storage.getItem('shouldStill')).toBe('be here');
    expect(storage.getItem(KLAGE_STORAGE_KEYS.KLAGE_FRITEKST)).toBeNull();
    expect(storage.getItem(KLAGE_STORAGE_KEYS.KLAGE_REASONS)).toBeNull();
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
    return keys[index] ?? null;
  }

  public clear() {
    this.values.clear();
  }

  get length(): number {
    return this.values.size;
  }
}
