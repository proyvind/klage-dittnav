import { BodyLong, BodyShort, Button, Heading, Panel } from '@navikt/ds-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { useSessionAnkeErrors } from '@app/hooks/use-errors';
import { Clipboard } from '@app/icons/clipboard';
import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { useTranslation } from '@app/language/use-translation';
import { PageIdentifier } from '@app/logging/amplitude';
import { useLogPageView } from '@app/logging/use-log-page-view';
import { CenteredContainer } from '@app/styled-components/common';
import { CenteredHeading } from '@app/styled-components/page-title';
import { PostFormContainer } from '../../../case/common/post/post-form-container';
import { DownloadButton } from '../../../case/uinnlogget/summary/download-button';
import { InformationPointBox } from '../../../information-point-box/information-point-box';
import { PersonligeOpplysningerSummary } from '../../../summary/personlige-opplysninger-summary';
import { VedtakSummary } from '../../../summary/vedtak-summary';
import { AnkeSessionLoader } from '../anke-session-loader';
import { ISessionAnke } from '../types';

interface Props {
  innsendingsytelse: Innsendingsytelse;
}

export const SessionAnkeoppsummeringPage = (props: Props) => (
  <AnkeSessionLoader Component={PostAnkeoppsummeringPage} {...props} />
);

interface IProps {
  anke: ISessionAnke;
}

const PostAnkeoppsummeringPage = ({ anke }: IProps) => {
  const { common, ankeskjema } = useTranslation();

  useLogPageView(PageIdentifier.ANKESKJEMA_OPPSUMMERING);

  const { isValid } = useSessionAnkeErrors(anke);

  const { steps, title_fragment, page_title } = ankeskjema.common;

  return (
    <PostFormContainer
      innsendingsytelse={anke.innsendingsytelse}
      activeStep={2}
      isValid={isValid}
      steps={steps}
      title_fragment={title_fragment}
      page_title={page_title}
    >
      <div>
        <Icon />
        <CenteredHeading level="2" size="medium">
          {ankeskjema.summary.title}
        </CenteredHeading>
      </div>
      <StyledPanel border>
        <Section>
          <Heading level="1" size="small" spacing>
            {ankeskjema.summary.sections.person.title}
          </Heading>
          <PersonligeOpplysningerSummary {...anke.navn} f_or_d_number={anke.foedselsnummer} />
        </Section>

        <Section>
          <Heading level="1" size="small" spacing>
            {ankeskjema.summary.sections.case.title}
          </Heading>
          <VedtakSummary
            translations={ankeskjema}
            internalSaksnummer={anke.internalSaksnummer}
            userSaksnummer={anke.userSaksnummer}
            vedtakDate={anke.vedtakDate}
            type="anke"
            enhetsnummer={anke.enhetsnummer}
          />
        </Section>

        <Section>
          <Heading level="1" size="small" spacing>
            {ankeskjema.summary.sections.begrunnelse.title}
          </Heading>
          <VerticalContent>
            <InformationPointBox header={ankeskjema.summary.sections.begrunnelse.why}>
              <StyledBodyLong>{anke.fritekst}</StyledBodyLong>
            </InformationPointBox>
          </VerticalContent>
        </Section>

        <Section>
          <Heading level="1" size="small" spacing>
            {ankeskjema.summary.sections.begrunnelse.documents}
          </Heading>
          <BodyShort>{anke.hasVedlegg ? common.yes : common.no}</BodyShort>
        </Section>
      </StyledPanel>

      <CenteredContainer>
        <Button as={Link} variant="secondary" to="../begrunnelse">
          {common.back}
        </Button>
        <DownloadButton caseData={anke} type="anke" />
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
