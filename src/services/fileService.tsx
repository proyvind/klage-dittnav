import * as baseService from './baseService';
import { getAddVedleggUrl, getDeleteVedleggUrl } from '../clients/apiUrls';

export const addVedleggToKlage = (id: number, vedlegg: File) => baseService.postVedlegg(getAddVedleggUrl(id), vedlegg);

export const deleteVedlegg = (klageID: number, vedleggID: number | string) =>
    baseService.deleteVedlegg(getDeleteVedleggUrl(klageID, vedleggID.toString()));
