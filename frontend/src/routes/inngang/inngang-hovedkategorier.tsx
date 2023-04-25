import { Heading, LinkPanel } from '@navikt/ds-react';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useBreadcrumbs } from '@app/breadcrumbs/use-breadcrumbs';
import { DraftKlageAndAnkeLists } from '@app/components/personalised-content/personalised-content';
import { TextLoader } from '@app/components/text-loader/text-loader';
import { useInnsendingsytelserNames } from '@app/hooks/use-innsendingsytelser';
import { usePageInit } from '@app/hooks/use-page-init';
import { INNGANG_KATEGORIER, ITema, ITemaWithKategorier } from '@app/kategorier/kategorier';
import { useLanguage } from '@app/language/use-language';
import { useTranslation } from '@app/language/use-translation';
import { PageIdentifier } from '@app/logging/amplitude';
import { useLogPageView } from '@app/logging/use-log-page-view';
import { KategoriLink } from '@app/routes/inngang/inngang-kategorier';
import { InngangMainContainer } from '@app/styled-components/main-container';
import { InngangGuidePanel } from './guide-panel';
import { CenteredHeading, InngangPanel, LinkContainer, PanelContainer } from './styled-components/panels';

export const InngangHovedkategorier = () => {
  useLogPageView(PageIdentifier.INNGANG_HOVEDKATEGORIER);
  const { inngang } = useTranslation();
  const { title } = inngang.hovedkategorier;
  usePageInit(title);
  useBreadcrumbs([], null);

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
          <LinkContainer>{getLinks()}</LinkContainer>
        </InngangPanel>
      </PanelContainer>
    </InngangMainContainer>
  );
};

const getLinks = () => INNGANG_KATEGORIER.map((kategori) => <TemaLink {...kategori} key={kategori.path} />);

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

const InngangKategoriLink = ({ title, path, beskrivelse, externalUrl, kategorier }: ITemaWithKategorier) => {
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

const TemaLink = (tema: ITema) => {
  if ('kategorier' in tema) {
    return <InngangKategoriLink {...tema} />;
  }

  return <KategoriLink innsendingsytelse={tema.innsendingsytelse} path={tema.path} />;
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
