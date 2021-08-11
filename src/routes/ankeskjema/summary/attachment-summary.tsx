import React from 'react';
import styled from 'styled-components/macro';
import { AttachmentFile } from '../../../store/anke/attachment';
import { ENVIRONMENT } from '../../../environment/environment';
import { ExternalLink } from '../../../link/link';
import { Anke, AnkeStatus } from '../../../store/anke/types/anke';

interface Props {
    anke: Anke;
    attachments: AttachmentFile[];
}

const AttachmentSummary = ({ anke, attachments }: Props) => {
    if (anke.status !== AnkeStatus.DRAFT) {
        return (
            <AttachmentList>
                {attachments.map(attachment => (
                    <li key={attachment.id}>{attachment.name}</li>
                ))}
            </AttachmentList>
        );
    }
    return (
        <AttachmentList>
            {attachments.map(attachment => (
                <li key={attachment.id}>
                    <ExternalLink href={ENVIRONMENT.ankeAttachmentUrl(anke.ankeInternalSaksnummer, attachment.id)}>
                        {attachment.name}
                    </ExternalLink>
                </li>
            ))}
        </AttachmentList>
    );
};

const AttachmentList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
`;

export default AttachmentSummary;
