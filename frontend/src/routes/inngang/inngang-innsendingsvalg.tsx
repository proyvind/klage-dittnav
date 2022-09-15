import { Alert, Heading, LinkPanel } from '@navikt/ds-react';
import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumb, useBreadcrumbs } from '../../breadcrumbs/use-breadcrumbs';
import { ExternalLink } from '../../components/link/link';
import { Optional } from '../../components/optional/optional';
import { queryStringify } from '../../functions/query-string';
import { usePageInit } from '../../hooks/use-page-init';
import { useTitleOrTemaName } from '../../hooks/use-titles';
import { useIsAuthenticated } from '../../hooks/use-user';
import { InngangKategori } from '../../kategorier/kategorier';
import { Languages } from '../../language/types';
import { useLanguage } from '../../language/use-language';
import { useTranslation } from '../../language/use-translation';
import { PageIdentifier } from '../../logging/amplitude';
import { useLogPageView } from '../../logging/use-log-page-view';
import { InngangMainContainer } from '../../styled-components/main-container';
import { TemaKey } from '../../tema/tema';
import { InngangGuidePanel } from './guide-panel';
import { AnkeLinkPanel } from './klage-anke-knapper/anke-link-panel';
import { KlageDigitaltFullmaktKnapp } from './klage-anke-knapper/klage-digitalt-fullmakt-knapp';
import { KlageLinkPanel } from './klage-anke-knapper/klage-link-panel';
import { CenteredHeading, InngangPanel, PanelContainer } from './styled-components/panels';

interface Props {
  temaKey: TemaKey;
  titleKey: string | null;
  internalSaksnummer?: string | null;
  inngangkategori?: InngangKategori | null;
  digitalKlageFullmakt?: boolean;
  allowsAnke?: boolean;
  supportsDigitalKlage?: boolean;
  supportsDigitalAnke?: boolean;
}

export const InngangInnsending = React.memo(
  ({
    temaKey,
    titleKey,
    internalSaksnummer = null,
    inngangkategori = null,
    digitalKlageFullmakt = false,
    allowsAnke = false,
    supportsDigitalKlage = false,
    supportsDigitalAnke = false,
  }: Props) => {
    useLogPageView(PageIdentifier.INNGANG_INNSENDING_DIGITAL, temaKey, titleKey ?? temaKey);
    const [title] = useTitleOrTemaName(temaKey, titleKey);
    const lang = useLanguage();
    const { inngang } = useTranslation();
    usePageInit(`${title} \u2013 ${inngang.title_postfix}`);
    const breadcrumbs = useMemo(() => getBreadcrumbs(inngangkategori, lang), [inngangkategori, lang]);
    useBreadcrumbs(breadcrumbs, title);

    return (
      <InngangMainContainer>
        <PanelContainer>
          <CenteredHeading level="1" size="xlarge" spacing>
            {title}
          </CenteredHeading>

          <InngangGuidePanel />

          <InngangPanel as="section">
            <Links
              temaKey={temaKey}
              titleKey={titleKey}
              saksnummerValue={internalSaksnummer}
              digitalKlageFullmakt={digitalKlageFullmakt}
              supportsDigitalKlage={supportsDigitalKlage}
            />
            <Optional show={allowsAnke === true}>
              <AnkeLinkPanel
                temaKey={temaKey}
                titleKey={titleKey}
                saksnummer={internalSaksnummer}
                digital={supportsDigitalAnke}
              />
            </Optional>

            <LinkPanel as={Link} to={`/${lang}/ettersendelse/${temaKey}`} border>
              <LinkPanel.Title>Ettersendelse</LinkPanel.Title>
              <LinkPanel.Description>Ettersendelse av dokumentasjon for klager og anker.</LinkPanel.Description>
            </LinkPanel>
          </InngangPanel>
        </PanelContainer>
      </InngangMainContainer>
    );
  },
  (prevProps, nextProps) =>
    prevProps.temaKey === nextProps.temaKey &&
    prevProps.internalSaksnummer === nextProps.internalSaksnummer &&
    prevProps.titleKey === nextProps.titleKey
);

InngangInnsending.displayName = 'InngangInnsending';

interface LinksProps {
  temaKey: TemaKey;
  titleKey: string | null;
  saksnummerValue: string | null;
  digitalKlageFullmakt: boolean;
  supportsDigitalKlage: boolean;
}

const Links = ({ temaKey, titleKey, saksnummerValue, digitalKlageFullmakt, supportsDigitalKlage }: LinksProps) => {
  const { saksnummer } = useParams();
  const { fullmakt, inngang } = useTranslation();
  const { data: isAuthenticated } = useIsAuthenticated();

  const query = useMemo(
    () =>
      queryStringify({
        tema: temaKey,
        tittel: titleKey,
        saksnummer: saksnummerValue ?? getQueryValue(saksnummer),
      }),
    [temaKey, titleKey, saksnummerValue, saksnummer]
  );

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

      <KlageLinkPanel query={query} supportsDigitalKlage={supportsDigitalKlage} />

      <Optional show={digitalKlageFullmakt}>
        <KlageDigitaltFullmaktKnapp />
        <ExternalLink href={fullmakt.help.url} openInSameWindow>
          {fullmakt.help.text}
        </ExternalLink>
      </Optional>
    </>
  );
};

const getBreadcrumbs = (inngangkategori: InngangKategori | null, lang: Languages): Breadcrumb[] => {
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

const getQueryValue = (queryValue: string | string[] | null | undefined) => {
  if (typeof queryValue === 'string' && queryValue.length !== 0) {
    return queryValue;
  }

  return null;
};
