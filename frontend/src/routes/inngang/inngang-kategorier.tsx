import { Heading, LinkPanel } from '@navikt/ds-react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useBreadcrumbs } from '../../breadcrumbs/use-breadcrumbs';
import { InngangKategori } from '../../kategorier/kategorier';
import { useLanguage } from '../../language/use-language';
import { useTranslation } from '../../language/use-translation';
import { PageIdentifier } from '../../logging/amplitude';
import { useLogPageView } from '../../logging/use-log-page-view';
import { usePageInit } from '../../page-init/page-init';
import { InngangMainContainer } from '../../styled-components/main-container';
import { Title } from '../../title/title';
import { CenteredHeading, InngangPanel, LinkContainer, PanelContainer } from './styled-components/panels';

interface Props {
  inngangkategori: InngangKategori;
}

export const InngangKategorier = React.memo(
  ({ inngangkategori }: Props) => {
    useLogPageView(PageIdentifier.INNGANG_KATEGORIER);
    const lang = useLanguage();
    const title = inngangkategori.title[lang];
    const { inngang } = useTranslation();
    usePageInit(`${title} \u2013 ${inngang.title_postfix}`);
    useBreadcrumbs([], title);

    return (
      <InngangMainContainer>
        <PanelContainer>
          <CenteredHeading spacing level="1" size="xlarge">
            {title}
          </CenteredHeading>
          <InngangPanel as="section">
            <Heading spacing level="2" size="large">
              {inngang.kategorier.title}
            </Heading>
            <KategoriLenker {...inngangkategori} />
          </InngangPanel>
        </PanelContainer>
      </InngangMainContainer>
    );
  },
  (prevProps, nextProps) => prevProps.inngangkategori === nextProps.inngangkategori
);

InngangKategorier.displayName = 'InngangKategorier';

const KategoriLenker = ({ kategorier, path }: InngangKategori) => {
  const lang = useLanguage();
  return (
    <LinkContainer>
      {kategorier.map((kategori) => {
        const externalUrl = kategori.externalUrl ? kategori.externalUrl[lang] : null;

        if (typeof externalUrl === 'string') {
          return <ExternalKategoriLink key={externalUrl} titleKey={kategori.titleKey} externalUrl={externalUrl} />;
        }

        return (
          <KategoriLink
            key={kategori.titleKey}
            titleKey={kategori.titleKey}
            path={`/${lang}/${path}/${kategori.path}`}
          />
        );
      })}
    </LinkContainer>
  );
};

interface KategoriLinkProps {
  titleKey: string;
  path: string;
}

const KategoriLink = ({ titleKey, path }: KategoriLinkProps) => (
  <LinkPanel as={NavLink} to={path} border>
    <LinkPanel.Title>
      <Title titleKey={titleKey} />
    </LinkPanel.Title>
  </LinkPanel>
);

interface ExternalKategoriProps {
  titleKey: string;
  externalUrl: string;
}

const ExternalKategoriLink = ({ titleKey, externalUrl }: ExternalKategoriProps) => (
  <LinkPanel href={externalUrl} border>
    <LinkPanel.Title>
      <Title titleKey={titleKey} />
    </LinkPanel.Title>
  </LinkPanel>
);
