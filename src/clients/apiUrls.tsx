// const port = process.env.REACT_APP_API_PORT || 3001;
import Environment from '../utils/environment';

export const getUserDataUrl = (): string => `${Environment.REACT_APP_API_URL}/bruker`;

export const getKlagerUrl = (): string => `${Environment.REACT_APP_API_URL}/klager`;

export const getTemaerUrl = (): string => `${Environment.REACT_APP_API_URL}/temaer`;

export const getKlageByIdUrl = (id: number): string => `${Environment.REACT_APP_API_URL}/klager/${id}`;

export const getKlagerByKlageIdUrl = (id: number): string => `${Environment.REACT_APP_API_URL}/klager/klageid/${id}`;

export const getKlagerByFnrUrl = (fnr: string): string => `${Environment.REACT_APP_API_URL}/klager/fnr/${fnr}`;

export const getAddKlageUrl = (): string => `${Environment.REACT_APP_API_URL}/klager`;

export const getLoginserviceRedirectUrl = (): string =>
    `${Environment.REACT_APP_LOGINSERVICE_URL}?redirect=${Environment.REACT_APP_URL}`;

export const getVedtakUrl = (): string => `${Environment.REACT_APP_API_URL}/vedtak`;

export const getAddVedleggUrl = (id: number): string => `${Environment.REACT_APP_API_URL}/klager/${id}/vedlegg`;
