import { BodyLong, Button, Heading, Panel } from '@navikt/ds-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { InformationPointBox } from '../../../components/information-point-box/information-point-box';
import { AttachmentSummary } from '../../../components/summary/attachment-summary';
import { PersonligeOpplysningerSummary } from '../../../components/summary/personlige-opplysninger-summary';
import { VedtakSummary } from '../../../components/summary/vedtak-summary';
import { Clipboard } from '../../../icons/ClipboardIcon';
import { useLanguage } from '../../../language/use-language';
import { useTranslation } from '../../../language/use-translation';
import { ExternalLink } from '../../../link/link';
import { PageIdentifier } from '../../../logging/amplitude';
import { useLogPageView } from '../../../logging/use-log-page-view';
import { useFinalizeAnkeMutation } from '../../../redux-api/case/anke/api';
import { Anke } from '../../../redux-api/case/anke/types';
import { CaseStatus } from '../../../redux-api/case/types';
import { API_PATH } from '../../../redux-api/common';
import { useGetUserQuery } from '../../../redux-api/user/api';
import { AnkeLoader } from '../../../store/anke/anke-loader';
import { KlageAlertStripe } from '../../../styled-components/alert';
import { ColoredLine } from '../../../styled-components/colored-line';
import { CenteredContainer, WrapBodyLong } from '../../../styled-components/common';
import { CenteredHeading } from '../../../styled-components/page-title';
import { CustomMarginRow } from '../../../styled-components/row';
import { UserLoader } from '../../../user/user-loader';
import { AnkeFormContainer } from '../form-container';

export const AnkeoppsummeringPage = () => (
  <UserLoader>
    <AnkeLoader Component={RenderAnkeoppsummeringPage} />
  </UserLoader>
);

interface Props {
  anke: Anke;
}

const RenderAnkeoppsummeringPage = ({ anke }: Props) => {
  const navigate = useNavigate();
  const language = useLanguage();
  const { ankeskjema } = useTranslation();
  const [loading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [finalize] = useFinalizeAnkeMutation();
  const { data: user } = useGetUserQuery();

  useLogPageView(PageIdentifier.ANKESKJEMA_OPPSUMMERING);

  const submitForm = async (event: React.MouseEvent) => {
    event.preventDefault();

    if (anke.status === CaseStatus.DONE) {
      navigate(`/${language}/anke/${anke.ankeInternalSaksnummer}/kvittering`);
      return;
    }

    setIsLoading(true);

    try {
      await finalize(anke.ankeInternalSaksnummer).unwrap();

      navigate(`/${language}/anke/${anke.ankeInternalSaksnummer}/kvittering`);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(ankeskjema.summary.submit_error);
      }

      setIsLoading(false);
    }
  };

  if (typeof user === 'undefined') {
    return null;
  }

  return (
    <AnkeFormContainer activeStep={2} isValid={anke.fritekst.length !== 0}>
      <Icon />
      <CenteredHeading level="2" size="medium">
        {ankeskjema.summary.title}
      </CenteredHeading>
      <StyledPanel>
        <Heading level="1" size="small" spacing>
          {ankeskjema.summary.sections.person.title}
        </Heading>

        <BodyLong spacing>{ankeskjema.summary.sections.person.info_from}</BodyLong>
        <PersonligeOpplysningerSummary user={user} translations={ankeskjema} />
        <CustomMarginRow margin={8}>
          <ExternalLink href={ankeskjema.summary.sections.person.change_name_address.url}>
            {ankeskjema.summary.sections.person.change_name_address.text}
          </ExternalLink>
        </CustomMarginRow>
        <CustomMarginRow margin={0}>
          <ExternalLink href={ankeskjema.summary.sections.person.change_phone.url}>
            {ankeskjema.summary.sections.person.change_phone.text}
          </ExternalLink>
        </CustomMarginRow>

        <ColoredLine color="#a2a1a1" />

        <Heading level="1" size="small" spacing>
          {ankeskjema.summary.sections.case.title}
        </Heading>

        <VedtakSummary
          internalSaksnummer={anke.ankeInternalSaksnummer}
          translations={ankeskjema}
          vedtakDate={anke.vedtakDate}
        />

        <ColoredLine color="#a2a1a1" />

        <SummarySection>
          <Heading level="1" size="small" spacing>
            {ankeskjema.summary.sections.begrunnelse.title}
          </Heading>
          <InformationPointBox header={ankeskjema.summary.sections.begrunnelse.why}>
            <WrapBodyLong>{anke.fritekst}</WrapBodyLong>
          </InformationPointBox>
        </SummarySection>

        <SummarySection>
          <Heading level="2" size="small">
            {ankeskjema.summary.sections.begrunnelse.documents} ({anke.vedlegg.length})
          </Heading>
          <AttachmentSummary
            id={anke.ankeInternalSaksnummer}
            status={anke.status}
            attachments={anke.vedlegg}
            basePath={`${API_PATH}/anker`}
          />
        </SummarySection>
      </StyledPanel>

      {getError(error)}

      <CenteredContainer>
        <RowKnapp
          variant="secondary"
          onClick={() => navigate(`/${language}/anke/${anke.ankeInternalSaksnummer}/begrunnelse`)}
          disabled={anke.status !== CaseStatus.DRAFT}
        >
          {ankeskjema.summary.back}
        </RowKnapp>
        <Button
          variant="primary"
          onClick={submitForm}
          disabled={loading || anke.fritekst.length === 0}
          loading={loading}
        >
          {ankeskjema.summary.next(anke.status)}
        </Button>
      </CenteredContainer>
    </AnkeFormContainer>
  );
};

const getError = (error: string | null) => {
  if (error === null) {
    return null;
  }

  return <KlageAlertStripe variant="error">{error}</KlageAlertStripe>;
};

const StyledPanel = styled(Panel)`
  margin-bottom: 48px;
`;

const SummarySection = styled.section`
  padding: 1rem;
`;

const RowKnapp = styled(Button)`
  && {
    margin-right: 10px;
  }
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
