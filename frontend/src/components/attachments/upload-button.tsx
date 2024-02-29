import { UploadIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import React, { useRef } from 'react';
import { styled } from 'styled-components';
import { isError } from '@app/functions/is-api-error';
import { useTranslation } from '@app/language/use-translation';
import { AppEventEnum } from '@app/logging/error-report/action';
import { addAppEvent } from '@app/logging/error-report/error-report';
import { useUploadAttachmentMutation } from '@app/redux-api/case/api';

interface Props {
  caseId: string;
  inputId: string;
  setLoading: (loading: boolean) => void;
  isLoading: boolean;
  addError: (error: FetchBaseQueryError) => void;
}

export const UploadButton = ({ inputId, setLoading, isLoading, addError, caseId }: Props) => {
  const { skjema } = useTranslation();
  const fileInput = useRef<HTMLInputElement>(null);
  const [uploadAttachment] = useUploadAttachmentMutation();

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
          addError(err);
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
        icon={<UploadIcon aria-hidden />}
      >
        {skjema.begrunnelse.attachments.upload_button_text}
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
