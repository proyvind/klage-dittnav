import React, { useMemo } from 'react';
import styled from 'styled-components/macro';
import { Attachment, AttachmentFile, toFiles } from '../../../../store/anke/attachment';
import { useTranslation } from '../../../../language/use-translation';
import { FileFlexItem, FlexCenteredOnMobile } from '../../../../styled-components/file-preview';
import { Size, useMatchMediaQuery } from '../../../../styled-components/media-queries';
import { deleteAttachment } from '../../../../api/anke/api';

interface Props {
    attachments: Attachment[];
    setAttachments: (attachments: Attachment[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string) => void;
}

const AttachmentPreview = ({ attachments, setAttachments, setLoading, setError }: Props) => {
    const { ankeskjema } = useTranslation();
    const attachmentFiles = useMemo(() => toFiles(attachments), [attachments]);

    const isSmall = useMatchMediaQuery(Size.mobileS);

    if (attachments.length === 0) {
        return null;
    }

    const deleteAttachmentHandler = async (attachmentFile: AttachmentFile) => {
        setLoading(true);
        try {
            await deleteAttachment(attachmentFile.ankeInternalSaksnummer, attachmentFile.id);
            setAttachments(attachments.filter(({ id }) => id.toString() !== attachmentFile.id));
            setLoading(false);
        } catch (err) {
            if (err instanceof Error) {
                setError(
                    ankeskjema.begrunnelse.attachments_preview.delete_error(
                        attachmentFile.name,
                        attachmentFile.id,
                        err.message
                    )
                );
            } else {
                setError(
                    ankeskjema.begrunnelse.attachments_preview.delete_error(attachmentFile.name, attachmentFile.id)
                );
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

const AttachmentPreviewContainer = styled(FlexCenteredOnMobile)`
    margin-bottom: 32px;
`;

export default AttachmentPreview;
