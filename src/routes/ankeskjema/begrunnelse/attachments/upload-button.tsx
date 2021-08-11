import React, { useRef } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { Row } from '../../../../styled-components/row';
import { ISODateTime } from '../../../../date/date';
import { Attachment, getAttachmentErrorMessage } from '../../../../store/anke/attachment';
import { ApiError } from '../../../../api/errors';
import { useTranslation } from '../../../../language/use-translation';
import { Anke } from '../../../../store/anke/types/anke';
import { addAttachment } from '../../../../api/anke/api';

interface UploadError {
    timestamp: ISODateTime;
    status: number;
    error: string;
    path: string;
    detail: string;
}

interface Props {
    anke: Anke;
    attachments: Attachment[];
    inputId: string;
    setAttachments: (attachments: Attachment[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string) => void;
}

const UploadButton = ({ inputId, anke, attachments, setAttachments, setLoading, setError }: Props) => {
    const { ankeskjema } = useTranslation();
    const { upload_button_text, upload_error } = ankeskjema.begrunnelse.attachments;
    const fileInput = useRef<HTMLInputElement>(null);

    const handleAttachmentClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        fileInput.current?.click();
    };

    const uploadAttachment = async (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        const files = event.target.files;
        if (files === null || files.length === 0) {
            return;
        }

        setLoading(true);

        const uploads = Array.from(files).map(async file => {
            try {
                return await addAttachment(anke.ankeInternalSaksnummer, file);
            } catch (err) {
                if (err instanceof ApiError) {
                    const errorBody: UploadError = await err.response.json();
                    const errorMessage = getAttachmentErrorMessage(errorBody.detail);
                    setError(upload_error(file, errorMessage));
                } else if (err instanceof Error) {
                    setError(upload_error(file, err.message));
                } else {
                    setError(upload_error(file));
                }
                return null;
            }
        });

        await Promise.all(uploads).then(addedAttachments => {
            const addedAttachmentList = addedAttachments.filter(notNull);
            setAttachments(attachments.concat(addedAttachmentList));
            setLoading(false);
        });
    };

    return (
        <Row>
            <Knapp onClick={handleAttachmentClick}>{upload_button_text}</Knapp>
            <input
                id={inputId}
                type="file"
                multiple
                accept="image/png, image/jpeg, image/jpg, .pdf"
                ref={fileInput}
                onChange={e => {
                    uploadAttachment(e);
                    e.currentTarget.value = '';
                }}
                style={{ display: 'none' }}
            />
        </Row>
    );
};

function notNull<T>(v: T | null): v is T {
    return v !== null;
}

export default UploadButton;
