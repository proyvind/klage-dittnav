import React, { useRef } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { Row } from '../../../../styled-components/row';
import { ISODateTime } from '../../../../date/date';
import { Attachment, getAttachmentErrorMessage } from '../../../../klage/attachment';
import { ApiError } from '../../../../api/errors';
import { addAttachment } from '../../../../api/api';
import { Klage } from '../../../../klage/klage';

interface UploadError {
    timestamp: ISODateTime;
    status: number;
    error: string;
    message: string;
    path: string;
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
                    const errorMessage = getAttachmentErrorMessage(errorBody.message);
                    setError(getUploadAttachmentErrorMessage(file, errorMessage));
                } else if (err instanceof Error) {
                    setError(getUploadAttachmentErrorMessage(file, err.message));
                } else {
                    setError(getUploadAttachmentErrorMessage(file));
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
            <Knapp onClick={handleAttachmentClick}>Last opp nytt vedlegg</Knapp>
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

const getUploadAttachmentErrorMessage = ({ name, type, size }: File, reason: string = 'Ukjent årsak.') =>
    `Kunne ikke laste opp vedlegg "${name}" med type "${type}" på ${size} bytes. ${reason}`;

export default UploadButton;
