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
