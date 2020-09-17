import { IFile } from 'forhandsvisningsfil';

export interface Vedlegg {
    readonly content: string;
    readonly contentType: string; // Default value is "Ukjent" in backend.
    readonly id: number;
    readonly klageId: number;
    readonly ref: string;
    readonly sizeInBytes: number;
    readonly tittel: string;
}

export interface VedleggFile extends IFile {
    readonly id: string;
    readonly content: {
        base64: string;
    };
    readonly klageId: number;
}

export enum VEDLEGG_STATUS {
    OK,
    ERROR
}

export function toFiles(vedlegg: Vedlegg[]): VedleggFile[] {
    return vedlegg.map(v => toFile(v));
}

export function toFile(vedlegg: Vedlegg): VedleggFile {
    return {
        content: { base64: vedlegg.content },
        id: vedlegg.id.toString(),
        mimetype: 'application/pdf',
        name: toPdfFile(vedlegg.tittel),
        size: vedlegg.sizeInBytes,
        klageId: vedlegg.klageId
    };
}

function toPdfFile(filename: string) {
    return filename.substr(0, filename.lastIndexOf('.')) + '.pdf';
}

export const VEDLEGG_ERROR_MESSAGES = {
    TOO_LARGE: 'Filstørrelsen kan ikke være større enn 8 MB.',
    TOTAL_TOO_LARGE: 'Total filstørrelse kan ikke være større enn 32 MB.',
    ENCRYPTED: 'Vi mistenker at filen din er kryptert, den kan derfor ikke sendes med i din klage.',
    EMPTY: 'Du kan ikke sende med en tom fil.',
    VIRUS: 'Vi mistenker at filen din inneholder et virus, den kan derfor ikke sendes med i din klage.',
    FILE_COULD_NOT_BE_CONVERTED:
        'Du har prøvd å legge til et vedlegg med feil format. Vedlegg er begrenset til PNG, JPEG, og PDF.'
};
