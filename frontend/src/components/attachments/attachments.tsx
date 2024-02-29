import { TrashIcon, XMarkIcon } from '@navikt/aksel-icons';
import { Alert, BodyLong, Button, ErrorMessage, ErrorSummary, Label } from '@navikt/ds-react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import React, { useState } from 'react';
import { styled } from 'styled-components';
import { displayBytes } from '@app/functions/display';
import { isApiError, isError } from '@app/functions/is-api-error';
import { isErrorMessageKey } from '@app/language/error-messages';
import { useTranslation } from '@app/language/use-translation';
import { AppEventEnum } from '@app/logging/error-report/action';
import { addAppEvent } from '@app/logging/error-report/error-report';
import { DeleteAttachmentParams } from '@app/redux-api/case/params';
import { Attachment } from '@app/redux-api/case/types';
import { ExternalLink } from '../link/link';
import { FileIcon } from './file-icon';
import { UploadButton } from './upload-button';

interface Props {
  attachments: Attachment[];
  onDelete: (attachment: DeleteAttachmentParams) => void;
  basePath: string;
  caseId: string;
  error: string | undefined;
}

const FILE_INPUT_ID = 'file-upload-input';

export const AttachmentsSection = ({ attachments, onDelete, basePath, caseId, error }: Props) => {
  const { skjema, common } = useTranslation();
  const [attachmentsLoading, setAttachmentsLoading] = useState<boolean>(false);
  const [attachmentErrors, setAttachmentErrors] = useState<FetchBaseQueryError[]>([]);

  const deleteAttachment = (attachmentId: number) => {
    addAppEvent(AppEventEnum.DELETE_ATTACHMENT);
    onDelete({ caseId, attachmentId });
  };

  return (
    <>
      <div>
        <Label htmlFor={FILE_INPUT_ID} as="label">
          {skjema.begrunnelse.attachments.title} ({attachments.length})
          {error === undefined ? null : <ErrorMessage>{error}</ErrorMessage>}
        </Label>
        <BodyLong>{skjema.begrunnelse.attachments.description}</BodyLong>
      </div>
      <StyledList>
        {attachments.map(({ id, tittel, sizeInBytes, contentType }) => (
          <StyledListItem key={id}>
            <ExternalLink
              href={`${basePath}/${caseId}/vedlegg/${id}`}
              onClick={() => addAppEvent(AppEventEnum.DOWNLOAD_ATTACHMENT)}
            >
              <FileIcon contentType={contentType} />
              <span>
                {tittel} ({displayBytes(sizeInBytes)})
              </span>
            </ExternalLink>
            <Button
              variant="danger"
              size="xsmall"
              title={`${common.delete} ${tittel}`}
              onClick={() => deleteAttachment(id)}
              icon={<TrashIcon aria-hidden />}
            />
          </StyledListItem>
        ))}
      </StyledList>

      <Alert variant="info" inline>
        <BodyLong>{skjema.begrunnelse.attachments.supported_types}</BodyLong>
        <BodyLong>{skjema.begrunnelse.attachments.size_limit}</BodyLong>
      </Alert>

      <ShowErrors errors={attachmentErrors} clear={() => setAttachmentErrors([])} />

      <UploadButton
        inputId={FILE_INPUT_ID}
        setLoading={setAttachmentsLoading}
        caseId={caseId}
        addError={(err) => setAttachmentErrors((e) => [...e, err])}
        isLoading={attachmentsLoading}
      />
    </>
  );
};

interface ShowErrorsProps {
  errors: FetchBaseQueryError[];
  clear: () => void;
}

const ShowErrors = ({ errors, clear }: ShowErrorsProps) => {
  const errorMessages = useErrorMessages(errors);
  const { skjema } = useTranslation();

  if (errors.length === 0) {
    return null;
  }

  const clearErrors = () => {
    clear();
    addAppEvent(AppEventEnum.CLEAR_ERRORS);
  };

  return (
    <div>
      <StyledClearButton size="small" variant="secondary" onClick={clearErrors} icon={<XMarkIcon aria-hidden />}>
        {skjema.begrunnelse.attachments.clear_errors}
      </StyledClearButton>
      <ErrorSummary>
        {errorMessages.map((error, i) => (
          <ErrorSummary.Item key={i} href="#upload-attachment">
            {error}
          </ErrorSummary.Item>
        ))}
      </ErrorSummary>
    </div>
  );
};

const useErrorMessages = (errors: FetchBaseQueryError[]): string[] => {
  const { common, error_messages } = useTranslation();

  return errors.map((error): string => {
    if (isApiError(error)) {
      return isErrorMessageKey(error.data.detail) ? error_messages[error.data.detail] : common.generic_error;
    }

    if (isError(error)) {
      return typeof error.data === 'string' ? error.data : common.generic_error;
    }

    return common.generic_error;
  });
};

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
`;

const StyledListItem = styled.li`
  display: flex;
  align-items: center;
  flex-direction: row;
  column-gap: 8px;
`;
