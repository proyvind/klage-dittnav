import { Button } from '@navikt/ds-react';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useKlageErrors } from '../../../../hooks/use-errors';
import { useSupportsDigitalKlage } from '../../../../hooks/use-supports-digital';
import { useUser } from '../../../../hooks/use-user';
import { useLanguage } from '../../../../language/use-language';
import { useTranslation } from '../../../../language/use-translation';
import { PageIdentifier } from '../../../../logging/amplitude';
import { AppEventEnum } from '../../../../logging/error-report/action';
import { addAppEvent } from '../../../../logging/error-report/error-report';
import { useLogPageView } from '../../../../logging/use-log-page-view';
import {
  useDeleteAttachmentMutation,
  useDeleteKlageMutation,
  useUpdateKlageMutation,
  useUploadAttachmentMutation,
} from '../../../../redux-api/case/klage/api';
import { Klage } from '../../../../redux-api/case/klage/types';
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
import { KlageLoader } from '../klage-loader';
import { Reasons } from './reasons';

export const KlagebegrunnelsePage = () => <KlageLoader Component={RenderKlagebegrunnelsePage} />;

interface Props {
  klage: Klage;
}

const RenderKlagebegrunnelsePage = ({ klage }: Props) => {
  const navigate = useNavigate();
  const language = useLanguage();
  const { data: user } = useUser();

  useLogPageView(PageIdentifier.KLAGESKJEMA_BEGRUNNElSE);

  const { klageskjema, klageskjema_post } = useTranslation();

  const supportsDigital = useSupportsDigitalKlage(klage.innsendingsytelse);
  const [deleteAttachment] = useDeleteAttachmentMutation();
  const [deleteKlage, { isLoading }] = useDeleteKlageMutation();

  const { errors, isValid, isEverythingValid, setError } = useKlageErrors(klage);

  useEffect(() => {
    if (klage.status !== CaseStatus.DRAFT) {
      navigate(NEXT_PAGE_URL, { replace: true });
    }
  }, [klage, language, navigate]);

  const submitKlage = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    addAppEvent(AppEventEnum.SUBMIT);

    if (!isEverythingValid()) {
      addAppEvent(AppEventEnum.INVALID);

      return;
    }

    navigate(NEXT_PAGE_URL);
  };

  const deleteAndReturn = () =>
    deleteKlage(klage.id)
      .unwrap()
      .then(() => navigate(`/${language}`, { replace: true }));

  const Attachments = supportsDigital
    ? () => (
        <AttachmentsSection
          attachments={klage.vedlegg}
          caseId={klage.id}
          translations={klageskjema}
          basePath={`${API_PATH}/klager`}
          onDelete={deleteAttachment}
          useUploadAttachment={useUploadAttachmentMutation}
        />
      )
    : () => (
        <HasVedleggCheckbox
          caseId={klage.id}
          hasVedlegg={klage.hasVedlegg}
          translations={klageskjema_post}
          useUpdateMutation={useUpdateKlageMutation}
        />
      );

  const Container = supportsDigital ? DigitalFormContainer : PostFormContainer;

  const { steps, title_fragment, page_title } = supportsDigital ? klageskjema.common : klageskjema_post.common;

  return (
    <Container
      activeStep={1}
      isValid={isValid}
      klageOrAnke={klage}
      page_title={page_title}
      steps={steps}
      innsendingsytelse={klage.innsendingsytelse}
      title_fragment={title_fragment}
    >
      <PersonligeOpplysningerSummary
        {...user?.navn}
        f_or_d_number={user?.folkeregisteridentifikator?.identifikasjonsnummer}
      />

      <Reasons checkedReasons={klage.checkboxesSelected} caseId={klage.id} />

      <VedtakDateDigital
        vedtakDate={klage.vedtakDate}
        caseId={klage.id}
        skjema={klageskjema}
        useUpdate={useUpdateKlageMutation}
        onError={setError}
        error={errors[FormFieldsIds.VEDTAK_DATE]}
      />

      <UserSaksnummerDigital
        userSaksnummer={klage.userSaksnummer}
        internalSaksnummer={klage.internalSaksnummer}
        caseId={klage.id}
        translations={klageskjema}
        useUpdateMutation={useUpdateKlageMutation}
      />

      <BegrunnelseTextDigital
        caseId={klage.id}
        initialFritekst={klage.fritekst}
        useUpdateFritekst={useUpdateKlageMutation}
        placeholder={klageskjema.begrunnelse.begrunnelse_text.placeholder}
        description={klageskjema.begrunnelse.begrunnelse_text.description}
        translations={klageskjema}
        onError={setError}
        error={errors[FormFieldsIds.FRITEKST]}
      />

      <Attachments />

      <Errors {...errors} />

      <CenteredContainer>
        <DeleteCaseButton
          isLoading={isLoading}
          onDelete={deleteAndReturn}
          title={klageskjema.begrunnelse.delete_title}
        />

        <Button
          as={Link}
          variant="primary"
          onClick={submitKlage}
          to={NEXT_PAGE_URL}
          disabled={typeof user === 'undefined'}
        >
          {klageskjema.begrunnelse.next_button}
        </Button>
      </CenteredContainer>
    </Container>
  );
};

const NEXT_PAGE_URL = '../oppsummering';
