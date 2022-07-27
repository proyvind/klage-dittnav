import { Link } from '@navikt/ds-react';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumb, useBreadcrumbs } from '../../breadcrumbs/use-breadcrumbs';
import { queryStringify } from '../../functions/query-string';
import { useTitleOrYtelse } from '../../hooks/use-titles';
import { InngangKategori, StringValue } from '../../kategorier/kategorier';
import { Languages } from '../../language/types';
import { useLanguage } from '../../language/use-language';
import { useTranslation } from '../../language/use-translation';
import { ExternalLink } from '../../link/link';
import { PageIdentifier } from '../../logging/amplitude';
import { useLogPageView } from '../../logging/use-log-page-view';
import { usePageInit } from '../../page-init/page-init';
import { InngangMainContainer } from '../../styled-components/main-container';
import { TemaKey } from '../../tema/tema';
import { AnkeViaBrevKnapp } from './klage-anke-knapper/anke-via-brev-knapp';
import { KlageDigitaltFullmaktKnapp } from './klage-anke-knapper/klage-digitalt-fullmakt-knapp';
import { KlageDigitaltKnapp } from './klage-anke-knapper/klage-digitalt-knapp';
import { KlageViaBrevKnapp } from './klage-anke-knapper/klage-via-brev-knapp';
import { CenteredHeading, InngangPanel, PanelContainer } from './styled-components/panels';

interface Props {
  temaKey: TemaKey;
  titleKey: string | null;
  ytelse: string | null;
  internalSaksnummer?: string | null;
  inngangkategori?: InngangKategori | null;
  digitalKlageFullmakt?: boolean;
  allowsAnke?: boolean;
  mailKlageUrl?: StringValue;
  mailAnkeUrl?: StringValue;
}

export const InngangInnsendingDigital = React.memo(
  ({
    temaKey,
    titleKey,
    ytelse,
    internalSaksnummer = null,
    inngangkategori = null,
    digitalKlageFullmakt = false,
    allowsAnke,
    mailKlageUrl,
    mailAnkeUrl,
  }: Props) => {
    useLogPageView(PageIdentifier.INNGANG_INNSENDING_DIGITAL, temaKey, titleKey ?? ytelse ?? temaKey);
    const title = useTitleOrYtelse(temaKey, titleKey, ytelse);
    const lang = useLanguage();
    const { inngang } = useTranslation();
    usePageInit(`${title} \u2013 ${inngang.title_postfix}`);
    const breadcrumbs = useMemo(() => getBreadcrumbs(inngangkategori, lang), [inngangkategori, lang]);
    useBreadcrumbs(breadcrumbs, title);

    return (
      <InngangMainContainer>
        <PanelContainer>
          <CenteredHeading level="1" size="xlarge">
            {title}
          </CenteredHeading>

          <InngangPanel as="section">
            <DigitalContent
              temaKey={temaKey}
              titleKey={titleKey}
              ytelse={ytelse}
              saksnummerValue={internalSaksnummer}
              digitalKlageFullmakt={digitalKlageFullmakt}
            />
            <KlageViaBrevKnapp mailKlageUrl={mailKlageUrl} />
            {allowsAnke === true ? <AnkeViaBrevKnapp mailAnkeUrl={mailAnkeUrl} /> : null}
            <div>
              {inngang.innsendingsvalg.common.read_more} {inngang.innsendingsvalg.common.estimate}
            </div>
          </InngangPanel>
        </PanelContainer>
      </InngangMainContainer>
    );
  },
  (prevProps, nextProps) =>
    prevProps.temaKey === nextProps.temaKey &&
    prevProps.internalSaksnummer === nextProps.internalSaksnummer &&
    prevProps.titleKey === nextProps.titleKey &&
    prevProps.ytelse === nextProps.ytelse
);

InngangInnsendingDigital.displayName = 'InngangInnsendingDigital';

interface DigitalContentProps {
  temaKey: TemaKey;
  titleKey: string | null;
  ytelse: string | null;
  saksnummerValue: string | null;
  digitalKlageFullmakt: boolean;
}

const DigitalContent = ({ temaKey, titleKey, ytelse, saksnummerValue, digitalKlageFullmakt }: DigitalContentProps) => {
  const { saksnummer } = useParams();
  const { inngang } = useTranslation();

  const query = useMemo(
    () =>
      queryStringify({
        tema: temaKey,
        tittel: titleKey,
        ytelse,
        saksnummer: saksnummerValue ?? getQueryValue(saksnummer),
      }),
    [temaKey, titleKey, ytelse, saksnummerValue, saksnummer]
  );

  return (
    <>
      <KlageDigitaltKnapp query={query} />

      <Link href={inngang.innsendingsvalg.digital.elektronisk_id.url}>
        {inngang.innsendingsvalg.digital.elektronisk_id.text}
      </Link>
      {digitalKlageFullmakt && (
        <>
          <KlageDigitaltFullmaktKnapp />
          <ExternalLink href={inngang.innsendingsvalg.digital.fullmakt_help.url}>
            {inngang.innsendingsvalg.digital.fullmakt_help.text}
          </ExternalLink>
        </>
      )}
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
