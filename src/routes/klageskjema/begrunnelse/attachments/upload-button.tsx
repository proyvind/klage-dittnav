import React, { useRef } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { Row } from '../../../../styled-components/row';
import { ISODateTime } from '../../../../date/date';
import { Attachment, getAttachmentErrorMessage } from '../../../../klage/attachment';
import { ApiError } from '../../../../api/errors';
import { addAttachment } from '../../../../api/api';
import { Klage } from '../../../../klage/klage';
import { useTranslation } from '../../../../language/use-translation';

interface UploadError {
    timestamp: ISODateTime;
    status: number;
    error: string;
    path: string;
    detail: string;
}

interface Props {
    klage: Klage;
    attachments: Attachment[];
    inputId: string;
    setAttachments: (attachments: Attachment[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string) => void;
}

const UploadButton = ({ inputId, klage, attachments, setAttachments, setLoading, setError }: Props) => {
    const { klageskjema } = useTranslation();
    const { upload_button_text, upload_error } = klageskjema.begrunnelse.attachments;
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
                return await addAttachment(klage.id, file);
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
