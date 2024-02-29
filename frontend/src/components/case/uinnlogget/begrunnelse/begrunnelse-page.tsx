import { BodyLong, Button, Checkbox, CheckboxGroup, GuidePanel } from '@navikt/ds-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { EttersendelseKaEnhet } from '@app/components/case/common/ettersendelse-ka-enhet';
import { KaEnhet } from '@app/components/case/common/ka-enhet';
import { VedtakDate } from '@app/components/case/common/vedtak-date';
import { redirectToNav } from '@app/functions/redirect-to-nav';
import { INITIAL_ERRORS } from '@app/hooks/errors/types';
import { useSessionCaseErrors } from '@app/hooks/errors/use-session-case-errors';
import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { useLanguage } from '@app/language/use-language';
import { useTranslation } from '@app/language/use-translation';
import { AppEventEnum } from '@app/logging/error-report/action';
import { addAppEvent } from '@app/logging/error-report/error-report';
import { useAppDispatch } from '@app/redux/configure-store';
import { deleteSessionCase, updateSessionCase } from '@app/redux/session/session';
import { CaseType } from '@app/redux-api/case/types';
import { CenteredContainer } from '@app/styled-components/common';
import { DeleteCaseButton } from '../../../delete-case-button/delete-case-button';
import { Errors } from '../../common/errors';
import { FormFieldsIds } from '../../common/form-fields-ids';
import { PostFormContainer } from '../../common/post/post-form-container';
import { Reasons } from '../../common/reasons';
import { Saksnummer } from '../../common/saksnummer';
import { KlageSessionLoader } from '../session-loader';
import { ISessionCase } from '../types';
import { BegrunnelseText } from './begrunnelse-text';
import { UserInfo } from './user-info';

interface IProps {
  innsendingsytelse: Innsendingsytelse;
  type: CaseType;
}

export const SessionCasebegrunnelsePage = (props: IProps) => (
  <KlageSessionLoader Component={RenderKlagebegrunnelsePage} {...props} />
);

interface Props {
  data: ISessionCase;
}

const RenderKlagebegrunnelsePage = ({ data }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const language = useLanguage();

  const updateCase = (update: Partial<ISessionCase>) => {
    const { type, innsendingsytelse: ytelse } = data;

    dispatch(updateSessionCase({ type, innsendingsytelse: ytelse, data: update }));
  };

  const { skjema, post, common } = useTranslation();

  const validate = useSessionCaseErrors(data.type);

  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [isValid, setIsValid] = useState(false);

  // Reset errors and validation when language changes.
  useEffect(() => {
    setErrors(INITIAL_ERRORS);
    setIsValid(false);
  }, [language]);

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

    navigate('../oppsummering');
  };

  const deleteAndReturn = () => {
    dispatch(deleteSessionCase({ type: data.type, innsendingsytelse: data.innsendingsytelse }));
    redirectToNav();
  };

  const { page_title, title_fragment } = skjema.common;
  const { steps } = skjema;

  const isKlage = data.type === CaseType.KLAGE;
  const isAnke = data.type === CaseType.ANKE;
  const isEttersendelseAnke = data.type === CaseType.ETTERSENDELSE_ANKE;
  const isEttersendelseKlage = data.type === CaseType.ETTERSENDELSE_KLAGE;

  return (
    <PostFormContainer
      activeStep={1}
      isValid={isValid}
      page_title={page_title[data.type]}
      steps={steps[data.type]}
      innsendingsytelse={data.innsendingsytelse}
      title_fragment={title_fragment[data.type]}
    >
      <GuidePanel>
        <BodyLong spacing>{post.should_log_in_digital[data.type]}</BodyLong>
        <BodyLong>{post.employer_info[data.type]}</BodyLong>
      </GuidePanel>

      <UserInfo data={data} update={(info) => updateCase(info)} errors={errors} />

      {isKlage ? (
        <Reasons
          checkedReasons={data.checkboxesSelected}
          onChange={(checkboxesSelected) => updateCase({ checkboxesSelected })}
        />
      ) : null}

      <VedtakDate
        value={data.vedtakDate}
        onChange={(vedtakDate) => updateCase({ vedtakDate })}
        error={errors[FormFieldsIds.VEDTAK_DATE]}
        type={data.type}
      />

      {isAnke || isEttersendelseAnke ? (
        <KaEnhet
          enhet={data.enhetsnummer}
          error={errors[FormFieldsIds.ENHETSNUMMER]}
          onChange={(enhetsnummer) => updateCase({ enhetsnummer })}
          type={data.type}
        />
      ) : null}

      {isEttersendelseKlage ? (
        <EttersendelseKaEnhet
          enhet={data.enhetsnummer}
          caseIsAtKA={data.caseIsAtKA}
          onEnhetChange={(enhetsnummer) => updateCase({ enhetsnummer })}
          onIsAtKaChange={(caseIsAtKA) => updateCase({ caseIsAtKA })}
          error={errors[FormFieldsIds.CASE_IS_AT_KA]}
          enhetError={errors[FormFieldsIds.ENHETSNUMMER]}
          type={data.type}
        />
      ) : null}

      <Saksnummer
        internalSaksnummer={data.internalSaksnummer}
        value={data.userSaksnummer}
        onChange={(userSaksnummer) => updateCase({ userSaksnummer, internalSaksnummer: null })}
        error={errors[FormFieldsIds.SAKSNUMMER]}
      />

      <BegrunnelseText
        value={data.fritekst}
        description={skjema.begrunnelse.begrunnelse_text.description[data.type]}
        placeholder={skjema.begrunnelse.begrunnelse_text.placeholder[data.type]}
        label={skjema.begrunnelse.begrunnelse_text.title[data.type]}
        onChange={(fritekst) => updateCase({ fritekst })}
        error={errors[FormFieldsIds.FRITEKST]}
        type={data.type}
      />

      <CheckboxGroup
        value={data.hasVedlegg ? [HAS_VEDLEGG] : []}
        error={errors[FormFieldsIds.VEDLEGG]}
        onChange={(value: string[]) => updateCase({ hasVedlegg: value.includes(HAS_VEDLEGG) })}
        legend={common.has_attachments_label}
        hideLegend
      >
        <Checkbox value={HAS_VEDLEGG}>{common.has_attachments_label}</Checkbox>
      </CheckboxGroup>

      <Errors {...errors} />

      <CenteredContainer>
        <DeleteCaseButton
          isLoading={false}
          onDelete={deleteAndReturn}
          title={skjema.begrunnelse.delete_title[data.type]}
        />

        <Button as={Link} variant="primary" onClick={submitKlage} to="../oppsummering" relative="path">
          {skjema.begrunnelse.next_button}
        </Button>
      </CenteredContainer>
    </PostFormContainer>
  );
};

const HAS_VEDLEGG = 'hasVedlegg';
