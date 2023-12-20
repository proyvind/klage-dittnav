import { BodyLong, BodyShort, Button, Heading, Panel } from '@navikt/ds-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { useSessionKlageErrors } from '@app/hooks/use-errors';
import { Clipboard } from '@app/icons/clipboard';
import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { useTranslation } from '@app/language/use-translation';
import { CenteredContainer } from '@app/styled-components/common';
import { CenteredHeading } from '@app/styled-components/page-title';
import { PostFormContainer } from '../../../case/common/post/post-form-container';
import { SummaryReasons } from '../../../case/common/summary-reasons';
import { DownloadButton } from '../../../case/uinnlogget/summary/download-button';
import { InformationPointBox } from '../../../information-point-box/information-point-box';
import { PersonligeOpplysningerSummary } from '../../../summary/personlige-opplysninger-summary';
import { VedtakSummary } from '../../../summary/vedtak-summary';
import { KlageSessionLoader } from '../klage-session-loader';
import { ISessionKlage } from '../types';

interface IProps {
  innsendingsytelse: Innsendingsytelse;
}

export const SessionKlageoppsummeringPage = (props: IProps) => (
  <KlageSessionLoader Component={PostKlageoppsummeringPage} {...props} />
);

interface Props {
  klage: ISessionKlage;
}

const PostKlageoppsummeringPage = ({ klage }: Props) => {
  const { common, klageskjema } = useTranslation();
  const { isValid } = useSessionKlageErrors(klage);

  const { steps, title_fragment, page_title } = klageskjema.common;

  return (
    <PostFormContainer
      innsendingsytelse={klage.innsendingsytelse}
      activeStep={2}
      isValid={isValid}
      steps={steps}
      title_fragment={title_fragment}
      page_title={page_title}
    >
      <div>
        <Icon />
        <CenteredHeading level="2" size="medium">
          {klageskjema.summary.title}
        </CenteredHeading>
      </div>
      <StyledPanel border>
        <Section>
          <Heading level="1" size="small" spacing>
            {klageskjema.summary.sections.person.title}
          </Heading>
          <PersonligeOpplysningerSummary {...klage.navn} f_or_d_number={klage.foedselsnummer} />
        </Section>

        <Section>
          <Heading level="1" size="small" spacing>
            {klageskjema.summary.sections.case.title}
          </Heading>
          <VedtakSummary
            translations={klageskjema}
            internalSaksnummer={klage.internalSaksnummer}
            userSaksnummer={klage.userSaksnummer}
            vedtakDate={klage.vedtakDate}
            type="klage"
          />
        </Section>

        <Section>
          <Heading level="1" size="small" spacing>
            {klageskjema.summary.sections.begrunnelse.title}
          </Heading>
          <VerticalContent>
            <InformationPointBox header={klageskjema.summary.sections.begrunnelse.what}>
              <SummaryReasons checkboxesSelected={klage.checkboxesSelected} />
            </InformationPointBox>
            <InformationPointBox header={klageskjema.summary.sections.begrunnelse.why}>
              <StyledBodyLong>{klage.fritekst}</StyledBodyLong>
            </InformationPointBox>
          </VerticalContent>
        </Section>

        <Section>
          <Heading level="1" size="small" spacing>
            {klageskjema.summary.sections.begrunnelse.documents}
          </Heading>
          <BodyShort>{klage.hasVedlegg ? common.yes : common.no}</BodyShort>
        </Section>
      </StyledPanel>

      <CenteredContainer>
        <Button as={Link} variant="secondary" to="../begrunnelse">
          {common.back}
        </Button>
        <DownloadButton caseData={klage} type="klage" />
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
