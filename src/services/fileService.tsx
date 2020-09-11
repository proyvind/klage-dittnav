import * as baseService from './baseService';
import { getAddVedleggUrl, getDeleteVedleggUrl } from '../clients/apiUrls';
import { Vedlegg } from '../types/vedlegg';

export const addVedleggToKlage = (id: number, vedlegg: FormData) =>
    baseService.postVedlegg(getAddVedleggUrl(id), vedlegg);

export const deleteVedlegg = (vedlegg: Vedlegg) =>
    baseService.deleteVedlegg(getDeleteVedleggUrl(vedlegg.klageId, vedlegg.id));
