export interface Vedlegg {
    name: string;
    ref: string;
    klageId: number;
    mimetype: string;
    id: string;
    size: number;
    content: any;
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

export const VedleggErrorMessages = {
    TOO_LARGE: 'Filstørrelsen kan ikke være større enn 8 MB.',
    TOTAL_TOO_LARGE: 'Total filstørrelse kan ikke være større enn 32 MB.',
    ENCRYPTED: 'Vi mistenker at filen din er kryptert, den kan derfor ikke sendes med i din klage.',
    EMPTY: 'Du kan ikke sende med en tom fil.',
    VIRUS: 'Vi mistenker at filen din inneholder et virus, den kan derfor ikke sendes med i din klage.',
    FILE_COULD_NOT_BE_CONVERTED:
        'Du har sendt ved et vedlegg med feil format. Vedlegg er begrenset til PNG, JPEG, og PDF.'
};

const rename = (obj: any, oldName: string, newName: string) => {
    if (!obj.hasOwnProperty(oldName)) {
        return false;
    }

    obj[newName] = obj[oldName];
    delete obj[oldName];
    return true;
};

const toPdfFile = (filename: string) => {
    return filename.substr(0, filename.lastIndexOf('.')) + '.pdf';
};

export const toVedleggProps = (data: any) => {
    rename(data, 'tittel', 'name');
    rename(data, 'sizeInBytes', 'size');
    data.name = toPdfFile(data.name);
    data.id = '' + data.id;
    data.mimetype = 'application/pdf';
    data.content = {
        base64: data.content
    };
    delete data.contentType;
    return data;
};
