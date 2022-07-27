import { Close, Delete } from '@navikt/ds-icons';
import { BodyLong, Button, Label, Loader } from '@navikt/ds-react';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import React, { useState } from 'react';
import styled from 'styled-components';
import { displayBytes } from '../../functions/display';
import { Language } from '../../language/language';
import { ExternalLink } from '../../link/link';
import { AnkeAttachment } from '../../redux-api/case/anke/types';
import { KlageAttachment } from '../../redux-api/case/klage/types';
import { Attachment, DeleteAttachmentParams, UploadAttachmentParams } from '../../redux-api/case/types';
import { KlageAlertStripe } from '../../styled-components/alert';
import { CenteredContainer } from '../../styled-components/common';
import { ErrorProps, Errors } from '../errors/errors';
import { FileIcon } from './file-icon';
import { UploadButton } from './upload-button';

interface Props extends Pick<ErrorProps, 'logIn'> {
  attachments: Attachment[];
  onDelete: (attachment: DeleteAttachmentParams) => void;
  uploadAttachment: (params: UploadAttachmentParams) => Promise<KlageAttachment | AnkeAttachment>;
  basePath: string;
  caseId: string;
  translations: Language['klageskjema' | 'ankeskjema'];
}

const FILE_INPUT_ID = 'file-upload-input';

export const AttachmentsSection = ({
  uploadAttachment,
  attachments,
  onDelete,
  basePath,
  caseId,
  translations,
  logIn,
}: Props) => {
  const [attachmentsLoading, setAttachmentsLoading] = useState<boolean>(false);
  const [attachmentErrors, setAttachmentErrors] = useState<Set<FetchBaseQueryError>>(new Set([]));

  return (
    <div>
      <Label htmlFor={FILE_INPUT_ID} as="label">
        {translations.begrunnelse.attachments.title} ({attachments.length})
      </Label>
      <BodyLong spacing>{translations.begrunnelse.attachments.description}</BodyLong>
      <StyledList>
        {attachments.map(({ id, tittel, sizeInBytes, contentType }) => (
          <StyledListItem key={id}>
            <ExternalLink href={`${basePath}/${caseId}/vedlegg/${id}`} openInNewWindow>
              <FileIcon contentType={contentType} />
              <span>
                {tittel} ({displayBytes(sizeInBytes)})
              </span>
            </ExternalLink>
            <Button
              variant="danger"
              size="small"
              title={`Slett ${tittel}`}
              onClick={() => onDelete({ caseId, attachmentId: id })}
            >
              <Delete />
            </Button>
          </StyledListItem>
        ))}
      </StyledList>

      {showAttachmentLoader(attachmentsLoading)}

      <KlageAlertStripe variant="info" inline>
        <BodyLong>{translations.begrunnelse.attachments.supported_types}</BodyLong>
        <BodyLong>{translations.begrunnelse.attachments.size_limit}</BodyLong>
      </KlageAlertStripe>

      <ShowErrors
        errors={Array.from(attachmentErrors)}
        clear={() => setAttachmentErrors(new Set([]))}
        translations={translations}
        logIn={logIn}
      />

      <UploadButton
        inputId={FILE_INPUT_ID}
        setLoading={setAttachmentsLoading}
        caseId={caseId}
        setError={(error) => setAttachmentErrors((e) => e.add(error))}
        translations={translations}
        isLoading={attachmentsLoading}
        uploadAttachment={uploadAttachment}
      />
    </div>
  );
};

const showAttachmentLoader = (loading: boolean) => {
  if (!loading) {
    return null;
  }

  return (
    <CenteredContainer>
      <Loader type="3xlarge" />
    </CenteredContainer>
  );
};

interface ShowErrorsProps extends Pick<ErrorProps, 'logIn'> {
  errors: (FetchBaseQueryError | SerializedError)[];
  clear: () => void;
  translations: Language['klageskjema' | 'ankeskjema'];
}

const ShowErrors = ({ errors, clear, translations, logIn }: ShowErrorsProps) => {
  if (errors.length === 0) {
    return null;
  }

  return (
    <StyledErrorContainer>
      <StyledClearButton variant="secondary" onClick={clear}>
        <Close /> {translations.begrunnelse.attachments.clear_errors}
      </StyledClearButton>
      {errors.map((error, i) => (
        <Errors key={i} error={error} logIn={logIn} show />
      ))}
    </StyledErrorContainer>
  );
};

const StyledErrorContainer = styled.div`
  margin-bottom: 32px;
`;

const StyledClearButton = styled(Button)`
  margin-bottom: 8px;
`;

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0;
  margin-bottom: 32px;
`;

const StyledListItem = styled.li`
  display: flex;
  align-items: center;
  flex-direction: row;
  column-gap: 8px;
`;
