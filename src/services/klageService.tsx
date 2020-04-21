import * as baseService from './baseService';
import { getKlagerUrl, getAddKlageUrl } from '../clients/apiUrls';

const MOCK_DATA = true;

export const getKlager = () => {
    return baseService.get(getKlagerUrl());
};
export const postKlage = (klage: any) => {
    if (!MOCK_DATA) {
        return baseService.post(getAddKlageUrl(), klage);
    }

    let klagerRaw = localStorage.getItem('klager');
    let klager = [];
    if (klagerRaw) {
        klager = JSON.parse(klagerRaw);
    }
    klager.push(klage);
    localStorage.setItem('klager', JSON.stringify(klager));
};
