const port = process.env.REACT_APP_API_PORT || 3001;

const baseUrl = `http://localhost:${port}`;

export const getKlagerUrl = (): string => `${baseUrl}/klager`;

export const getKlageByIdUrl = (id: number): string => `${baseUrl}/klager/${id}`;

export const getKlagerByKlageIdUrl = (id: number): string => `${baseUrl}/klager/klageid/${id}`;

export const getKlagerByFnrUrl = (fnr: string): string => `${baseUrl}/klager/fnr/${fnr}`;

export const getAddKlageUrl = (): string => `${baseUrl}/klager`;
