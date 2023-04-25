import { Heading, LinkPanel } from '@navikt/ds-react';
import React, { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useBreadcrumbs } from '@app/breadcrumbs/use-breadcrumbs';
import { DraftKlageAndAnkeLists } from '@app/components/personalised-content/personalised-content';
import { TitleLoader } from '@app/components/text-loader/title-loader';
import { usePageInit } from '@app/hooks/use-page-init';
import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { ITemaWithKategorier } from '@app/kategorier/kategorier';
import { useLanguage } from '@app/language/use-language';
import { useTranslation } from '@app/language/use-translation';
import { PageIdentifier } from '@app/logging/amplitude';
import { useLogPageView } from '@app/logging/use-log-page-view';
import { InngangMainContainer } from '@app/styled-components/main-container';
import { InngangGuidePanel } from './guide-panel';
import { CenteredHeading, InngangPanel, LinkContainer, PanelContainer } from './styled-components/panels';

interface Props {
  tema: ITemaWithKategorier;
}

export const TemaWithKategorier = memo(
  ({ tema }: Props) => {
    useLogPageView(PageIdentifier.INNGANG_KATEGORIER);
    const lang = useLanguage();
    const title = tema.title[lang];
    const { inngang } = useTranslation();
    usePageInit(`${title} \u2013 ${inngang.title_postfix}`);
    useBreadcrumbs([], title);

    const innsendingsytelser: Innsendingsytelse[] = useMemo(
      () => tema.innsendingsytelser.map(({ innsendingsytelse }) => innsendingsytelse),
      [tema]
    );

    return (
      <InngangMainContainer>
        <PanelContainer>
          <CenteredHeading spacing level="1" size="xlarge">
            {title}
          </CenteredHeading>

          <InngangGuidePanel />

          <DraftKlageAndAnkeLists innsendingsytelser={innsendingsytelser} />

          <InngangPanel as="section">
            <Heading spacing level="2" size="large">
              {inngang.kategorier.title}
            </Heading>
            <Kategorilenker {...tema} />
          </InngangPanel>
        </PanelContainer>
      </InngangMainContainer>
    );
  },
  (prevProps, nextProps) => prevProps.tema === nextProps.tema
);

TemaWithKategorier.displayName = 'TemaWithKategorier';

const Kategorilenker = ({ innsendingsytelser: kategorier, path }: ITemaWithKategorier) => {
  const lang = useLanguage();

  return (
    <LinkContainer>
      {kategorier.map((kategori) => (
        <KategoriLink
          key={kategori.innsendingsytelse}
          innsendingsytelse={kategori.innsendingsytelse}
          path={`/${lang}/${path}/${kategori.path}`}
        />
      ))}
    </LinkContainer>
  );
};

interface KategoriLinkProps {
  innsendingsytelse: Innsendingsytelse;
  path: string;
}

export const KategoriLink = ({ innsendingsytelse, path }: KategoriLinkProps) => (
  <LinkPanel as={Link} to={path} border>
    <LinkPanel.Title>
      <TitleLoader innsendingsytelse={innsendingsytelse} />
    </LinkPanel.Title>
  </LinkPanel>
);
