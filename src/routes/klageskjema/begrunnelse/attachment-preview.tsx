import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { AttachmentFile } from '../../../klage/attachment';
import { FileFlexItem, CenterOnMobile } from '../../../styled-components/common';
import { matchMediaQueries } from '../../../styled-components/media-queries';

interface Props {
    attachments: AttachmentFile[];
    deleteAttachment: (attachment: AttachmentFile) => void;
}

const AttachmentPreview = (props: Props) => {
    const [isSmall, setIsSmall] = useState<boolean>(matchMediaQueries.mobileS.matches);

    useEffect(() => {
        matchMediaQueries.mobileS.addListener(width => setIsSmall(width.matches));
    });

    if (props.attachments.length === 0) {
        return null;
    }

    return (
        <AttachmentPreviewContainer>
            {props.attachments.map(attachment => (
                <FileFlexItem
                    key={attachment.id}
                    file={attachment}
                    buttonsVisibility="always"
                    buttonsPosition="header"
                    viewOnePage
                    showDeleteButton
                    onDeleteFile={() => props.deleteAttachment(attachment)}
                    scale={isSmall ? 1 : 2}
                />
            ))}
        </AttachmentPreviewContainer>
    );
};

const AttachmentPreviewContainer = styled(CenterOnMobile)`
    margin-bottom: 32px;
`;

export default AttachmentPreview;
