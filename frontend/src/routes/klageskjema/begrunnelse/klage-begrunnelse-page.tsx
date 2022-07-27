import { Alert, BodyShort, Button } from '@navikt/ds-react';
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
  useUpdateKlageMutation,
  useUploadAttachmentMutation,
} from '../../../redux-api/case/klage/api';
import { Klage } from '../../../redux-api/case/klage/types';
import { CaseStatus } from '../../../redux-api/case/types';
import { API_PATH } from '../../../redux-api/common';
import { KlageLoader } from '../../../store/klage/klage-loader';
import { klageStore } from '../../../store/klage/klage-store';
import { CenteredContainer } from '../../../styled-components/common';
import { login } from '../../../user/login';
import { UserLoader } from '../../../user/user-loader';
import { KlageFormContainer } from '../form-container';
import { FullmaktInfo } from './fullmakt-info';
import { Reasons } from './reasons';
import { Saksnummer } from './saksnummer';
import { VedtakDate } from './vedtak-date';

export const KlagebegrunnelsePage = () => (
  <UserLoader>
    <KlageLoader Component={RenderKlagebegrunnelsePage} />
  </UserLoader>
);

interface Props {
  klage: Klage;
}

const RenderKlagebegrunnelsePage = ({ klage }: Props) => {
  const navigate = useNavigate();
  const language = useLanguage();

  useLogPageView(PageIdentifier.KLAGESKJEMA_BEGRUNNElSE);

  const { klageskjema } = useTranslation();

  const [showErrors, setShowErrors] = useState(false);

  const [uploadAttachment] = useUploadAttachmentMutation();
  const [deleteAttachment] = useDeleteAttachmentMutation();

  useEffect(() => {
    if (klage.status !== CaseStatus.DRAFT) {
      navigate(`/${language}/klage/${klage.id}/oppsummering`, { replace: true });
    }
  }, [klage, navigate, language]);

  const submitKlage = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    setShowErrors(true);

    if (!validForm()) {
      return;
    }

    navigate(`/${language}/klage/${klage.id}/oppsummering`);
  };

  const storeKlageAndLogIn = () => {
    klageStore.store(klage.fritekst, klage.checkboxesSelected, klage.vedtakDate, klage.userSaksnummer);
    login();
  };

  const validBegrunnelse = () => klage.fritekst.length !== 0;
  const validForm = validBegrunnelse;

  const getFeilmeldinger = () => {
    if (!validBegrunnelse()) {
      return [klageskjema.begrunnelse.begrunnelse_text.begrunnelse_mangler];
    }

    return [];
  };

  return (
    <KlageFormContainer activeStep={1} isValid={validForm()}>
      <FullmaktInfo klageId={klage.id} />

      <Reasons checkedReasons={klage.checkboxesSelected} id={klage.id} logIn={storeKlageAndLogIn} />

      <VedtakDate
        title={klageskjema.begrunnelse.vedtak_date.title}
        vedtakDate={klage.vedtakDate}
        lang={language}
        id={klage.id}
        useUpdateVedtakDate={useUpdateKlageMutation}
        logIn={storeKlageAndLogIn}
      />

      <Saksnummer
        initialSaksnummer={klage.userSaksnummer}
        internalSaksnummer={klage.internalSaksnummer}
        id={klage.id}
        logIn={storeKlageAndLogIn}
      />

      <BegrunnelseText
        id={klage.id}
        initialFritekst={klage.fritekst}
        useUpdateFritekst={useUpdateKlageMutation}
        showErrors={showErrors}
        placeholder={klageskjema.begrunnelse.begrunnelse_text.placeholder}
        description={klageskjema.begrunnelse.begrunnelse_text.description}
        errorText={klageskjema.begrunnelse.begrunnelse_text.error_empty}
        translations={klageskjema}
        logIn={storeKlageAndLogIn}
      />

      <AttachmentsSection
        attachments={klage.vedlegg}
        caseId={klage.id}
        translations={klageskjema}
        basePath={`${API_PATH}/klager`}
        onDelete={deleteAttachment}
        uploadAttachment={(params) => uploadAttachment(params).unwrap()}
        logIn={storeKlageAndLogIn}
      />

      {showErrors && !validForm() && (
        <Alert variant="error">
          {getFeilmeldinger().map((feilmelding, index) => (
            <BodyShort key={index}>{feilmelding}</BodyShort>
          ))}
        </Alert>
      )}

      <CenteredContainer>
        <Button variant="primary" onClick={submitKlage}>
          {klageskjema.begrunnelse.next_button}
        </Button>
      </CenteredContainer>
    </KlageFormContainer>
  );
};
