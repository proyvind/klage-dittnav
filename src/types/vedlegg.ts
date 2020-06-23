export interface Vedlegg {
    tittel: string;
    ref: string;
    klageId: number;
    type: string;
    id: number;
}

export interface VedleggResponse {
    id?: number;
    message?: string;
}

export enum VEDLEGG_STATUS {
    OK,
    ERROR
}

export interface VedleggProps {
    status: VEDLEGG_STATUS;
    message?: string;
    id?: number;
    vedlegg: Vedlegg;
}
