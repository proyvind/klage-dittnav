import { Alert, Heading, LinkPanel } from '@navikt/ds-react';
import React, { memo, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumb, useBreadcrumbs } from '@app/breadcrumbs/use-breadcrumbs';
import { IconLinkPanel } from '@app/components/icon-link-panel/icon-link-panel';
import { Optional } from '@app/components/optional/optional';
import { queryStringify } from '@app/functions/query-string';
import { useInnsendingsytelseName } from '@app/hooks/use-innsendingsytelser';
import { usePageInit } from '@app/hooks/use-page-init';
import { useIsAuthenticated } from '@app/hooks/use-user';
import { Document } from '@app/icons/document';
import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { IInnsendingsytelse, ITemaWithKategorier } from '@app/kategorier/kategorier';
import { Languages } from '@app/language/types';
import { useLanguage } from '@app/language/use-language';
import { useTranslation } from '@app/language/use-translation';
import { PageIdentifier } from '@app/logging/amplitude';
import { useLogPageView } from '@app/logging/use-log-page-view';
import { InngangMainContainer } from '@app/styled-components/main-container';
import { InngangGuidePanel } from './guide-panel';
import { AnkeLinkPanel } from './klage-anke-knapper/anke-link-panel';
import { KlageLinkPanel } from './klage-anke-knapper/klage-link-panel';
import { CenteredHeading, InngangPanel, PanelContainer } from './styled-components/panels';

interface Props extends IInnsendingsytelse {
  tema?: ITemaWithKategorier | null;
}

export const Kategori = memo(
  ({ innsendingsytelse, tema = null, allowsAnke = false }: Props) => {
    useLogPageView(PageIdentifier.INNGANG_INNSENDING_DIGITAL, innsendingsytelse);
    const [title] = useInnsendingsytelseName(innsendingsytelse);
    const lang = useLanguage();
    const { inngang } = useTranslation();
    usePageInit(`${title} \u2013 ${inngang.title_postfix}`);
    const breadcrumbs = useMemo(() => getBreadcrumbs(tema, lang), [tema, lang]);
    useBreadcrumbs(breadcrumbs, title);

    return (
      <InngangMainContainer>
        <PanelContainer>
          <CenteredHeading level="1" size="xlarge" spacing>
            {title}
          </CenteredHeading>

          <InngangGuidePanel />

          <InngangPanel as="section">
            <Links innsendingsytelse={innsendingsytelse} />
            <Optional show={allowsAnke === true}>
              <AnkeLinkPanel innsendingsytelse={innsendingsytelse} />
            </Optional>

            <IconLinkPanel as={Link} to={`/${lang}/ettersendelse/${innsendingsytelse}`} border icon={<Document />}>
              <LinkPanel.Title>{inngang.innsendingsvalg.ettersendelse.title}</LinkPanel.Title>
              <LinkPanel.Description>{inngang.innsendingsvalg.ettersendelse.description}</LinkPanel.Description>
            </IconLinkPanel>
          </InngangPanel>
        </PanelContainer>
      </InngangMainContainer>
    );
  },
  (prevProps, nextProps) => prevProps.innsendingsytelse === nextProps.innsendingsytelse
);

Kategori.displayName = 'InngangInnsending';

interface LinksProps {
  innsendingsytelse: Innsendingsytelse;
}

const Links = ({ innsendingsytelse }: LinksProps) => {
  const { saksnummer } = useParams();
  const { inngang } = useTranslation();
  const { data: isAuthenticated } = useIsAuthenticated();

  const query = useMemo(() => queryStringify({ saksnummer }), [saksnummer]);

  return (
    <>
      <Heading level="1" size="large">
        {inngang.innsendingsvalg.title}
      </Heading>

      <Optional show={isAuthenticated === false}>
        <Alert variant="info" size="small">
          {inngang.innsendingsvalg.common.warning}
        </Alert>
      </Optional>

      <KlageLinkPanel innsendingsytelse={innsendingsytelse} query={query} />
    </>
  );
};

const getBreadcrumbs = (inngangkategori: ITemaWithKategorier | null, lang: Languages): Breadcrumb[] => {
  if (inngangkategori === null) {
    return [];
  }

  return [
    {
      title: inngangkategori.title[lang],
      url: `/${lang}/${inngangkategori.path}`,
      handleInApp: true,
    },
  ];
};
