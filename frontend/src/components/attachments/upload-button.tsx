import { Upload } from '@navikt/ds-icons';
import { Button } from '@navikt/ds-react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { captureException } from '@sentry/react';
import React, { useRef } from 'react';
import { styled } from 'styled-components';
import { isError } from '@app/functions/is-api-error';
import { Language } from '@app/language/language';
import { AppEventEnum } from '@app/logging/error-report/action';
import { addAppEvent } from '@app/logging/error-report/error-report';
import { useUploadAttachmentMutation as useUploadAnkeAttachmentMutation } from '@app/redux-api/case/anke/api';
import { useUploadAttachmentMutation as useUploadKlageAttachmentMutation } from '@app/redux-api/case/klage/api';

interface Props {
  caseId: string;
  inputId: string;
  useUploadAttachment: typeof useUploadKlageAttachmentMutation | typeof useUploadAnkeAttachmentMutation;
  setLoading: (loading: boolean) => void;
  isLoading: boolean;
  setError: (error: FetchBaseQueryError) => void;
  translations: Language['klageskjema' | 'ankeskjema'];
}

export const UploadButton = ({
  inputId,
  setLoading,
  isLoading,
  setError,
  caseId,
  translations,
  useUploadAttachment,
}: Props) => {
  const { upload_button_text } = translations.begrunnelse.attachments;
  const fileInput = useRef<HTMLInputElement>(null);
  const [uploadAttachment] = useUploadAttachment();

  const handleAttachmentClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    addAppEvent(AppEventEnum.CLICK_UPLOAD_ATTACHMENT);
    fileInput.current?.click();
  };

  const upload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    addAppEvent(AppEventEnum.START_UPLOAD_FILES);

    const { files } = event.target;

    if (files === null || files.length === 0) {
      return;
    }

    setLoading(true);

    const uploads = Array.from(files).map(async (file) => {
      try {
        await uploadAttachment({ caseId, file }).unwrap();
      } catch (err) {
        if (isError(err)) {
          captureException(err);
          setError(err);
        }

        return null;
      }
    });

    await Promise.all(uploads);
    setLoading(false);
  };

  return (
    <>
      <StyledUploadButton
        variant="secondary"
        onClick={handleAttachmentClick}
        loading={isLoading}
        id="upload-attachment"
      >
        <Upload /> {upload_button_text}
      </StyledUploadButton>
      <StyledUploadInput
        id={inputId}
        type="file"
        multiple
        accept="image/png, image/jpeg, image/jpg, .pdf"
        ref={fileInput}
        onChange={(e) => {
          upload(e);
          e.currentTarget.value = '';
        }}
      />
    </>
  );
};

const StyledUploadButton = styled(Button)`
  align-self: flex-start;
`;

const StyledUploadInput = styled.input`
  display: none;
`;
