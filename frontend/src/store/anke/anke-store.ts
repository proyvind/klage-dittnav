import { Updatable } from '../../redux-api/case/anke/types';

export enum ANKE_STORAGE_KEYS {
  ANKE_FRITEKST = 'ANKE_FRITEKST',
}

export class AnkeStorage {
  private storage: Storage;
  private keys = Object.values(ANKE_STORAGE_KEYS);

  constructor(storage: Storage) {
    this.storage = storage;
  }

  private setValue(key: ANKE_STORAGE_KEYS, value: string | undefined | null) {
    if (value === null || typeof value === 'undefined') {
      this.storage.removeItem(key);
    } else {
      this.storage.setItem(key, value);
    }
  }

  public getFritekst = () => this.storage.getItem(ANKE_STORAGE_KEYS.ANKE_FRITEKST) ?? undefined;

  public store(fritekst: string) {
    this.setValue(ANKE_STORAGE_KEYS.ANKE_FRITEKST, fritekst);
  }

  public get = (): Partial<Updatable> => ({
    fritekst: this.getFritekst(),
  });

  public clear = () => this.keys.forEach((key) => this.storage.removeItem(key));
}

export const ankeStore = new AnkeStorage(window.sessionStorage);
