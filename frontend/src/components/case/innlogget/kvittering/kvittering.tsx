import { DownloadIcon } from '@navikt/aksel-icons';
import { Alert, BodyShort, Heading } from '@navikt/ds-react';
import React from 'react';
import { styled } from 'styled-components';
import { ISODate, isoDateToPretty } from '@app/domain/date/date';
import { Envelope } from '@app/icons/envelope';
import { Language } from '@app/language/language';
import { useTranslation } from '@app/language/use-translation';
import { AppEventEnum } from '@app/logging/error-report/action';
import { addAppEvent } from '@app/logging/error-report/error-report';
import { CenteredContainer } from '@app/styled-components/common';
import { CenteredHeading } from '@app/styled-components/page-title';
import { ExternalLink } from '../../../link/link';

interface Props {
  translations: Language['klageskjema' | 'ankeskjema'];
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
}

export const Journalpost = ({ caseId, finalizedDate, translations, basePath }: JournalpostProps) => (
  <>
    <BodyShort>
      <ExternalLink href={`${basePath}/${caseId}/pdf`} onClick={() => addAppEvent(AppEventEnum.DOWNLOAD)}>
        <DownloadIcon aria-hidden />
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
