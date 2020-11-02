import * as baseService from './baseService';
import {
    getKlagerUrl,
    getAddKlageUrl,
    getKlageByIdUrl,
    getFinalizeKlageUrl,
    getKlageJournalpostIdUrl,
    getTemaObjectUrl
} from '../clients/apiUrls';
import { ReadOnlyKlage, NewKlage, UpdateKlage } from '../types/klage';
import { ISODate } from '../utils/date';

export const getKlager = () => baseService.get<ReadOnlyKlage[]>(getKlagerUrl());

export const postKlage = (klage: NewKlage) => baseService.postKlage(getAddKlageUrl(), klage);

export const putKlage = (klage: UpdateKlage) => baseService.putKlage(getKlageByIdUrl(klage.id), klage);

export const getKlage = (klageId: string | number) => baseService.get<ReadOnlyKlage>(getKlageByIdUrl(klageId));

export const finalizeKlage = (klageId: string | number) =>
    baseService.post<FinalizedKlage>(getFinalizeKlageUrl(klageId));

export const getJournalpostId = (klageId: string | number) =>
    baseService.get<string>(getKlageJournalpostIdUrl(klageId));

export const getTemaObject = (temaKode: string) => baseService.get<TemaObject>(getTemaObjectUrl(temaKode));

interface TemaObject {
    value: string;
}

export interface FinalizedKlage {
    finalizedDate: ISODate;
}
