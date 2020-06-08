import * as baseService from './baseService';
import { getAddVedleggUrl } from '../clients/apiUrls';

export const addVedleggToKlage = (id: number, vedlegg: File[]) => {
    return baseService.postVedlegg(getAddVedleggUrl(id), vedlegg);
};
