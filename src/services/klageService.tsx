import * as baseService from './baseService';
import {
    getKlagerUrl,
    getAddKlageUrl,
    getKlageByIdUrl,
    getFinalizeKlageUrl,
    getKlageJournalpostIdUrl,
    getTemaObjectUrl
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
};

export const getJournalpostId = (klageId: number) => {
    return baseService.get(getKlageJournalpostIdUrl(klageId));
};

export const getTemaObject = (temaKode: string) => {
    return baseService.get(getTemaObjectUrl(temaKode));
};
