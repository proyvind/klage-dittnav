import { FileContent } from '@navikt/ds-icons';
import { Alert, BodyShort, Heading } from '@navikt/ds-react';
import React from 'react';
import styled from 'styled-components';
import { ISODate, isoDateToPretty } from '../../date/date';
import { Envelope } from '../../icons/EnvelopeIcon';
import { Language } from '../../language/language';
import { ExternalLink } from '../../link/link';
import { FullmaktInfo } from '../../routes/klageskjema/begrunnelse/fullmakt-info';
import { CenteredContainer } from '../../styled-components/common';
import { CenteredHeading } from '../../styled-components/page-title';

interface Props {
  caseId: string;
  finalizedDate: ISODate | null;
  translations: Language['klageskjema' | 'ankeskjema'];
  basePath: string;
  showFullmaktInfo?: boolean;
}

export const Kvittering = ({ caseId, finalizedDate, translations, basePath, showFullmaktInfo }: Props) => (
  <>
    <div>
      <Icon />
      <CenteredHeading level="2" size="medium">
        {translations.kvittering.title}
      </CenteredHeading>
    </div>

    <ShowFullmaktInfo klageId={caseId} show={showFullmaktInfo} />

    <BodyShort>
      <ExternalLink href={`${basePath}/${caseId}/pdf`} openInNewWindow>
        <FileContent />
        <span>{translations.kvittering.download}</span>
      </ExternalLink>
    </BodyShort>
    <BodyShort>
      {translations.kvittering.sent}: {isoDateToPretty(finalizedDate)}
    </BodyShort>

    <Alert variant="success">
      <Heading spacing size="small" level="3">
        {translations.kvittering.general_info.title}
      </Heading>
      <BodyShort>{translations.kvittering.general_info.description}</BodyShort>
    </Alert>

    <BodyShort>
      {translations.kvittering.read_more} {translations.kvittering.see_estimate}
    </BodyShort>
    <CenteredContainer>
      <ExternalLink href="https://tjenester.nav.no/saksoversikt/tema/FOR" className="knapp">
        {translations.kvittering.dine_saker}
      </ExternalLink>
    </CenteredContainer>
  </>
);

interface ShowFullmaktInfoProps {
  show?: boolean;
  klageId: string;
}

const ShowFullmaktInfo = ({ klageId, show = false }: ShowFullmaktInfoProps) => {
  if (!show) {
    return null;
  }

  return <FullmaktInfo klageId={klageId} />;
};

const Icon = styled(Envelope)`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 16px;
  width: 100px;
`;
