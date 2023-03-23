import { Heading, LinkPanel } from '@navikt/ds-react';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useBreadcrumbs } from '@app/breadcrumbs/use-breadcrumbs';
import { DraftKlageAndAnkeLists } from '@app/components/personalised-content/personalised-content';
import { TextLoader } from '@app/components/text-loader/text-loader';
import { useInnsendingsytelserNames } from '@app/hooks/use-innsendingsytelser';
import { usePageInit } from '@app/hooks/use-page-init';
import { INNGANG_KATEGORIER, InngangKategori } from '@app/kategorier/kategorier';
import { Languages } from '@app/language/types';
import { useLanguage } from '@app/language/use-language';
import { useTranslation } from '@app/language/use-translation';
import { PageIdentifier } from '@app/logging/amplitude';
import { useLogPageView } from '@app/logging/use-log-page-view';
import { InngangMainContainer } from '@app/styled-components/main-container';
import { InngangGuidePanel } from './guide-panel';
import { CenteredHeading, InngangPanel, LinkContainer, PanelContainer } from './styled-components/panels';

export const InngangHovedkategorier = () => {
  useLogPageView(PageIdentifier.INNGANG_HOVEDKATEGORIER);
  const { inngang } = useTranslation();
  const { title } = inngang.hovedkategorier;
  usePageInit(title);
  useBreadcrumbs([], null);
  const language = useLanguage();

  return (
    <InngangMainContainer>
      <PanelContainer>
        <CenteredHeading spacing level="1" size="xlarge">
          {title}
        </CenteredHeading>

        <InngangGuidePanel />

        <DraftKlageAndAnkeLists />

        <InngangPanel as="section">
          <Heading spacing level="2" size="large">
            {inngang.hovedkategorier.chooseInnsendingsytelse}
          </Heading>
          <LinkContainer>{getLinks(language)}</LinkContainer>
        </InngangPanel>
      </PanelContainer>
    </InngangMainContainer>
  );
};

const getLinks = (lang: Languages) =>
  INNGANG_KATEGORIER.map((kategori) => (
    <KategoriLink
      {...kategori}
      key={typeof kategori.externalUrl?.[lang] === 'string' ? kategori.externalUrl[lang] : kategori.title[lang]}
    />
  ));

interface ExternalKategoriProps {
  title: string;
  beskrivelse: string;
  externalUrl: string;
}

const ExternalHovedkategoriLink = ({ title, beskrivelse, externalUrl }: ExternalKategoriProps) => (
  <LinkPanel href={externalUrl} border>
    <LinkPanel.Title>{title}</LinkPanel.Title>
    <LinkPanel.Description>{beskrivelse}</LinkPanel.Description>
  </LinkPanel>
);

const KategoriLink = ({ title, path, beskrivelse, externalUrl, kategorier }: InngangKategori) => {
  const lang = useLanguage();
  const [titles, isLoading] = useInnsendingsytelserNames(kategorier.map(({ innsendingsytelse }) => innsendingsytelse));

  if (externalUrl && typeof externalUrl[lang] === 'string') {
    return (
      <ExternalHovedkategoriLink title={title[lang]} beskrivelse={beskrivelse[lang]} externalUrl={externalUrl[lang]} />
    );
  }

  return (
    <StyledWrapper>
      <LinkPanel as={Link} to={`/${lang}/${path}`} border title={titles.join('\n')}>
        <LinkPanel.Title>{title[lang]}</LinkPanel.Title>
        <EllipsisDescription>
          <TextLoader isLoading={isLoading}>{titles.join(' - ')}</TextLoader>
        </EllipsisDescription>
      </LinkPanel>
    </StyledWrapper>
  );
};

const EllipsisDescription = styled(LinkPanel.Description)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledWrapper = styled.div`
  & {
    .navds-link-panel__content {
      max-width: calc(100% - 24px - 16px);
    }
  }
`;
