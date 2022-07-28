import { BodyLong, Button, ErrorMessage, Heading, Panel } from '@navikt/ds-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LoadingPage } from '../../../../components/loading-page/loading-page';
import { useSupportsDigital } from '../../../../hooks/use-supports-digital';
import { useIsAuthenticated, useUser } from '../../../../hooks/use-user';
import { Clipboard } from '../../../../icons/clipboard';
import { useTranslation } from '../../../../language/use-translation';
import { PageIdentifier } from '../../../../logging/amplitude';
import { useLogPageView } from '../../../../logging/use-log-page-view';
import { Anke } from '../../../../redux-api/case/anke/types';
import { CaseStatus } from '../../../../redux-api/case/types';
import { API_PATH } from '../../../../redux-api/common';
import { CenteredContainer } from '../../../../styled-components/common';
import { CenteredHeading } from '../../../../styled-components/page-title';
import { Section } from '../../../../styled-components/summary';
import { DigitalFormContainer } from '../../../case/common/digital/digital-form-container';
import { SummaryPagePost } from '../../../case/common/post/summary-post';
import { DownloadButton } from '../../../case/innlogget/summary/download-button';
import { FinalizeDigital } from '../../../case/innlogget/summary/finalize-digital';
import { PdfLink } from '../../../case/innlogget/summary/pdf-link';
import { InformationPointBox } from '../../../information-point-box/information-point-box';
import { Optional } from '../../../optional/optional';
import { AttachmentSummary } from '../../../summary/attachment-summary';
import { PersonligeOpplysningerSummary } from '../../../summary/personlige-opplysninger-summary';
import { VedtakSummary } from '../../../summary/vedtak-summary';
import { AnkeLoader } from '../anke-loader';

export const AnkeoppsummeringPage = () => <AnkeLoader Component={Wrapper} />;
export default AnkeoppsummeringPage;

const Wrapper = ({ anke }: { anke: Anke }) => {
  const supportsDigital = useSupportsDigital(anke.tema);
  const { data: user, isLoading: userIsLoading } = useUser();
  const { user_loader } = useTranslation();

  if (supportsDigital) {
    return <DigitalAnkeoppsummeringPage anke={anke} />;
  }

  if (userIsLoading || typeof user === 'undefined') {
    return <LoadingPage>{user_loader.loading_user}</LoadingPage>;
  }

  return (
    <SummaryPagePost caseData={anke} type="anke">
      <DownloadButton id={anke.id} subPath="anker" />
    </SummaryPagePost>
  );
};

interface Props {
  anke: Anke;
}

const DigitalAnkeoppsummeringPage = ({ anke }: Props) => {
  const { ankeskjema, common } = useTranslation();
  const { data: isAuthenticated } = useIsAuthenticated();

  const [error, setError] = useState<string | null>(null);

  const { data: user, isLoading: userIsLoading } = useUser();

  useLogPageView(PageIdentifier.ANKESKJEMA_OPPSUMMERING);

  const supportsDigital = useSupportsDigital(anke.tema);

  if (userIsLoading || typeof user === 'undefined') {
    return null;
  }

  const FinalizeButton = supportsDigital ? FinalizeDigital : DownloadButton;

  const incompleteStatus = anke.status === CaseStatus.DRAFT || anke.status === CaseStatus.DOWNLOADED;

  return (
    <DigitalFormContainer
      activeStep={2}
      isValid={anke.fritekst.length !== 0}
      klageOrAnke={anke}
      page_title={ankeskjema.common.page_title}
      steps={ankeskjema.common.steps}
      temaKey={anke.tema}
      title_fragment={ankeskjema.common.title_fragment}
      titleKey={anke.titleKey}
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
          <BodyLong spacing>{ankeskjema.summary.sections.person.info_from}</BodyLong>
          <PersonligeOpplysningerSummary
            {...user.navn}
            f_or_d_number={user.folkeregisteridentifikator?.identifikasjonsnummer ?? ''}
          />
        </Section>

        <Section>
          <Heading level="1" size="small" spacing>
            {ankeskjema.summary.sections.case.title}
          </Heading>
          <VedtakSummary translations={ankeskjema} {...anke} />
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

        <AttachmentSummary
          id={anke.id}
          status={anke.status}
          attachments={anke.vedlegg}
          basePath={`${API_PATH}/anker`}
          translations={ankeskjema}
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
        <FinalizeButton {...anke} id={anke.id} setError={setError} subPath="anker" />
      </CenteredContainer>

      <PdfLink
        show={supportsDigital && incompleteStatus}
        text={ankeskjema.summary.post_link}
        href={`${API_PATH}/anker/${anke.id}/pdf/innsending`}
        id={anke.id}
        hasVedlegg={anke.hasVedlegg}
        hasUploadedVedlegg={anke.vedlegg.length !== 0}
        type="anke"
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
