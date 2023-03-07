import { FileContent } from '@navikt/ds-icons';
import { Alert, BodyShort, Heading } from '@navikt/ds-react';
import React from 'react';
import styled from 'styled-components';
import { ISODate, isoDateToPretty } from '../../../../domain/date/date';
import { Envelope } from '../../../../icons/envelope';
import { Language } from '../../../../language/language';
import { useTranslation } from '../../../../language/use-translation';
import { AppEventEnum } from '../../../../logging/error-report/action';
import { addAppEvent } from '../../../../logging/error-report/error-report';
import { CenteredContainer } from '../../../../styled-components/common';
import { CenteredHeading } from '../../../../styled-components/page-title';
import { ExternalLink } from '../../../link/link';

interface Props {
  translations: Language['klageskjema' | 'ankeskjema'];
  showFullmaktInfo?: boolean;
  children?: React.ReactNode;
}

export const Kvittering = ({ translations, children }: Props) => {
  const { kvittering } = useTranslation();

  return (
    <>
      <div>
        <Icon />
        <CenteredHeading level="2" size="medium">
          {translations.kvittering.title}
        </CenteredHeading>
      </div>

      {children}

      <Alert variant="success">
        <Heading spacing size="small" level="3">
          {translations.kvittering.general_info.title}
        </Heading>
        <BodyShort>{translations.kvittering.general_info.description}</BodyShort>
      </Alert>

      <BodyShort>
        {translations.kvittering.read_more} {kvittering.see_estimate}
      </BodyShort>
      <CenteredContainer>
        <ExternalLink href={translations.kvittering.dine_saker.url} openInSameWindow>
          {translations.kvittering.dine_saker.title}
        </ExternalLink>
      </CenteredContainer>
    </>
  );
};

interface JournalpostProps {
  caseId: string;
  finalizedDate: ISODate | null;
  translations: Language['klageskjema' | 'ankeskjema'];
  basePath: string;
  showFullmaktInfo?: boolean;
}

export const Journalpost = ({ caseId, finalizedDate, translations, basePath }: JournalpostProps) => (
  <>
    <BodyShort>
      <ExternalLink href={`${basePath}/${caseId}/pdf`} onClick={() => addAppEvent(AppEventEnum.DOWNLOAD)}>
        <FileContent />
        <span>{translations.kvittering.download}</span>
      </ExternalLink>
    </BodyShort>
    <BodyShort>
      {translations.kvittering.sent}: {isoDateToPretty(finalizedDate)}
    </BodyShort>
  </>
);

const Icon = styled(Envelope)`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 16px;
  width: 100px;
`;
