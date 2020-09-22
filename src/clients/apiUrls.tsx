// const port = process.env.REACT_APP_API_PORT || 3001;
import Environment from '../utils/environment';

export const getUserDataUrl = () => `${Environment.REACT_APP_API_URL}/bruker`;

export const getKlagerUrl = () => `${Environment.REACT_APP_API_URL}/klager`;

export const getKlageByIdUrl = (id: string | number): string => `${Environment.REACT_APP_API_URL}/klager/${id}`;

export const getKlagerByKlageIdUrl = (id: number) => `${Environment.REACT_APP_API_URL}/klager/klageid/${id}`;

export const getKlagerByFnrUrl = (fnr: string) => `${Environment.REACT_APP_API_URL}/klager/fnr/${fnr}`;

export const getAddKlageUrl = (): string => `${Environment.REACT_APP_API_URL}/klager`;

export const getLoginserviceRedirectUrl = (params: string) =>
    `${Environment.REACT_APP_LOGINSERVICE_URL}?redirect=${Environment.REACT_APP_URL}/klage${params}`;

export const getVedleggUrl = (klageId: number, vedleggId: string) =>
    `${Environment.REACT_APP_API_URL}/klager/${klageId}/vedlegg/${vedleggId}`;

export const getAddVedleggUrl = (id: number) => `${Environment.REACT_APP_API_URL}/klager/${id}/vedlegg`;

export const getDeleteVedleggUrl = (klageId: number, vedleggId: string) =>
    `${Environment.REACT_APP_API_URL}/klager/${klageId}/vedlegg/${vedleggId}`;

export const getFinalizeKlageUrl = (klageId: number) => `${Environment.REACT_APP_API_URL}/klager/${klageId}/finalize`;

export const getKlageJournalpostIdUrl = (klageId: number) =>
    `${Environment.REACT_APP_API_URL}/klager/${klageId}/journalpostid`;

export const getKlagePdfUrl = (klageId: number) => `${Environment.REACT_APP_API_URL}/klager/${klageId}/pdf`;

export const getTemaObjectUrl = (klageKode: string) => `${Environment.REACT_APP_API_URL}/temaer/${klageKode}`;
