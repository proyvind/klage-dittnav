import { Alert, Heading, LinkPanel } from '@navikt/ds-react';
import React, { memo, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumb, useBreadcrumbs } from '../../breadcrumbs/use-breadcrumbs';
import { IconLinkPanel } from '../../components/icon-link-panel/icon-link-panel';
import { Optional } from '../../components/optional/optional';
import { queryStringify } from '../../functions/query-string';
import { useInnsendingsytelseName } from '../../hooks/use-innsendingsytelser';
import { usePageInit } from '../../hooks/use-page-init';
import { useIsAuthenticated } from '../../hooks/use-user';
import { Document } from '../../icons/document';
import { Innsendingsytelse } from '../../innsendingsytelser/innsendingsytelser';
import { InngangKategori } from '../../kategorier/kategorier';
import { Languages } from '../../language/types';
import { useLanguage } from '../../language/use-language';
import { useTranslation } from '../../language/use-translation';
import { PageIdentifier } from '../../logging/amplitude';
import { useLogPageView } from '../../logging/use-log-page-view';
import { InngangMainContainer } from '../../styled-components/main-container';
import { InngangGuidePanel } from './guide-panel';
import { AnkeLinkPanel } from './klage-anke-knapper/anke-link-panel';
import { KlageLinkPanel } from './klage-anke-knapper/klage-link-panel';
import { CenteredHeading, InngangPanel, PanelContainer } from './styled-components/panels';

interface Props {
  innsendingsytelse: Innsendingsytelse;
  internalSaksnummer?: string | null;
  inngangkategori?: InngangKategori | null;
  allowsAnke?: boolean;
  supportsDigitalKlage?: boolean;
  supportsDigitalAnke?: boolean;
}

export const InngangInnsending = memo(
  ({
    innsendingsytelse,
    internalSaksnummer = null,
    inngangkategori = null,
    allowsAnke = false,
    supportsDigitalKlage = false,
    supportsDigitalAnke = false,
  }: Props) => {
    useLogPageView(PageIdentifier.INNGANG_INNSENDING_DIGITAL, innsendingsytelse);
    const [title] = useInnsendingsytelseName(innsendingsytelse);
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
              innsendingsytelse={innsendingsytelse}
              saksnummerValue={internalSaksnummer}
              supportsDigitalKlage={supportsDigitalKlage}
            />
            <Optional show={allowsAnke === true}>
              <AnkeLinkPanel
                innsendingsytelse={innsendingsytelse}
                saksnummer={internalSaksnummer}
                digital={supportsDigitalAnke}
              />
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
  (prevProps, nextProps) =>
    prevProps.innsendingsytelse === nextProps.innsendingsytelse &&
    prevProps.internalSaksnummer === nextProps.internalSaksnummer
);

InngangInnsending.displayName = 'InngangInnsending';

interface LinksProps {
  innsendingsytelse: Innsendingsytelse;
  saksnummerValue: string | null;
  supportsDigitalKlage: boolean;
}

const Links = ({ innsendingsytelse, saksnummerValue, supportsDigitalKlage }: LinksProps) => {
  const { saksnummer } = useParams();
  const { inngang } = useTranslation();
  const { data: isAuthenticated } = useIsAuthenticated();

  const query = useMemo(
    () => queryStringify({ saksnummer: saksnummerValue ?? getQueryValue(saksnummer) }),
    [saksnummerValue, saksnummer]
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

      <KlageLinkPanel innsendingsytelse={innsendingsytelse} query={query} supportsDigitalKlage={supportsDigitalKlage} />
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
