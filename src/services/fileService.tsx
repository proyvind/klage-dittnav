import * as baseService from './baseService';
import { getAddVedleggUrl, getDeleteVedleggUrl } from '../clients/apiUrls';

export const addVedleggToKlage = (klageId: string | number, vedlegg: File) =>
    baseService.postVedlegg(getAddVedleggUrl(klageId), vedlegg);

export const deleteVedlegg = (klageID: string | number, vedleggID: number | string) =>
    baseService.deleteVedlegg(getDeleteVedleggUrl(klageID, vedleggID));
