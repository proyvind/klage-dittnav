import { ISODate } from '../date/date';
import { Klage, KlageStatus, Reason, reasonsMatch } from './klage';

export enum KLAGE_STORAGE_KEYS {
    KLAGE_FRITEKST = 'KLAGE_FRITEKST',
    KLAGE_VEDTAK_DATE = 'KLAGE_ISO_DATE',
    KLAGE_REASONS = 'KLAGE_DATE_OPTION'
}

export class KlageStorage {
    private storage: Storage;
    private keys = Object.values(KLAGE_STORAGE_KEYS);

    constructor(storage: Storage) {
        this.storage = storage;
    }

    private setValue(key: KLAGE_STORAGE_KEYS, value: string | null) {
        if (value === null) {
            this.storage.removeItem(key);
        } else {
            this.storage.setItem(key, value);
        }
    }

    private getSerializedValue<T>(key: KLAGE_STORAGE_KEYS): T | null {
        const serialized = this.storage.getItem(key);
        if (serialized === null) {
            return null;
        }
        try {
            return JSON.parse(serialized);
        } catch {
            return null;
        }
    }

    public getReasons = () => this.getSerializedValue<Reason[]>(KLAGE_STORAGE_KEYS.KLAGE_REASONS);
    public getVedtakDate = () => this.storage.getItem(KLAGE_STORAGE_KEYS.KLAGE_VEDTAK_DATE);
    public getFritekst = () => this.storage.getItem(KLAGE_STORAGE_KEYS.KLAGE_FRITEKST);

    public store(fritekst: string, reasons: Reason[], vedtakDate: ISODate | null) {
        this.setValue(KLAGE_STORAGE_KEYS.KLAGE_FRITEKST, fritekst);
        this.setValue(KLAGE_STORAGE_KEYS.KLAGE_REASONS, JSON.stringify(reasons));
        this.setValue(KLAGE_STORAGE_KEYS.KLAGE_VEDTAK_DATE, vedtakDate);
    }

    public restore(klage: Klage): Klage {
        if (klage.status !== KlageStatus.DRAFT) {
            return klage;
        }
        const fritekst = this.getFritekst();
        const reasons = this.getReasons();
        const vedtakDate = this.getVedtakDate();

        if (
            (reasons === null || reasonsMatch(reasons, klage.checkboxesSelected)) &&
            (vedtakDate === null || vedtakDate === klage.vedtakDate) &&
            (fritekst === null || fritekst === klage.fritekst)
        ) {
            return klage;
        }

        return {
            ...klage,
            fritekst: fritekst ?? klage.fritekst,
            checkboxesSelected: reasons ?? klage.checkboxesSelected,
            vedtakDate: vedtakDate ?? klage.vedtakDate
        };
    }

    public clear = () => this.keys.forEach(key => this.storage.removeItem(key));
}

export default new KlageStorage(window.sessionStorage);
