import { IFile } from 'forhandsvisningsfil';

export interface Attachment {
    readonly content: string;
    readonly contentType: string; // Default value is "Ukjent" in backend.
    readonly id: number;
    readonly klageId: number;
    readonly ref: string;
    readonly sizeInBytes: number;
    readonly tittel: string;
}

export interface AttachmentFile extends IFile {
    readonly id: string;
    readonly content: {
        base64: string;
    };
    readonly klageId: number;
}

export enum ATTACHMENT_STATUS {
    OK,
    ERROR
}

export const toFiles = (attachment: Attachment[]) => attachment.map(toFile);

export const toFile = (attachment: Attachment): AttachmentFile => ({
    content: { base64: attachment.content },
    id: attachment.id.toString(),
    mimetype: 'application/pdf',
    name: toPdfFileName(attachment.tittel),
    size: attachment.sizeInBytes,
    klageId: attachment.klageId
});

const toPdfFileName = (filename: string) => filename.substr(0, filename.lastIndexOf('.')) + '.pdf';

const ATTACHMENT_ERROR_MESSAGES = {
    TOO_LARGE: 'Filstørrelsen kan ikke være større enn 8 MB.',
    TOTAL_TOO_LARGE: 'Total filstørrelse kan ikke være større enn 32 MB.',
    ENCRYPTED: 'Vi mistenker at filen din er kryptert, den kan derfor ikke sendes med i din klage.',
    EMPTY: 'Du kan ikke sende med en tom fil.',
    VIRUS: 'Vi mistenker at filen din inneholder et virus, den kan derfor ikke sendes med i din klage.',
    FILE_COULD_NOT_BE_CONVERTED:
        'Du har prøvd å legge til et vedlegg med feil format. Vedlegg er begrenset til PNG, JPEG, og PDF.'
};

type AttachmentErrorKey = keyof typeof ATTACHMENT_ERROR_MESSAGES;

const ATTACHMENT_ERROR_KEYS = Object.keys(ATTACHMENT_ERROR_MESSAGES);

export const getAttachmentErrorMessage = (key: string): string => {
    const ensuredKey = ensureStringIsAttachmentErrorKey(key);
    if (ensuredKey === null) {
        return key;
    }
    return ATTACHMENT_ERROR_MESSAGES[ensuredKey];
};

function ensureStringIsAttachmentErrorKey(key: string): AttachmentErrorKey | null {
    if (ATTACHMENT_ERROR_KEYS.includes(key)) {
        return key as AttachmentErrorKey;
    }
    return null;
}
