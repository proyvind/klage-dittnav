import Environment from '../utils/environment';

export const getUserDataUrl = () => `${Environment.REACT_APP_API_URL}/bruker`;

export const getKlagerUrl = () => `${Environment.REACT_APP_API_URL}/klager`;

export const getKlageByIdUrl = (klageId: string | number): string =>
    `${Environment.REACT_APP_API_URL}/klager/${klageId}`;

export const getAddKlageUrl = (): string => `${Environment.REACT_APP_API_URL}/klager`;

export const getVedleggUrl = (klageId: string | number, vedleggId: string) =>
    `${Environment.REACT_APP_API_URL}/klager/${klageId}/vedlegg/${vedleggId}`;

export const getAddVedleggUrl = (klageId: string | number) =>
    `${Environment.REACT_APP_API_URL}/klager/${klageId}/vedlegg`;

export const getDeleteVedleggUrl = (klageId: string | number, vedleggId: string | number) =>
    `${Environment.REACT_APP_API_URL}/klager/${klageId}/vedlegg/${vedleggId}`;

export const getFinalizeKlageUrl = (klageId: string | number) =>
    `${Environment.REACT_APP_API_URL}/klager/${klageId}/finalize`;

export const getKlageJournalpostIdUrl = (klageId: string | number) =>
    `${Environment.REACT_APP_API_URL}/klager/${klageId}/journalpostid`;

export const getKlagePdfUrl = (klageId: string | number) => `${Environment.REACT_APP_API_URL}/klager/${klageId}/pdf`;

export const getTemaObjectUrl = (klageKode: string) => `${Environment.REACT_APP_API_URL}/temaer/${klageKode}`;
