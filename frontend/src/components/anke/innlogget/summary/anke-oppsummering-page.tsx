import { BodyLong, Button, ErrorMessage, Heading, Panel } from '@navikt/ds-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAnkeErrors } from '@app/hooks/use-errors';
import { useIsAuthenticated, useUser } from '@app/hooks/use-user';
import { Clipboard } from '@app/icons/clipboard';
import { useTranslation } from '@app/language/use-translation';
import { PageIdentifier } from '@app/logging/amplitude';
import { useLogPageView } from '@app/logging/use-log-page-view';
import { Anke } from '@app/redux-api/case/anke/types';
import { CaseStatus } from '@app/redux-api/case/types';
import { API_PATH } from '@app/redux-api/common';
import { CenteredContainer } from '@app/styled-components/common';
import { CenteredHeading } from '@app/styled-components/page-title';
import { Section } from '@app/styled-components/summary';
import { DigitalFormContainer } from '../../../case/common/digital/digital-form-container';
import { FinalizeDigitalAnke } from '../../../case/innlogget/summary/finalize-digital';
import { PdfLink } from '../../../case/innlogget/summary/pdf-link';
import { InformationPointBox } from '../../../information-point-box/information-point-box';
import { Optional } from '../../../optional/optional';
import { AttachmentSummary } from '../../../summary/attachment-summary';
import { PersonligeOpplysningerSummary } from '../../../summary/personlige-opplysninger-summary';
import { VedtakSummary } from '../../../summary/vedtak-summary';
import { AnkeLoader } from '../anke-loader';

export const AnkeoppsummeringPage = () => <AnkeLoader Component={DigitalAnkeoppsummeringPage} />;

interface Props {
  anke: Anke;
}

const DigitalAnkeoppsummeringPage = ({ anke }: Props) => {
  const { ankeskjema, common } = useTranslation();
  const { data: isAuthenticated } = useIsAuthenticated();

  const [error, setError] = useState<string | null>(null);

  const { data: user, isLoading: userIsLoading } = useUser();

  useLogPageView(PageIdentifier.ANKESKJEMA_OPPSUMMERING);

  const { isValid } = useAnkeErrors(anke);

  if (userIsLoading || typeof user === 'undefined') {
    return null;
  }

  const incompleteStatus = anke.status === CaseStatus.DRAFT || anke.status === CaseStatus.DOWNLOADED;

  return (
    <DigitalFormContainer
      activeStep={2}
      isValid={isValid}
      klageOrAnke={anke}
      page_title={ankeskjema.common.page_title}
      steps={ankeskjema.common.steps}
      innsendingsytelse={anke.innsendingsytelse}
      title_fragment={ankeskjema.common.title_fragment}
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
          <VedtakSummary translations={ankeskjema} {...anke} type="anke" />
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
        <FinalizeDigitalAnke {...anke} id={anke.id} setError={setError} />
      </CenteredContainer>

      <PdfLink
        show={incompleteStatus}
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
