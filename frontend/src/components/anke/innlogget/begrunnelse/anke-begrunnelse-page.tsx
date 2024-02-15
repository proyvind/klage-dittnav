import { BodyLong, Button, GuidePanel } from '@navikt/ds-react';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { redirectToNav } from '@app/functions/redirect-to-nav';
import { useAnkeErrors } from '@app/hooks/use-errors';
import { useUser } from '@app/hooks/use-user';
import { useLanguage } from '@app/language/use-language';
import { useTranslation } from '@app/language/use-translation';
import { AppEventEnum } from '@app/logging/error-report/action';
import { addAppEvent } from '@app/logging/error-report/error-report';
import {
  useDeleteAnkeMutation,
  useDeleteAttachmentMutation,
  useUpdateAnkeMutation,
  useUploadAttachmentMutation,
} from '@app/redux-api/case/anke/api';
import { Anke } from '@app/redux-api/case/anke/types';
import { CaseStatus } from '@app/redux-api/case/types';
import { API_PATH } from '@app/redux-api/common';
import { CenteredContainer } from '@app/styled-components/common';
import { AttachmentsSection } from '../../../attachments/attachments';
import { DigitalFormContainer } from '../../../case/common/digital/digital-form-container';
import { VedtakDateDigital } from '../../../case/common/digital/vedtak-date';
import { Errors } from '../../../case/common/errors';
import { FormFieldsIds } from '../../../case/common/form-fields-ids';
import { BegrunnelseTextDigital } from '../../../case/innlogget/begrunnelse/begrunnelse-text';
import { UserSaksnummerDigital } from '../../../case/innlogget/begrunnelse/saksnummer';
import { DeleteCaseButton } from '../../../delete-case-button/delete-case-button';
import { PersonligeOpplysningerSummary } from '../../../summary/personlige-opplysninger-summary';
import { AnkeLoader } from '../anke-loader';
import { KaEnhet } from './ka-enhet';

export const AnkebegrunnelsePage = () => <AnkeLoader Component={RenderAnkebegrunnelsePage} />;

interface Props {
  anke: Anke;
}

const RenderAnkebegrunnelsePage = ({ anke }: Props) => {
  const navigate = useNavigate();
  const language = useLanguage();
  const { data: user } = useUser();
  const { ankeskjema } = useTranslation();

  const [deleteAttachment] = useDeleteAttachmentMutation();
  const [deleteAnke, { isLoading }] = useDeleteAnkeMutation();

  const { errors, isValid, isEverythingValid, setError } = useAnkeErrors(anke);

  useEffect(() => {
    if (anke.status !== CaseStatus.DRAFT) {
      navigate(NEXT_PAGE_URL, { replace: true });
    }
  }, [anke, language, navigate]);

  const submitAnke = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    addAppEvent(AppEventEnum.SUBMIT);

    if (!isEverythingValid() || !isValid) {
      addAppEvent(AppEventEnum.INVALID);

      return;
    }

    navigate(NEXT_PAGE_URL);
  };

  const deleteAndReturn = () => deleteAnke(anke.id).then(redirectToNav);

  const { steps, title_fragment, page_title } = ankeskjema.common;

  return (
    <DigitalFormContainer
      activeStep={1}
      isValid={isValid}
      innsendingsytelse={anke.innsendingsytelse}
      klageOrAnke={anke}
      steps={steps}
      title_fragment={title_fragment}
      page_title={page_title}
    >
      <GuidePanel>
        <BodyLong>{ankeskjema.employer_info}</BodyLong>
      </GuidePanel>

      <PersonligeOpplysningerSummary
        {...user?.navn}
        f_or_d_number={user?.folkeregisteridentifikator?.identifikasjonsnummer}
      />

      <VedtakDateDigital
        vedtakDate={anke.vedtakDate}
        caseId={anke.id}
        useUpdate={useUpdateAnkeMutation}
        skjema={ankeskjema}
        onError={setError}
        error={errors[FormFieldsIds.VEDTAK_DATE_REQUIRED]}
      />

      <KaEnhet
        enhet={anke.enhetsnummer}
        caseId={anke.id}
        onError={setError}
        error={errors[FormFieldsIds.KLAGEENHET_ANKE]}
      />

      <UserSaksnummerDigital
        userSaksnummer={anke.userSaksnummer}
        internalSaksnummer={anke.internalSaksnummer}
        caseId={anke.id}
        translations={ankeskjema}
        useUpdateMutation={useUpdateAnkeMutation}
      />

      <BegrunnelseTextDigital
        caseId={anke.id}
        initialFritekst={anke.fritekst}
        useUpdateFritekst={useUpdateAnkeMutation}
        placeholder={ankeskjema.begrunnelse.begrunnelse_text.placeholder}
        description={ankeskjema.begrunnelse.begrunnelse_text.description}
        translations={ankeskjema}
        onError={setError}
        error={errors[FormFieldsIds.FRITEKST]}
      />

      <AttachmentsSection
        attachments={anke.vedlegg}
        caseId={anke.id}
        translations={ankeskjema}
        basePath={`${API_PATH}/anker`}
        onDelete={deleteAttachment}
        useUploadAttachment={useUploadAttachmentMutation}
      />

      <Errors {...errors} />

      <CenteredContainer>
        <DeleteCaseButton
          isLoading={isLoading}
          onDelete={deleteAndReturn}
          title={ankeskjema.begrunnelse.delete_title}
        />

        <Button
          as={Link}
          to={NEXT_PAGE_URL}
          variant="primary"
          onClick={submitAnke}
          disabled={typeof user === 'undefined'}
        >
          {ankeskjema.begrunnelse.next_button}
        </Button>
      </CenteredContainer>
    </DigitalFormContainer>
  );
};

const NEXT_PAGE_URL = '../oppsummering';
