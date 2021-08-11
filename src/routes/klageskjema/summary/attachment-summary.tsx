import React from 'react';
import styled from 'styled-components/macro';
import { AttachmentFile } from '../../../store/klage/attachment';
import { ENVIRONMENT } from '../../../environment/environment';
import { Klage, KlageStatus } from '../../../store/klage/types/klage';
import { ExternalLink } from '../../../link/link';

interface Props {
    klage: Klage;
    attachments: AttachmentFile[];
}

const AttachmentSummary = (props: Props) => {
    if (props.klage.status !== KlageStatus.DRAFT) {
        return (
            <AttachmentList>
                {props.attachments.map(attachment => (
                    <li key={attachment.id}>{attachment.name}</li>
                ))}
            </AttachmentList>
        );
    }
    return (
        <AttachmentList>
            {props.attachments.map(attachment => (
                <li key={attachment.id}>
                    <ExternalLink href={ENVIRONMENT.klageAttachmentUrl(props.klage.id, attachment.id)}>
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
