import * as baseService from './baseService';
import { getUserDataUrl } from '../clients/apiUrls';

export const getBruker = () => {
    return baseService.get(getUserDataUrl());
};
