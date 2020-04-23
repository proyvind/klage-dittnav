import * as baseService from './baseService';
import { getKlagerUrl, getAddKlageUrl } from '../clients/apiUrls';

export const getKlager = () => {
    return baseService.get(getKlagerUrl());
};
export const postKlage = (klage: any) => {
    return baseService.post(getAddKlageUrl(), klage);
};
