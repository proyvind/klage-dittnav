import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components/macro';
import { deleteAttachment } from '../../../../api/api';
import { Attachment, AttachmentFile, toFiles } from '../../../../klage/attachment';
import { FileFlexItem, CenterOnMobile } from '../../../../styled-components/common';
import { matchMediaQueries } from '../../../../styled-components/media-queries';

interface Props {
    attachments: Attachment[];
    setAttachments: (attachments: Attachment[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string) => void;
}

const AttachmentPreview = ({ attachments, setAttachments, setLoading, setError }: Props) => {
    const [isSmall, setIsSmall] = useState<boolean>(matchMediaQueries.mobileS.matches);
    const attachmentFiles = useMemo(() => toFiles(attachments), [attachments]);

    useEffect(() => {
        matchMediaQueries.mobileS.addListener(width => setIsSmall(width.matches));
    });

    if (attachments.length === 0) {
        return null;
    }

    const deleteAttachmentHandler = async (attachmentFile: AttachmentFile) => {
        setLoading(true);
        try {
            await deleteAttachment(attachmentFile.klageId, attachmentFile.id);
            setAttachments(attachments.filter(({ id }) => id.toString() !== attachmentFile.id));
            setLoading(false);
        } catch (err) {
            if (err instanceof Error) {
                setError(getDeleteAttachmentErrorMessage(attachmentFile, err.message));
            } else {
                setError(getDeleteAttachmentErrorMessage(attachmentFile));
            }
            setLoading(false);
        }
    };

    return (
        <AttachmentPreviewContainer>
            {attachmentFiles.map(attachment => (
                <FileFlexItem
                    key={attachment.id}
                    file={attachment}
                    buttonsVisibility="always"
                    buttonsPosition="header"
                    viewOnePage
                    showDeleteButton
                    onDeleteFile={() => deleteAttachmentHandler(attachment)}
                    scale={isSmall ? 1 : 2}
                />
            ))}
        </AttachmentPreviewContainer>
    );
};

const AttachmentPreviewContainer = styled(CenterOnMobile)`
    margin-bottom: 32px;
`;

const getDeleteAttachmentErrorMessage = ({ name, id }: AttachmentFile, reason: string = 'Ukjent årsak.') =>
    `Kunne ikke slette vedlegg "${name}" med ID "${id}". ${reason}`;

export default AttachmentPreview;
