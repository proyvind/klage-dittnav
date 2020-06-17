import * as baseService from './baseService';
import { getAddVedleggUrl } from '../clients/apiUrls';

export const addVedleggToKlage = (id: number, vedlegg: FormData) => {
    console.log('Form data:', vedlegg);
    return baseService.postVedlegg(getAddVedleggUrl(id), vedlegg);
};
