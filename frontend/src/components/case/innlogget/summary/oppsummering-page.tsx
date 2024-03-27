import { BodyLong, Button, ErrorMessage, Heading, Panel } from '@navikt/ds-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { useCaseErrors } from '@app/hooks/errors/use-case-errors';
import { useGoToBegrunnelseOnError } from '@app/hooks/errors/use-navigate-on-error';
import { useIsAuthenticated, useUser } from '@app/hooks/use-user';
import { Clipboard } from '@app/icons/clipboard';
import { useTranslation } from '@app/language/use-translation';
import { Case, CaseStatus, CaseType } from '@app/redux-api/case/types';
import { API_PATH } from '@app/redux-api/common';
import { CenteredContainer } from '@app/styled-components/common';
import { CenteredHeading } from '@app/styled-components/page-title';
import { Section } from '@app/styled-components/summary';
import { InformationPointBox } from '../../../information-point-box/information-point-box';
import { DigitalFormContainer } from '../../common/digital/digital-form-container';
import { PersonligeOpplysningerSummary } from '../../common/summary/personlige-opplysninger-summary';
import { VedtakSummary } from '../../common/summary/vedtak-summary';
import { SummaryReasons } from '../../common/summary-reasons';
import { CaseLoader } from '../loader';
import { AttachmentSummary } from './attachment-summary';
import { FinalizeDigitalCase } from './finalize-digital';
import { PdfLink } from './pdf-link';

export const CaseOppsummeringPage = () => <CaseLoader Component={DigitalCaseOppsummeringPage} />;

interface Props {
  data: Case;
}

const DigitalCaseOppsummeringPage = ({ data }: Props) => {
  const { common, skjema } = useTranslation();
  const { data: isAuthenticated } = useIsAuthenticated();
  const validate = useCaseErrors(data.type);
  const [isValid] = validate(data);

  const [error, setError] = useState<string | null>(null);

  const { data: user, isLoading: userIsLoading } = useUser();

  useGoToBegrunnelseOnError(isValid);

  if (userIsLoading || user === undefined) {
    return null;
  }

  const incompleteStatus = data.status === CaseStatus.DRAFT || data.status === CaseStatus.DOWNLOADED;

  return (
    <DigitalFormContainer
      activeStep={2}
      isValid={isValid}
      case={data}
      page_title={skjema.common.page_title[data.type]}
      steps={skjema.steps[data.type]}
      innsendingsytelse={data.innsendingsytelse}
      title_fragment={skjema.common.title_fragment[data.type]}
    >
      <div>
        <Icon />
        <CenteredHeading level="2" size="medium">
          {skjema.summary.title}
        </CenteredHeading>
      </div>

      <StyledPanel border>
        <Section>
          <Heading level="1" size="small" spacing>
            {skjema.summary.sections.person.title}
          </Heading>
          <BodyLong spacing>{skjema.summary.sections.person.info_from}</BodyLong>
          <PersonligeOpplysningerSummary
            {...user.navn}
            f_or_d_number={user.folkeregisteridentifikator?.identifikasjonsnummer ?? ''}
          />
        </Section>

        <Section>
          <Heading level="1" size="small" spacing>
            {skjema.summary.sections.case.title}
          </Heading>
          <VedtakSummary {...data} />
        </Section>

        <Section>
          <Heading level="1" size="small" spacing>
            {skjema.summary.sections.begrunnelse.title[data.type]}
          </Heading>
          <VerticalContent>
            {data.type === CaseType.KLAGE ? (
              <InformationPointBox header={skjema.summary.sections.begrunnelse.what[data.type]}>
                <SummaryReasons checkboxesSelected={data.checkboxesSelected} />
              </InformationPointBox>
            ) : null}
            <InformationPointBox header={skjema.summary.sections.begrunnelse.why[data.type]}>
              <StyledBodyLong>{data.fritekst.length === 0 ? common.not_specified : data.fritekst}</StyledBodyLong>
            </InformationPointBox>
          </VerticalContent>
        </Section>

        <AttachmentSummary
          id={data.id}
          status={data.status}
          attachments={data.vedlegg}
          basePath={`${API_PATH}/klanker`}
        />
      </StyledPanel>

      {getError(error)}

      {isAuthenticated === false ? (
        <CenteredContainer>
          <ErrorMessage>{common.logged_out}</ErrorMessage>
        </CenteredContainer>
      ) : null}

      <CenteredContainer>
        {incompleteStatus ? (
          <Button as={Link} variant="secondary" to="../begrunnelse">
            {common.back}
          </Button>
        ) : null}
        <FinalizeDigitalCase {...data} id={data.id} setError={setError} />
      </CenteredContainer>

      <PdfLink
        show={incompleteStatus}
        text={skjema.summary.post_link}
        href={`${API_PATH}/klanker/${data.id}/pdf/innsending`}
        id={data.id}
        hasVedlegg={data.hasVedlegg}
        hasUploadedVedlegg={data.vedlegg.length !== 0}
      />
    </DigitalFormContainer>
  );
};

const getError = (error: string | null) => {
  if (error === null) {
    return null;
  }

  return <ErrorMessage spacing>{error}</ErrorMessage>;
};

const StyledPanel = styled(Panel)`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;

const VerticalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledBodyLong = styled(BodyLong)`
  white-space: pre-wrap;
  word-break: break-word;
`;

const Icon = styled(Clipboard)`
  && {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 16px;
    width: 100px;
  }
`;
