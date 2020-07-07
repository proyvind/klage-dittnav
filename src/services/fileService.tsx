import * as baseService from './baseService';
import { getAddVedleggUrl, getDeleteVedleggUrl } from '../clients/apiUrls';
import { Vedlegg } from '../types/vedlegg';

export const addVedleggToKlage = (id: number, vedlegg: FormData) => {
    return baseService.postVedlegg(getAddVedleggUrl(id), vedlegg);
};

export const deleteVedlegg = (vedlegg: Vedlegg) => {
    return baseService.deleteVedlegg(getDeleteVedleggUrl(vedlegg.klageId, vedlegg.id));
};
