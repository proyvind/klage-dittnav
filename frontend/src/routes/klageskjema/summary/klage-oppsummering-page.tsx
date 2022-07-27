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
import { useFinalizeKlageMutation } from '../../../redux-api/case/klage/api';
import { Klage } from '../../../redux-api/case/klage/types';
import { CaseStatus } from '../../../redux-api/case/types';
import { API_PATH } from '../../../redux-api/common';
import { useGetUserQuery } from '../../../redux-api/user/api';
import { KlageLoader } from '../../../store/klage/klage-loader';
import { KlageAlertStripe } from '../../../styled-components/alert';
import { CenteredContainer } from '../../../styled-components/common';
import { CenteredHeading } from '../../../styled-components/page-title';
import { UserLoader } from '../../../user/user-loader';
import { FullmaktInfo } from '../begrunnelse/fullmakt-info';
import { KlageFormContainer } from '../form-container';
import { Reasons } from './reasons';

export const KlageoppsummeringPage = () => (
  <UserLoader>
    <KlageLoader Component={RenderKlageoppsummeringPage} />
  </UserLoader>
);

interface Props {
  klage: Klage;
}

const RenderKlageoppsummeringPage = ({ klage }: Props) => {
  const navigate = useNavigate();
  const language = useLanguage();
  const { klageskjema } = useTranslation();
  const [loading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { data: user, isLoading: userIsLoading } = useGetUserQuery();
  const [finalizeKlage] = useFinalizeKlageMutation();

  useLogPageView(PageIdentifier.KLAGESKJEMA_OPPSUMMERING);

  const submitForm = async (event: React.MouseEvent) => {
    event.preventDefault();

    if (klage.status === CaseStatus.DONE) {
      navigate(`/${language}/klage/${klage.id}/kvittering`);
      return;
    }

    setIsLoading(true);

    try {
      await finalizeKlage(klage.id).unwrap();
      navigate(`/${language}/klage/${klage.id}/kvittering`);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError(klageskjema.summary.submit_error);
      }

      setIsLoading(false);
    }
  };

  if (userIsLoading || typeof user === 'undefined') {
    return null;
  }

  return (
    <KlageFormContainer activeStep={2} isValid={klage.fritekst.length !== 0}>
      <div>
        <Icon />
        <CenteredHeading level="2" size="medium">
          {klageskjema.summary.title}
        </CenteredHeading>
      </div>
      <FullmaktInfo klageId={klage.id} />
      <StyledPanel border>
        <Section>
          <Heading level="1" size="small" spacing>
            {klageskjema.summary.sections.person.title}
          </Heading>
          <BodyLong spacing>{klageskjema.summary.sections.person.info_from}</BodyLong>
          <PersonligeOpplysningerSummary user={user} translations={klageskjema} />
          <LinkList>
            <ExternalLink href={klageskjema.summary.sections.person.change_name_address.url}>
              {klageskjema.summary.sections.person.change_name_address.text}
            </ExternalLink>
            <ExternalLink href={klageskjema.summary.sections.person.change_phone.url}>
              {klageskjema.summary.sections.person.change_phone.text}
            </ExternalLink>
          </LinkList>
        </Section>

        <Section>
          <Heading level="1" size="small" spacing>
            {klageskjema.summary.sections.case.title}
          </Heading>
          <VedtakSummary translations={klageskjema} {...klage} />
        </Section>

        <Section>
          <Heading level="1" size="small" spacing>
            {klageskjema.summary.sections.begrunnelse.title}
          </Heading>
          <VerticalContent>
            <InformationPointBox header={klageskjema.summary.sections.begrunnelse.what}>
              <Reasons checkboxesSelected={klage.checkboxesSelected} />
            </InformationPointBox>
            <InformationPointBox header={klageskjema.summary.sections.begrunnelse.why}>
              <StyledBodyLong>{klage.fritekst}</StyledBodyLong>
            </InformationPointBox>
          </VerticalContent>
        </Section>

        <Section>
          <Heading level="1" size="small" spacing>
            {klageskjema.summary.sections.begrunnelse.documents} ({klage.vedlegg.length})
          </Heading>
          <AttachmentSummary
            id={klage.id}
            status={klage.status}
            attachments={klage.vedlegg}
            basePath={`${API_PATH}/klager`}
          />
        </Section>
      </StyledPanel>

      {getError(error)}

      <CenteredContainer>
        <Button
          variant="secondary"
          onClick={() => navigate(`/${language}/klage/${klage.id}/begrunnelse`)}
          disabled={klage.status !== CaseStatus.DRAFT}
        >
          {klageskjema.summary.back}
        </Button>
        <Button
          variant="primary"
          onClick={submitForm}
          disabled={loading || klage.fritekst.length === 0}
          loading={loading}
        >
          {klageskjema.summary.next(klage.status)}
        </Button>
      </CenteredContainer>
    </KlageFormContainer>
  );
};

const getError = (error: string | null) => {
  if (error === null) {
    return null;
  }

  return <KlageAlertStripe variant="error">{error}</KlageAlertStripe>;
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

const LinkList = styled(VerticalContent)`
  margin-top: 16px;
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
