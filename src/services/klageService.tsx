import * as baseService from './baseService';
import {
    getKlagerUrl,
    getAddKlageUrl,
    getKlageByIdUrl,
    getFinalizeKlageUrl,
    getKlageJournalpostIdUrl,
    getTemaObjectUrl
} from '../clients/apiUrls';
import { Klage, KlageDraft } from '../types/klage';

export const getKlager = () => baseService.get(getKlagerUrl());

export const postKlage = (klage: KlageDraft) => baseService.postKlage(getAddKlageUrl(), klage);

export const putKlage = (klage: Klage) => baseService.putKlage(getKlageByIdUrl(klage.id), klage);

export const getKlage = (klageId: string | number) => baseService.get<Klage>(getKlageByIdUrl(klageId));

export const finalizeKlage = (klageId: string | number) =>
    baseService.post<FinalizedKlage>(getFinalizeKlageUrl(klageId));

export const getJournalpostId = (klageId: string | number) =>
    baseService.get<string>(getKlageJournalpostIdUrl(klageId));

export const getTemaObject = (temaKode: string) => baseService.get<TemaObject>(getTemaObjectUrl(temaKode));

interface TemaObject {
    value: string;
}

export interface FinalizedKlage {
    finalizedDate: string;
}
