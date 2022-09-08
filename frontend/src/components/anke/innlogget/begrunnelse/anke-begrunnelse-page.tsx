import { Button } from '@navikt/ds-react';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useErrors } from '../../../../hooks/use-errors';
import { useSupportsDigitalAnke } from '../../../../hooks/use-supports-digital';
import { useUser } from '../../../../hooks/use-user';
import { useLanguage } from '../../../../language/use-language';
import { useTranslation } from '../../../../language/use-translation';
import { PageIdentifier } from '../../../../logging/amplitude';
import { AppEventEnum } from '../../../../logging/error-report/action';
import { addAppEvent } from '../../../../logging/error-report/error-report';
import { useLogPageView } from '../../../../logging/use-log-page-view';
import {
  useDeleteAnkeMutation,
  useDeleteAttachmentMutation,
  useUpdateAnkeMutation,
  useUploadAttachmentMutation,
} from '../../../../redux-api/case/anke/api';
import { Anke } from '../../../../redux-api/case/anke/types';
import { CaseStatus } from '../../../../redux-api/case/types';
import { API_PATH } from '../../../../redux-api/common';
import { CenteredContainer } from '../../../../styled-components/common';
import { AttachmentsSection } from '../../../attachments/attachments';
import { DigitalFormContainer } from '../../../case/common/digital/digital-form-container';
import { VedtakDateDigital } from '../../../case/common/digital/vedtak-date';
import { Errors } from '../../../case/common/errors';
import { FormFieldsIds } from '../../../case/common/form-fields-ids';
import { PostFormContainer } from '../../../case/common/post/post-form-container';
import { BegrunnelseTextDigital } from '../../../case/innlogget/begrunnelse/begrunnelse-text';
import { HasVedleggCheckbox } from '../../../case/innlogget/begrunnelse/has-vedlegg';
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

  useLogPageView(PageIdentifier.ANKESKJEMA_BEGRUNNElSE);

  const { ankeskjema, ankeskjema_post } = useTranslation();

  const supportsDigital = useSupportsDigitalAnke(anke.tema, null);
  const [deleteAttachment] = useDeleteAttachmentMutation();
  const [deleteAnke, { isLoading }] = useDeleteAnkeMutation();

  const { errors, isValid, isEverythingValid, setError } = useErrors({
    type: 'anke',
    caseData: anke,
  });

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

  const deleteAndReturn = () => {
    addAppEvent(AppEventEnum.DELETE_CASE);
    deleteAnke(anke.id)
      .unwrap()
      .then(() => navigate(`/${language}`, { replace: true }));
  };

  const Attachments = supportsDigital
    ? () => (
        <AttachmentsSection
          attachments={anke.vedlegg}
          caseId={anke.id}
          translations={ankeskjema}
          basePath={`${API_PATH}/anker`}
          onDelete={deleteAttachment}
          useUploadAttachment={useUploadAttachmentMutation}
        />
      )
    : () => (
        <HasVedleggCheckbox
          caseId={anke.id}
          hasVedlegg={anke.hasVedlegg}
          translations={ankeskjema_post}
          useUpdateMutation={useUpdateAnkeMutation}
        />
      );

  const Container = supportsDigital ? DigitalFormContainer : PostFormContainer;

  const { steps, title_fragment, page_title } = supportsDigital ? ankeskjema.common : ankeskjema_post.common;

  return (
    <Container
      activeStep={1}
      isValid={isValid}
      temaKey={anke.tema}
      titleKey={anke.titleKey}
      klageOrAnke={anke}
      steps={steps}
      title_fragment={title_fragment}
      page_title={page_title}
    >
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

      <KaEnhet enhet={anke.enhetsnummer} caseId={anke.id} onError={setError} error={errors[FormFieldsIds.KLAGEENHET]} />

      <UserSaksnummerDigital
        userSaksnummer={anke.userSaksnummer}
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

      <Attachments />

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
    </Container>
  );
};

const NEXT_PAGE_URL = '../oppsummering';
