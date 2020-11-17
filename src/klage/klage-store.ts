import { ISODate } from '../date/date';
import { Klage, KlageStatus, VedtakType } from './klage';

export enum KLAGE_STORAGE_KEYS {
    KLAGE_FRITEKST = 'KLAGE_FRITEKST',
    KLAGE_VEDTAK_DATE = 'KLAGE_ISO_DATE',
    KLAGE_VEDTAK_TYPE = 'KLAGE_DATE_OPTION'
}

export class KlageStorage {
    private storage: Storage;
    private keys = Object.values(KLAGE_STORAGE_KEYS);

    constructor(storage: Storage) {
        this.storage = storage;
    }

    private setValue(key: KLAGE_STORAGE_KEYS, value: VedtakType | ISODate | string | null) {
        if (value === null) {
            this.storage.removeItem(key);
        } else {
            this.storage.setItem(key, value);
        }
    }

    public store(fritekst: string, vedtakType: VedtakType | null, vedtakDate: ISODate | null) {
        this.setValue(KLAGE_STORAGE_KEYS.KLAGE_FRITEKST, fritekst);
        this.setValue(KLAGE_STORAGE_KEYS.KLAGE_VEDTAK_TYPE, vedtakType);
        this.setValue(KLAGE_STORAGE_KEYS.KLAGE_VEDTAK_DATE, vedtakDate);
    }

    public restore(klage: Klage): Klage {
        if (klage.status !== KlageStatus.DRAFT) {
            return klage;
        }
        const fritekst = this.storage.getItem(KLAGE_STORAGE_KEYS.KLAGE_FRITEKST);
        const vedtakType = this.storage.getItem(KLAGE_STORAGE_KEYS.KLAGE_VEDTAK_TYPE) as VedtakType | null;
        const vedtakDate = this.storage.getItem(KLAGE_STORAGE_KEYS.KLAGE_VEDTAK_DATE) as ISODate | null;

        if (
            (vedtakType === null || vedtakType === klage.vedtakType) &&
            (vedtakDate === null || vedtakDate === klage.vedtakDate) &&
            (fritekst === null || fritekst === klage.fritekst)
        ) {
            return klage;
        }

        return {
            ...klage,
            fritekst: fritekst ?? klage.fritekst,
            vedtakType: vedtakType ?? klage.vedtakType,
            vedtakDate: vedtakDate ?? klage.vedtakDate
        };
    }

    public clear = () => this.keys.forEach(key => this.storage.removeItem(key));
}

export default new KlageStorage(window.sessionStorage);
