import { Heading, LinkPanel } from '@navikt/ds-react';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useBreadcrumbs } from '../../breadcrumbs/use-breadcrumbs';
import { DraftKlageAndAnkeLists } from '../../components/personalised-content/personalised-content';
import { TitleLoader } from '../../components/text-loader/title-loader';
import { usePageInit } from '../../hooks/use-page-init';
import { InngangKategori } from '../../kategorier/kategorier';
import { useLanguage } from '../../language/use-language';
import { useTranslation } from '../../language/use-translation';
import { PageIdentifier } from '../../logging/amplitude';
import { useLogPageView } from '../../logging/use-log-page-view';
import { InngangMainContainer } from '../../styled-components/main-container';
import { TemaKey } from '../../tema/tema';
import { InngangGuidePanel } from './guide-panel';
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

    const temaAndTitleKeyList: [TemaKey, string][] = useMemo(
      () => inngangkategori.kategorier.map(({ temaKey, titleKey }) => [temaKey, titleKey]),
      [inngangkategori.kategorier]
    );

    return (
      <InngangMainContainer>
        <PanelContainer>
          <CenteredHeading spacing level="1" size="xlarge">
            {title}
          </CenteredHeading>

          <InngangGuidePanel />

          <DraftKlageAndAnkeLists temaAndTitleKeyList={temaAndTitleKeyList} />

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
  <LinkPanel as={Link} to={path} border>
    <LinkPanel.Title>
      <TitleLoader titleKey={titleKey} />
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
      <TitleLoader titleKey={titleKey} />
    </LinkPanel.Title>
  </LinkPanel>
);
