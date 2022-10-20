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
  caseId: string;
  finalizedDate: ISODate | null;
  translations: Language['klageskjema' | 'ankeskjema'];
  basePath: string;
  showFullmaktInfo?: boolean;
}

export const Kvittering = ({ caseId, finalizedDate, translations, basePath }: Props) => {
  const { kvittering } = useTranslation();

  return (
    <>
      <div>
        <Icon />
        <CenteredHeading level="2" size="medium">
          {translations.kvittering.title}
        </CenteredHeading>
      </div>

      <BodyShort>
        <ExternalLink href={`${basePath}/${caseId}/pdf`} onClick={() => addAppEvent(AppEventEnum.DOWNLOAD)}>
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

const Icon = styled(Envelope)`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 16px;
  width: 100px;
`;
