import { Anke, AnkeStatus } from './types/anke';

export enum ANKE_STORAGE_KEYS {
    ANKE_FRITEKST = 'ANKE_FRITEKST'
}

export class AnkeStorage {
    private storage: Storage;
    private keys = Object.values(ANKE_STORAGE_KEYS);

    constructor(storage: Storage) {
        this.storage = storage;
    }

    private setValue(key: ANKE_STORAGE_KEYS, value: string | null) {
        if (value === null) {
            this.storage.removeItem(key);
        } else {
            this.storage.setItem(key, value);
        }
    }

    public getFritekst = () => this.storage.getItem(ANKE_STORAGE_KEYS.ANKE_FRITEKST);

    public store(fritekst: string) {
        this.setValue(ANKE_STORAGE_KEYS.ANKE_FRITEKST, fritekst);
    }

    public restore(anke: Anke): Anke {
        if (anke.status !== AnkeStatus.DRAFT) {
            return anke;
        }
        const fritekst = this.getFritekst();

        if (fritekst === null || fritekst === anke.fritekst) {
            return anke;
        }

        return {
            ...anke,
            fritekst: fritekst ?? anke.fritekst
        };
    }

    public clear = () => this.keys.forEach(key => this.storage.removeItem(key));
}

export default new AnkeStorage(window.sessionStorage);
