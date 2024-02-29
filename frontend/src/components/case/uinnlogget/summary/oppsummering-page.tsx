import { BodyLong, BodyShort, Button, Heading, Panel } from '@navikt/ds-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { ISessionCase } from '@app/components/case/uinnlogget/types';
import { useGoToBegrunnelseOnError } from '@app/hooks/errors/use-navigate-on-error';
import { useSessionCaseErrors } from '@app/hooks/errors/use-session-case-errors';
import { Clipboard } from '@app/icons/clipboard';
import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { useTranslation } from '@app/language/use-translation';
import { CaseType } from '@app/redux-api/case/types';
import { CenteredContainer } from '@app/styled-components/common';
import { CenteredHeading } from '@app/styled-components/page-title';
import { InformationPointBox } from '../../../information-point-box/information-point-box';
import { PostFormContainer } from '../../common/post/post-form-container';
import { PersonligeOpplysningerSummary } from '../../common/summary/personlige-opplysninger-summary';
import { VedtakSummary } from '../../common/summary/vedtak-summary';
import { SummaryReasons } from '../../common/summary-reasons';
import { KlageSessionLoader } from '../session-loader';
import { DownloadButton } from './download-button';

interface IProps {
  innsendingsytelse: Innsendingsytelse;
  type: CaseType;
}

export const SessionCaseOppsummeringPage = (props: IProps) => (
  <KlageSessionLoader Component={PostKlageoppsummeringPage} {...props} />
);

interface Props {
  data: ISessionCase;
}

const PostKlageoppsummeringPage = ({ data }: Props) => {
  const { common, skjema } = useTranslation();
  const validate = useSessionCaseErrors(data.type);
  const [isValid] = validate(data);

  useGoToBegrunnelseOnError(isValid);

  const { title_fragment, page_title } = skjema.common;

  return (
    <PostFormContainer
      innsendingsytelse={data.innsendingsytelse}
      activeStep={2}
      isValid={isValid}
      steps={skjema.steps[data.type]}
      title_fragment={title_fragment[data.type]}
      page_title={page_title[data.type]}
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
          <PersonligeOpplysningerSummary {...data.navn} f_or_d_number={data.foedselsnummer} />
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

        <Section>
          <Heading level="1" size="small" spacing>
            {skjema.summary.sections.begrunnelse.documents}
          </Heading>
          <BodyShort>{data.hasVedlegg ? common.yes : common.no}</BodyShort>
        </Section>
      </StyledPanel>

      <CenteredContainer>
        <Button as={Link} variant="secondary" to="../begrunnelse">
          {common.back}
        </Button>
        <DownloadButton caseData={data} />
      </CenteredContainer>
    </PostFormContainer>
  );
};

const StyledPanel = styled(Panel)`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;

const Section = styled.section`
  padding-bottom: 16px;
  border-bottom: 1px solid #a2a1a1;

  :last-child {
    border-bottom: none;
  }
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
