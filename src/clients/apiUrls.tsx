// const port = process.env.REACT_APP_API_PORT || 3001;
import Environment from "../utils/environment";

const loginUrl = Environment.REACT_APP_LOGINSERVICE_URL;
const baseApiUrl = Environment.REACT_APP_URL;
const baseAppUrl = Environment.REACT_APP_URL;

export const getUserDataUrl = (): string => `${baseApiUrl}/bruker`;

export const getKlagerUrl = (): string => `${baseApiUrl}/klager`;

export const getTemaerUrl = (): string => `${baseApiUrl}/temaer`;

export const getKlageByIdUrl = (id: number): string => `${baseApiUrl}/klager/${id}`;

export const getKlagerByKlageIdUrl = (id: number): string => `${baseApiUrl}/klager/klageid/${id}`;

export const getKlagerByFnrUrl = (fnr: string): string => `${baseApiUrl}/klager/fnr/${fnr}`;

export const getAddKlageUrl = (): string => `${baseApiUrl}/klager`;

export const getLoginserviceRedirectUrl = (): string => `${loginUrl}?redirect=${baseAppUrl}`;

export const getVedtakUrl = (): string => `${baseApiUrl}/vedtak`;
