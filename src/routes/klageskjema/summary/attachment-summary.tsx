import React from 'react';
import styled from 'styled-components/macro';
import Lenke from 'nav-frontend-lenker';
import { AttachmentFile } from '../../../klage/attachment';
import { environment } from '../../../environment/environment';
import { Klage, KlageStatus } from '../../../klage/klage';

interface Props {
    klage: Klage;
    attachments: AttachmentFile[];
}

const AttachmentSummary = (props: Props) => (
    <div>
        {props.attachments.map(attachment => (
            <div key={attachment.id}>{getContent(props.klage, attachment)}</div>
        ))}
    </div>
);

const getContent = (klage: Klage, attachment: AttachmentFile) => {
    if (klage.status !== KlageStatus.DRAFT) {
        return <AttachmentText>{attachment.name}</AttachmentText>;
    }

    return (
        <NoBackgroundLink
            href={environment.attachmentUrl(klage.id, attachment.id)}
            target="_blank"
            rel="noopener noreferrer"
        >
            <AttachmentLinkText>{attachment.name}</AttachmentLinkText>
        </NoBackgroundLink>
    );
};

const AttachmentText = styled.span`
    font-size: 16px;
    line-height: 22px;
`;

const AttachmentLinkText = styled.span`
    font-size: 16px;
    line-height: 22px;
    color: #3385d1;
`;

const NoBackgroundLink = styled(Lenke)`
    background: none;
    &:focus {
        box-shadow: none;
        color: #0067c5;
    }
`;

export default AttachmentSummary;
