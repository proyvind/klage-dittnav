import { BodyLong, Button, ErrorMessage, Heading, Panel } from '@navikt/ds-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSupportsDigitalKlage } from '../../../../hooks/use-supports-digital';
import { useIsAuthenticated, useUser } from '../../../../hooks/use-user';
import { Clipboard } from '../../../../icons/clipboard';
import { useTranslation } from '../../../../language/use-translation';
import { PageIdentifier } from '../../../../logging/amplitude';
import { useLogPageView } from '../../../../logging/use-log-page-view';
import { Klage } from '../../../../redux-api/case/klage/types';
import { CaseStatus } from '../../../../redux-api/case/types';
import { API_PATH } from '../../../../redux-api/common';
import { CenteredContainer } from '../../../../styled-components/common';
import { CenteredHeading } from '../../../../styled-components/page-title';
import { Section } from '../../../../styled-components/summary';
import { DigitalFormContainer } from '../../../case/common/digital/digital-form-container';
import { SummaryReasons } from '../../../case/common/summary-reasons';
import { DownloadButton } from '../../../case/innlogget/summary/download-button';
import { FinalizeDigitalKlage } from '../../../case/innlogget/summary/finalize-digital';
import { PdfLink } from '../../../case/innlogget/summary/pdf-link';
import { InformationPointBox } from '../../../information-point-box/information-point-box';
import { Optional } from '../../../optional/optional';
import { AttachmentSummary } from '../../../summary/attachment-summary';
import { PersonligeOpplysningerSummary } from '../../../summary/personlige-opplysninger-summary';
import { VedtakSummary } from '../../../summary/vedtak-summary';
import { KlageLoader } from '../klage-loader';

export const KlageoppsummeringPage = () => <KlageLoader Component={DigitalKlageoppsummeringPage} />;

interface Props {
  klage: Klage;
}

const DigitalKlageoppsummeringPage = ({ klage }: Props) => {
  const { klageskjema, common } = useTranslation();
  const { data: isAuthenticated } = useIsAuthenticated();

  const [error, setError] = useState<string | null>(null);

  const { data: user, isLoading: userIsLoading } = useUser();

  useLogPageView(PageIdentifier.KLAGESKJEMA_OPPSUMMERING);

  const supportsDigital = useSupportsDigitalKlage(klage.innsendingsytelse);

  if (userIsLoading || typeof user === 'undefined') {
    return null;
  }

  const FinalizeButton = supportsDigital ? FinalizeDigitalKlage : DownloadButton;

  const incompleteStatus = klage.status === CaseStatus.DRAFT || klage.status === CaseStatus.DOWNLOADED;

  return (
    <DigitalFormContainer
      activeStep={2}
      isValid={klage.fritekst.length !== 0}
      klageOrAnke={klage}
      page_title={klageskjema.common.page_title}
      steps={klageskjema.common.steps}
      innsendingsytelse={klage.innsendingsytelse}
      title_fragment={klageskjema.common.title_fragment}
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
          <BodyLong spacing>{klageskjema.summary.sections.person.info_from}</BodyLong>
          <PersonligeOpplysningerSummary
            {...user.navn}
            f_or_d_number={user.folkeregisteridentifikator?.identifikasjonsnummer ?? ''}
          />
        </Section>

        <Section>
          <Heading level="1" size="small" spacing>
            {klageskjema.summary.sections.case.title}
          </Heading>
          <VedtakSummary translations={klageskjema} {...klage} type="klage" />
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

        <AttachmentSummary
          id={klage.id}
          status={klage.status}
          attachments={klage.vedlegg}
          basePath={`${API_PATH}/klager`}
          translations={klageskjema}
        />
      </StyledPanel>

      {getError(error)}

      <Optional show={isAuthenticated === false}>
        <CenteredContainer>
          <ErrorMessage>{common.logged_out}</ErrorMessage>
        </CenteredContainer>
      </Optional>

      <CenteredContainer>
        <Optional show={incompleteStatus}>
          <Button as={Link} variant="secondary" to="../begrunnelse">
            {common.back}
          </Button>
        </Optional>
        <FinalizeButton {...klage} id={klage.id} setError={setError} subPath="klager" />
      </CenteredContainer>

      <PdfLink
        show={supportsDigital && incompleteStatus}
        text={klageskjema.summary.post_link}
        href={`${API_PATH}/klager/${klage.id}/pdf/innsending`}
        id={klage.id}
        hasVedlegg={klage.hasVedlegg}
        hasUploadedVedlegg={klage.vedlegg.length !== 0}
        type="klage"
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
