import { BodyLong, BodyShort, Button, Heading, Panel } from '@navikt/ds-react';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { isSessionCase } from '../../../../functions/is-session-case';
import { Data, useErrors } from '../../../../hooks/use-errors';
import { useUser } from '../../../../hooks/use-user';
import { Clipboard } from '../../../../icons/clipboard';
import { useTranslation } from '../../../../language/use-translation';
import { PageIdentifier } from '../../../../logging/amplitude';
import { useLogPageView } from '../../../../logging/use-log-page-view';
import { CenteredContainer } from '../../../../styled-components/common';
import { CenteredHeading } from '../../../../styled-components/page-title';
import { InformationPointBox } from '../../../information-point-box/information-point-box';
import { PersonligeOpplysningerSummary } from '../../../summary/personlige-opplysninger-summary';
import { VedtakSummary } from '../../../summary/vedtak-summary';
import { SummaryReasons } from '../summary-reasons';
import { PostFormContainer } from './post-form-container';

type Props = Data & {
  children: React.ReactNode;
};

export const SummaryPagePost = ({ children, ...props }: Props) => {
  const { caseData, type } = props;
  const navigate = useNavigate();
  const { klageskjema, ankeskjema, common, klageskjema_post, ankeskjema_post } = useTranslation();
  const { data: user } = useUser();

  const isKlage = type === 'klage' || type === 'session-klage';
  const pageIdentifier = isKlage ? PageIdentifier.KLAGESKJEMA_OPPSUMMERING : PageIdentifier.ANKESKJEMA_OPPSUMMERING;
  useLogPageView(pageIdentifier);

  const skjema = isKlage ? klageskjema : ankeskjema;
  const skjemaPost = isKlage ? klageskjema_post : ankeskjema_post;

  const { isValid } = useErrors(props);

  useEffect(() => {
    if (!isValid) {
      navigate('../begrunnelse', { replace: true });
    }
  }, [isValid, navigate]);

  if (type === 'ettersendelse') {
    return null;
  }

  const foedselsnummer = isSessionCase(caseData)
    ? caseData.foedselsnummer
    : user?.folkeregisteridentifikator?.identifikasjonsnummer;

  const navn = isSessionCase(caseData) ? caseData.navn : user?.navn;

  const titleKey = type === 'klage' || type === 'session-klage' ? caseData.titleKey : null;

  const { steps, title_fragment, page_title } =
    type === 'klage' || type === 'session-klage' ? klageskjema_post.common : ankeskjema_post.common;

  return (
    <PostFormContainer
      temaKey={caseData.tema}
      activeStep={2}
      titleKey={titleKey}
      isValid={isValid}
      steps={steps}
      title_fragment={title_fragment}
      page_title={page_title}
    >
      <div>
        <Icon />
        <CenteredHeading level="2" size="medium">
          {skjemaPost.summary.title}
        </CenteredHeading>
      </div>
      <StyledPanel border>
        <Section>
          <Heading level="1" size="small" spacing>
            {skjema.summary.sections.person.title}
          </Heading>
          <PersonligeOpplysningerSummary {...navn} f_or_d_number={foedselsnummer} />
        </Section>

        <Section>
          <Heading level="1" size="small" spacing>
            {skjema.summary.sections.case.title}
          </Heading>
          <VedtakSummary
            translations={skjema}
            internalSaksnummer={null}
            userSaksnummer={type === 'klage' || type === 'session-klage' ? caseData.userSaksnummer : null}
            vedtakDate={caseData.vedtakDate}
          />
        </Section>

        <Section>
          <Heading level="1" size="small" spacing>
            {skjema.summary.sections.begrunnelse.title}
          </Heading>
          <VerticalContent>
            {type === 'klage' || type === 'session-klage' ? (
              <InformationPointBox header={klageskjema.summary.sections.begrunnelse.what}>
                <SummaryReasons checkboxesSelected={caseData.checkboxesSelected} />
              </InformationPointBox>
            ) : null}
            <InformationPointBox header={skjema.summary.sections.begrunnelse.why}>
              <StyledBodyLong>{caseData.fritekst}</StyledBodyLong>
            </InformationPointBox>
          </VerticalContent>
        </Section>

        <Section>
          <Heading level="1" size="small" spacing>
            {skjema.summary.sections.begrunnelse.documents}
          </Heading>
          <BodyShort>{caseData.hasVedlegg ? common.yes : common.no}</BodyShort>
        </Section>
      </StyledPanel>

      <CenteredContainer>
        <Button as={Link} variant="secondary" to="../begrunnelse">
          {common.back}
        </Button>
        {children}
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
