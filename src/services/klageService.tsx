import * as baseService from './baseService';
import {
    getKlagerUrl,
    getAddKlageUrl,
    getVedtakUrl,
    getTemaerUrl,
    getKlageByIdUrl,
    getFinalizeKlageUrl
} from '../clients/apiUrls';
import { Klage } from '../types/klage';

export const getKlager = () => {
    return baseService.get(getKlagerUrl());
};

export const postKlage = (klage: Klage) => {
    return baseService.postKlage(getAddKlageUrl(), klage);
};

export const putKlage = (klage: Klage) => {
    return baseService.putKlage(getKlageByIdUrl(klage.id!!), klage);
};

export const finalizeKlage = (klageId: number) => {
    return baseService.post(getFinalizeKlageUrl(klageId));
}

export const getVedtak = () => {
    return baseService.get(getVedtakUrl());
};

export const getTemaer = () => {
    return baseService.get(getTemaerUrl());
};
