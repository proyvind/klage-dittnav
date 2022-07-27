import React from 'react';
import styled from 'styled-components';
import { displayBytes } from '../../functions/display';
import { ExternalLink } from '../../link/link';
import { Attachment, CaseStatus } from '../../redux-api/case/types';
import { FileIcon } from '../attachments/file-icon';

interface Props {
  status: CaseStatus;
  id: string | number;
  attachments: Attachment[];
  basePath: string;
}

export const AttachmentSummary = ({ status, id, attachments, basePath }: Props) => {
  if (status !== CaseStatus.DRAFT) {
    return (
      <AttachmentList>
        {attachments.map((attachment) => (
          <StyledListItem key={attachment.id}>
            <FileIcon contentType={attachment.contentType} />
            <span>
              {attachment.tittel} ({displayBytes(attachment.sizeInBytes)})
            </span>
          </StyledListItem>
        ))}
      </AttachmentList>
    );
  }

  return (
    <AttachmentList>
      {attachments.map((attachment) => (
        <li key={attachment.id}>
          <ExternalLink href={`${basePath}/${id}/vedlegg/${attachment.id}`} openInNewWindow>
            <FileIcon contentType={attachment.contentType} />
            <span>
              {attachment.tittel} ({displayBytes(attachment.sizeInBytes)})
            </span>
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

const StyledListItem = styled.li`
  display: flex;
  align-items: center;
  flex-direction: row;
  column-gap: 4px;
`;
