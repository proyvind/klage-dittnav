import { Heading } from '@navikt/ds-react';
import React from 'react';
import styled from 'styled-components';
import { displayBytes } from '@app/functions/display';
import { Language } from '@app/language/language';
import { Attachment, CaseStatus } from '@app/redux-api/case/types';
import { Section } from '@app/styled-components/summary';
import { FileIcon } from '../attachments/file-icon';
import { ExternalLink } from '../link/link';

interface Props {
  status: CaseStatus;
  id: string | number;
  attachments: Attachment[];
  basePath: string;
  translations: Language['klageskjema' | 'ankeskjema'];
}

export const AttachmentSummary = ({ status, id, attachments, basePath, translations }: Props) => {
  if (attachments.length === 0) {
    return null;
  }

  if (status !== CaseStatus.DRAFT) {
    return (
      <Section>
        <Heading level="1" size="small" spacing>
          {translations.summary.sections.begrunnelse.documents} ({attachments.length})
        </Heading>
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
      </Section>
    );
  }

  return (
    <Section>
      <Heading level="1" size="small" spacing>
        {translations.summary.sections.begrunnelse.documents} ({attachments.length})
      </Heading>
      <AttachmentList>
        {attachments.map((attachment) => (
          <li key={attachment.id}>
            <ExternalLink href={`${basePath}/${id}/vedlegg/${attachment.id}`}>
              <FileIcon contentType={attachment.contentType} />
              <span>
                {attachment.tittel} ({displayBytes(attachment.sizeInBytes)})
              </span>
            </ExternalLink>
          </li>
        ))}
      </AttachmentList>
    </Section>
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
