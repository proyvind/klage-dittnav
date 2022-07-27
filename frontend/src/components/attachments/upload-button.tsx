import { Upload } from '@navikt/ds-icons';
import { Button } from '@navikt/ds-react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import React, { useRef } from 'react';
import { isError } from '../../functions/is-api-error';
import { Language } from '../../language/language';
import { AnkeAttachment } from '../../redux-api/case/anke/types';
import { KlageAttachment } from '../../redux-api/case/klage/types';
import { UploadAttachmentParams } from '../../redux-api/case/types';

interface Props {
  caseId: string;
  inputId: string;
  uploadAttachment: (params: UploadAttachmentParams) => Promise<KlageAttachment | AnkeAttachment>;
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
  uploadAttachment,
}: Props) => {
  const { upload_button_text } = translations.begrunnelse.attachments;
  const fileInput = useRef<HTMLInputElement>(null);

  const handleAttachmentClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    fileInput.current?.click();
  };

  const upload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const { files } = event.target;

    if (files === null || files.length === 0) {
      return;
    }

    setLoading(true);

    const uploads = Array.from(files).map(async (file) => {
      try {
        await uploadAttachment({ caseId, file });
      } catch (err) {
        if (isError(err)) {
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
      <Button variant="secondary" onClick={handleAttachmentClick} loading={isLoading}>
        <Upload /> {upload_button_text}
      </Button>
      <input
        id={inputId}
        type="file"
        multiple
        accept="image/png, image/jpeg, image/jpg, .pdf"
        ref={fileInput}
        onChange={(e) => {
          upload(e);
          e.currentTarget.value = '';
        }}
        style={{ display: 'none' }}
      />
    </>
  );
};
