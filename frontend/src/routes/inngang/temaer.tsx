import { Heading, LinkPanel } from '@navikt/ds-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { useBreadcrumbs } from '@app/breadcrumbs/use-breadcrumbs';
import { DraftKlageAndAnkeLists } from '@app/components/personalised-content/personalised-content';
import { TextLoader } from '@app/components/text-loader/text-loader';
import { useInnsendingsytelserNames } from '@app/hooks/use-innsendingsytelser';
import { usePageInit } from '@app/hooks/use-page-init';
import { IExternalTema, INNGANG_KATEGORIER, ITemaWithKategorier, TemaType } from '@app/kategorier/kategorier';
import { useLanguage } from '@app/language/use-language';
import { useTranslation } from '@app/language/use-translation';
import { PageIdentifier } from '@app/logging/amplitude';
import { useLogPageView } from '@app/logging/use-log-page-view';
import { KategoriLink } from '@app/routes/inngang/tema-with-kategorier';
import { InngangMainContainer } from '@app/styled-components/main-container';
import { InngangGuidePanel } from './guide-panel';
import { CenteredHeading, InngangPanel, LinkContainer, PanelContainer } from './styled-components/panels';

export const Temaer = () => {
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

const getLinks = () =>
  INNGANG_KATEGORIER.map((tema) => {
    if (tema.type === TemaType.TEMA) {
      return <InngangKategoriLink {...tema} key={tema.path} />;
    }

    if (tema.type === TemaType.EXTERNAL) {
      return <ExternalHovedkategoriLink {...tema} key={tema.externalUrl.nb} />;
    }

    return <KategoriLink innsendingsytelse={tema.innsendingsytelse} path={tema.path} key={tema.path} />;
  });

const ExternalHovedkategoriLink = ({ title, externalUrl }: IExternalTema) => {
  const lang = useLanguage();

  return (
    <LinkPanel href={externalUrl[lang]} border>
      <LinkPanel.Title>{title[lang]}</LinkPanel.Title>
    </LinkPanel>
  );
};

const InngangKategoriLink = ({ title, path, innsendingsytelser: kategorier }: ITemaWithKategorier) => {
  const lang = useLanguage();
  const [titles, isLoading] = useInnsendingsytelserNames(kategorier.map(({ innsendingsytelse }) => innsendingsytelse));

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
