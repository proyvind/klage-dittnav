import { Close, Delete } from '@navikt/ds-icons';
import { Alert, BodyLong, Button, ErrorSummary, Label, Loader } from '@navikt/ds-react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import React, { useState } from 'react';
import styled from 'styled-components';
import { displayBytes } from '../../functions/display';
import { isApiError, isError } from '../../functions/is-api-error';
import { Language } from '../../language/language';
import { useTranslation } from '../../language/use-translation';
import { AppEventEnum } from '../../logging/error-report/action';
import { addAppEvent } from '../../logging/error-report/error-report';
import { useUploadAttachmentMutation as useUploadAnkeAttachmentMutation } from '../../redux-api/case/anke/api';
import { useUploadAttachmentMutation as useUploadKlageAttachmentMutation } from '../../redux-api/case/klage/api';
import { Attachment, DeleteAttachmentParams } from '../../redux-api/case/types';
import { CenteredContainer } from '../../styled-components/common';
import { ExternalLink } from '../link/link';
import { FileIcon } from './file-icon';
import { UploadButton } from './upload-button';

interface Props {
  attachments: Attachment[];
  onDelete: (attachment: DeleteAttachmentParams) => void;
  useUploadAttachment: typeof useUploadKlageAttachmentMutation | typeof useUploadAnkeAttachmentMutation;
  basePath: string;
  caseId: string;
  translations: Language['klageskjema' | 'ankeskjema'];
}

const FILE_INPUT_ID = 'file-upload-input';

export const AttachmentsSection = ({
  useUploadAttachment,
  attachments,
  onDelete,
  basePath,
  caseId,
  translations,
}: Props) => {
  const { common } = useTranslation();
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
          {translations.begrunnelse.attachments.title} ({attachments.length})
        </Label>
        <BodyLong>{translations.begrunnelse.attachments.description}</BodyLong>
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
              size="small"
              title={`${common.delete} ${tittel}`}
              onClick={() => deleteAttachment(id)}
              icon={<Delete />}
            />
          </StyledListItem>
        ))}
      </StyledList>

      {showAttachmentLoader(attachmentsLoading)}

      <Alert variant="info" inline>
        <BodyLong>{translations.begrunnelse.attachments.supported_types}</BodyLong>
        <BodyLong>{translations.begrunnelse.attachments.size_limit}</BodyLong>
      </Alert>

      <ShowErrors errors={attachmentErrors} clear={() => setAttachmentErrors([])} translations={translations} />

      <UploadButton
        inputId={FILE_INPUT_ID}
        setLoading={setAttachmentsLoading}
        caseId={caseId}
        setError={(error) => setAttachmentErrors((e) => [...e, error])}
        translations={translations}
        isLoading={attachmentsLoading}
        useUploadAttachment={useUploadAttachment}
      />
    </>
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

interface ShowErrorsProps {
  errors: FetchBaseQueryError[];
  clear: () => void;
  translations: Language['klageskjema' | 'ankeskjema'];
}

const ShowErrors = ({ errors, clear, translations }: ShowErrorsProps) => {
  const errorMessages = useErrorMessages(errors);

  if (errors.length === 0) {
    return null;
  }

  const clearErrors = () => {
    clear();
    addAppEvent(AppEventEnum.CLEAR_ERRORS);
  };

  return (
    <div>
      <StyledClearButton variant="secondary" onClick={clearErrors}>
        <Close /> {translations.begrunnelse.attachments.clear_errors}
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
      return error_messages[error.data.detail] ?? common.generic_error;
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
