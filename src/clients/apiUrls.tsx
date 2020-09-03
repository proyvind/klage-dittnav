// const port = process.env.REACT_APP_API_PORT || 3001;
import Environment from '../utils/environment';

export const getUserDataUrl = (): string => `${Environment.REACT_APP_API_URL}/bruker`;

export const getKlagerUrl = (): string => `${Environment.REACT_APP_API_URL}/klager`;

export const getKlageByIdUrl = (id: number): string => `${Environment.REACT_APP_API_URL}/klager/${id}`;

export const getKlagerByKlageIdUrl = (id: number): string => `${Environment.REACT_APP_API_URL}/klager/klageid/${id}`;

export const getKlagerByFnrUrl = (fnr: string): string => `${Environment.REACT_APP_API_URL}/klager/fnr/${fnr}`;

export const getAddKlageUrl = (): string => `${Environment.REACT_APP_API_URL}/klager`;

export const getLoginserviceRedirectUrl = (params: string): string =>
    `${Environment.REACT_APP_LOGINSERVICE_URL}?redirect=${Environment.REACT_APP_URL}/klage${params}`;

export const getVedleggUrl = (klageId: number, vedleggId: string): string =>
    `${Environment.REACT_APP_API_URL}/klager/${klageId}/vedlegg/${vedleggId}`;

export const getAddVedleggUrl = (id: number): string => `${Environment.REACT_APP_API_URL}/klager/${id}/vedlegg`;

export const getDeleteVedleggUrl = (klageId: number, vedleggId: string): string =>
    `${Environment.REACT_APP_API_URL}/klager/${klageId}/vedlegg/${vedleggId}`;

export const getFinalizeKlageUrl = (klageId: number): string =>
    `${Environment.REACT_APP_API_URL}/klager/${klageId}/finalize`;

export const getKlageJournalpostIdUrl = (klageId: number): string =>
    `${Environment.REACT_APP_API_URL}/klager/${klageId}/journalpostid`;

export const getTemaObjectUrl = (klageKode: string): string => `${Environment.REACT_APP_API_URL}/temaer/${klageKode}`;
