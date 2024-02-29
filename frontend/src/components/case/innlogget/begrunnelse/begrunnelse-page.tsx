import { BodyLong, Button, GuidePanel } from '@navikt/ds-react';
import { parseISO } from 'date-fns';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AttachmentsSection } from '@app/components/attachments/attachments';
import { EttersendelseKaEnhet } from '@app/components/case/common/ettersendelse-ka-enhet';
import { FormFieldsIds } from '@app/components/case/common/form-fields-ids';
import { KaEnhet } from '@app/components/case/common/ka-enhet';
import { Reasons } from '@app/components/case/common/reasons';
import { DebouncedSaksnummer } from '@app/components/case/common/saksnummer';
import { VedtakDate } from '@app/components/case/common/vedtak-date';
import { BegrunnelseText } from '@app/components/case/innlogget/begrunnelse/begrunnelse-text';
import { redirectToNav } from '@app/functions/redirect-to-nav';
import { INITIAL_ERRORS } from '@app/hooks/errors/types';
import { useCaseErrors } from '@app/hooks/errors/use-case-errors';
import { useUser } from '@app/hooks/use-user';
import { useLanguage } from '@app/language/use-language';
import { useTranslation } from '@app/language/use-translation';
import { AppEventEnum } from '@app/logging/error-report/action';
import { addAppEvent } from '@app/logging/error-report/error-report';
import { useDeleteAttachmentMutation, useDeleteCaseMutation, useUpdateCaseMutation } from '@app/redux-api/case/api';
import { Case, CaseStatus, CaseType, CaseUpdatable } from '@app/redux-api/case/types';
import { API_PATH } from '@app/redux-api/common';
import { CenteredContainer } from '@app/styled-components/common';
import { DeleteCaseButton } from '../../../delete-case-button/delete-case-button';
import { DigitalFormContainer } from '../../common/digital/digital-form-container';
import { Errors } from '../../common/errors';
import { PersonligeOpplysningerSummary } from '../../common/summary/personlige-opplysninger-summary';
import { CaseLoader } from '../loader';

export const CaseBegrunnelsePage = () => <CaseLoader Component={RenderCasebegrunnelsePage} />;

interface Props {
  data: Case;
}

const RenderCasebegrunnelsePage = ({ data }: Props) => {
  const navigate = useNavigate();
  const language = useLanguage();
  const { data: user } = useUser();

  const { skjema } = useTranslation();

  const [updateCase] = useUpdateCaseMutation();
  const [deleteAttachment] = useDeleteAttachmentMutation();
  const [deleteCase, { isLoading }] = useDeleteCaseMutation();

  const validate = useCaseErrors(data.type);

  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [isValid, setIsValid] = useState(false);

  // Reset errors and validation when language changes.
  useEffect(() => {
    setErrors(INITIAL_ERRORS);
    setIsValid(false);
  }, [language]);

  useEffect(() => {
    if (data.status !== CaseStatus.DRAFT) {
      navigate(NEXT_PAGE_URL, { replace: true });
    }
  }, [data, navigate]);

  const submitKlage = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    addAppEvent(AppEventEnum.SUBMIT);

    const [_isValid, _errors] = validate(data);

    setErrors(_errors);
    setIsValid(_isValid);

    if (!_isValid) {
      addAppEvent(AppEventEnum.INVALID);

      return;
    }

    addAppEvent(AppEventEnum.VALID);

    navigate(NEXT_PAGE_URL);
  };

  const deleteAndReturn = () => deleteCase(data.id).then(redirectToNav);

  const { title_fragment, page_title } = skjema.common;

  const isKlage = data.type === CaseType.KLAGE;
  const isAnke = data.type === CaseType.ANKE;
  const isEttersendelseAnke = data.type === CaseType.ETTERSENDELSE_ANKE;
  const isEttersendelseKlage = data.type === CaseType.ETTERSENDELSE_KLAGE;

  const modified = parseISO(data.modifiedByUser);

  const onChange = useCallback(
    async <T extends keyof CaseUpdatable>(key: T, value: CaseUpdatable[T]) => {
      await updateCase({ key, value, id: data.id });
    },
    [data.id, updateCase],
  );

  return (
    <DigitalFormContainer
      activeStep={1}
      isValid={isValid}
      case={data}
      page_title={page_title[data.type]}
      steps={skjema.steps[data.type]}
      innsendingsytelse={data.innsendingsytelse}
      title_fragment={title_fragment[data.type]}
    >
      <GuidePanel>
        <BodyLong>{skjema.employer_info[data.type]}</BodyLong>
      </GuidePanel>

      {user !== undefined ? (
        <PersonligeOpplysningerSummary
          {...user.navn}
          f_or_d_number={user.folkeregisteridentifikator?.identifikasjonsnummer}
        />
      ) : null}

      {isKlage ? (
        <Reasons
          checkedReasons={data.checkboxesSelected}
          onChange={(reasons) => onChange('checkboxesSelected', reasons)}
        />
      ) : null}

      <VedtakDate
        value={data.vedtakDate}
        error={errors[FormFieldsIds.VEDTAK_DATE]}
        type={data.type}
        onChange={(vedtakDate) => onChange('vedtakDate', vedtakDate)}
      />

      {isAnke || isEttersendelseAnke ? (
        <KaEnhet
          enhet={data.enhetsnummer}
          error={errors[FormFieldsIds.ENHETSNUMMER]}
          onChange={(enhetsnummer) => onChange('enhetsnummer', enhetsnummer)}
          type={data.type}
        />
      ) : null}

      {isEttersendelseKlage ? (
        <EttersendelseKaEnhet
          enhet={data.enhetsnummer}
          caseIsAtKA={data.caseIsAtKA}
          onEnhetChange={(enhetsnummer) => onChange('enhetsnummer', enhetsnummer)}
          onIsAtKaChange={(caseIsAtKA) => onChange('caseIsAtKA', caseIsAtKA)}
          error={errors[FormFieldsIds.CASE_IS_AT_KA]}
          enhetError={errors[FormFieldsIds.ENHETSNUMMER]}
          type={data.type}
        />
      ) : null}

      <DebouncedSaksnummer
        value={data.userSaksnummer}
        internalSaksnummer={data.internalSaksnummer}
        onChange={(userSaksnummer) => onChange('userSaksnummer', userSaksnummer)}
        error={errors[FormFieldsIds.SAKSNUMMER]}
      />

      <BegrunnelseText
        caseId={data.id}
        value={data.fritekst}
        description={skjema.begrunnelse.begrunnelse_text.description[data.type]}
        placeholder={skjema.begrunnelse.begrunnelse_text.placeholder[data.type]}
        label={skjema.begrunnelse.begrunnelse_text.title[data.type]}
        error={errors[FormFieldsIds.FRITEKST]}
        modified={modified}
      />

      <AttachmentsSection
        attachments={data.vedlegg}
        caseId={data.id}
        basePath={`${API_PATH}/klager`}
        onDelete={deleteAttachment}
        error={errors[FormFieldsIds.VEDLEGG]}
      />

      <Errors {...errors} />

      <CenteredContainer>
        <DeleteCaseButton
          isLoading={isLoading}
          onDelete={deleteAndReturn}
          title={skjema.begrunnelse.delete_title[data.type]}
        />

        <Button as={Link} variant="primary" onClick={submitKlage} to={NEXT_PAGE_URL} disabled={user === undefined}>
          {skjema.begrunnelse.next_button}
        </Button>
      </CenteredContainer>
    </DigitalFormContainer>
  );
};

const NEXT_PAGE_URL = '../oppsummering';
