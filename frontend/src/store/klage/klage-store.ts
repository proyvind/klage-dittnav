import { ISODate } from '../../date/date';
import { Reason, Updatable } from '../../redux-api/case/klage/types';

export enum KLAGE_STORAGE_KEYS {
  KLAGE_FRITEKST = 'KLAGE_FRITEKST',
  KLAGE_VEDTAK_DATE = 'KLAGE_ISO_DATE',
  KLAGE_REASONS = 'KLAGE_DATE_OPTION',
  KLAGE_USER_SAKSNUMMER = 'KLAGE_USER_SAKSNUMMER',
}

export class KlageStorage {
  private storage: Storage;
  private keys = Object.values(KLAGE_STORAGE_KEYS);

  constructor(storage: Storage) {
    this.storage = storage;
  }

  private setValue(key: KLAGE_STORAGE_KEYS, value: string | null | undefined) {
    if (value === null || typeof value === 'undefined') {
      this.storage.removeItem(key);
    } else {
      this.storage.setItem(key, value);
    }
  }

  private getSerializedValue<T>(key: KLAGE_STORAGE_KEYS): T | undefined {
    const serialized = this.storage.getItem(key);

    if (serialized === null) {
      return undefined;
    }

    try {
      return JSON.parse(serialized);
    } catch {
      return undefined;
    }
  }

  public getReasons = () => this.getSerializedValue<Reason[]>(KLAGE_STORAGE_KEYS.KLAGE_REASONS);
  public getVedtakDate = () => this.storage.getItem(KLAGE_STORAGE_KEYS.KLAGE_VEDTAK_DATE) ?? undefined;
  public getFritekst = () => this.storage.getItem(KLAGE_STORAGE_KEYS.KLAGE_FRITEKST) ?? undefined;
  public getUserSaksnummer = () => this.storage.getItem(KLAGE_STORAGE_KEYS.KLAGE_USER_SAKSNUMMER) ?? undefined;

  public store(fritekst: string, reasons: Reason[], vedtakDate: ISODate | null, userSaksnummer: string | null) {
    this.setValue(KLAGE_STORAGE_KEYS.KLAGE_FRITEKST, fritekst);
    this.setValue(KLAGE_STORAGE_KEYS.KLAGE_REASONS, JSON.stringify(reasons));
    this.setValue(KLAGE_STORAGE_KEYS.KLAGE_VEDTAK_DATE, vedtakDate);
    this.setValue(KLAGE_STORAGE_KEYS.KLAGE_USER_SAKSNUMMER, userSaksnummer);
  }

  public get = (): Partial<Updatable> => ({
    fritekst: this.getFritekst(),
    checkboxesSelected: this.getReasons(),
    vedtakDate: this.getVedtakDate(),
    userSaksnummer: this.getUserSaksnummer(),
  });

  public clear = () => this.keys.forEach((key) => this.storage.removeItem(key));
}

export const klageStore = new KlageStorage(window.sessionStorage);
