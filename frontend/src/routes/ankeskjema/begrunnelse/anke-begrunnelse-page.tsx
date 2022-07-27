import { Button } from '@navikt/ds-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AttachmentsSection } from '../../../components/attachments/attachments';
import { BegrunnelseText } from '../../../components/begrunnelse-text';
import { useLanguage } from '../../../language/use-language';
import { useTranslation } from '../../../language/use-translation';
import { PageIdentifier } from '../../../logging/amplitude';
import { useLogPageView } from '../../../logging/use-log-page-view';
import {
  useDeleteAttachmentMutation,
  useUpdateAnkeMutation,
  useUploadAttachmentMutation,
} from '../../../redux-api/case/anke/api';
import { Anke } from '../../../redux-api/case/anke/types';
import { CaseStatus } from '../../../redux-api/case/types';
import { API_PATH } from '../../../redux-api/common';
import { AnkeLoader } from '../../../store/anke/anke-loader';
import { ankeStore } from '../../../store/anke/anke-store';
import { CenteredContainer } from '../../../styled-components/common';
import { login } from '../../../user/login';
import { UserLoader } from '../../../user/user-loader';
import { AnkeFormContainer } from '../form-container';
import { VedtakDate } from './vedtak-date';

export const AnkebegrunnelsePage = () => (
  <UserLoader>
    <AnkeLoader Component={RenderAnkebegrunnelsePage} />
  </UserLoader>
);

interface Props {
  anke: Anke;
}

const RenderAnkebegrunnelsePage = ({ anke }: Props) => {
  const navigate = useNavigate();
  const language = useLanguage();
  useLogPageView(PageIdentifier.ANKESKJEMA_BEGRUNNElSE);
  const [showErrors, setShowErrors] = useState(false);
  const { ankeskjema } = useTranslation();
  const [uploadAttachment] = useUploadAttachmentMutation();
  const [deleteAttachment] = useDeleteAttachmentMutation();

  useEffect(() => {
    if (anke.status !== CaseStatus.DRAFT) {
      navigate(`/${language}/anke/${anke.ankeInternalSaksnummer}/oppsummering`);
    }
  }, [anke, language, navigate]);

  const submitAnke = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    setShowErrors(true);

    if (anke.fritekst.length === 0) {
      return;
    }

    navigate(`/${language}/anke/${anke.ankeInternalSaksnummer}/oppsummering`);
  };

  const storeAnkeAndLogIn = () => {
    ankeStore.store(anke.fritekst);
    login();
  };

  return (
    <AnkeFormContainer activeStep={1} isValid={anke.fritekst.length !== 0}>
      <VedtakDate title={ankeskjema.begrunnelse.vedtak_date.title} vedtakDate={anke.vedtakDate} />

      <BegrunnelseText
        id={anke.ankeInternalSaksnummer}
        initialFritekst={anke.fritekst}
        useUpdateFritekst={useUpdateAnkeMutation}
        showErrors={showErrors}
        placeholder={ankeskjema.begrunnelse.begrunnelse_text.placeholder}
        description={ankeskjema.begrunnelse.begrunnelse_text.description}
        errorText={ankeskjema.begrunnelse.begrunnelse_text.error_empty}
        translations={ankeskjema}
        logIn={storeAnkeAndLogIn}
      />

      <AttachmentsSection
        attachments={anke.vedlegg}
        caseId={anke.ankeInternalSaksnummer}
        translations={ankeskjema}
        basePath={`${API_PATH}/anker`}
        onDelete={deleteAttachment}
        uploadAttachment={(params) => uploadAttachment(params).unwrap()}
        logIn={storeAnkeAndLogIn}
      />

      <CenteredContainer>
        <Button variant="primary" onClick={submitAnke}>
          {ankeskjema.begrunnelse.next_button}
        </Button>
      </CenteredContainer>
    </AnkeFormContainer>
  );
};
