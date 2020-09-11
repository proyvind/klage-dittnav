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

export const getKlager = () => baseService.get(getKlagerUrl());

export const postKlage = (klage: Klage) => baseService.postKlage(getAddKlageUrl(), klage);

export const putKlage = (klage: Klage) => baseService.putKlage(getKlageByIdUrl(klage.id!!), klage);

export const getKlage = (klageId: number) => baseService.get<Klage>(getKlageByIdUrl(klageId));

export const finalizeKlage = (klageId: number) => baseService.post<FinalizedKlage>(getFinalizeKlageUrl(klageId));

export const getJournalpostId = (klageId: number) => baseService.get<string>(getKlageJournalpostIdUrl(klageId));

export const getTemaObject = (temaKode: string) => baseService.get<TemaObject>(getTemaObjectUrl(temaKode));

export const setReferrer = (referrer: string) => sessionStorage.setItem('referrer', referrer);

export const getReferrer = () => sessionStorage.getItem('referrer') ?? '';

interface TemaObject {
    value: string;
}

interface FinalizedKlage {
    finalizedDate: string;
}
