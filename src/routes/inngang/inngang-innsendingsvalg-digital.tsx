import React, { useMemo } from 'react';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import { useLogPageView } from '../../logging/use-log-page-view';
import { PageIdentifier } from '../../logging/amplitude';
import { ExternalLink } from '../../link/link';
import { TemaKey } from '../../tema/tema';
import { InngangMainContainer } from '../../styled-components/main-container';
import { ContentContainer } from '../../styled-components/content-container';
import { CenteredPageTitle } from '../../styled-components/page-title';
import { WhiteSection } from '../../styled-components/white-section';
import { InlineRow, Row } from '../../styled-components/row';
import { usePageInit } from '../../page-init/page-init';
import { InngangKategori, StringValue } from '../../kategorier/kategorier';
import { Breadcrumb, useBreadcrumbs } from '../../breadcrumbs/use-breadcrumbs';
import { useTitleOrYtelse } from '../../language/titles';
import { Languages } from '../../language/language';
import { useLanguage } from '../../language/use-language';
import { useTranslation } from '../../language/use-translation';
import { DineAnkemuligheter } from '../skjemahistorikk/dine-ankemuligheter';
import { KlageDigitaltKnapp } from './klage-anke-knapper/klage-digitalt-knapp';
import { KlageDigitaltFullmaktKnapp } from './klage-anke-knapper/klage-digitalt-fullmakt-knapp';
import { KlageViaBrevKnapp } from './klage-anke-knapper/klage-via-brev-knapp';
import { AnkeViaBrevKnapp } from './klage-anke-knapper/anke-via-brev-knapp';

interface Props {
    temaKey: TemaKey;
    titleKey: string | null;
    ytelse: string | null;
    internalSaksnummer?: string | null;
    inngangkategori?: InngangKategori | null;
    digitalKlageFullmakt?: boolean;
    allowsAnke?: boolean;
    showAnkeList?: boolean;
    mailKlageUrl?: StringValue;
    mailAnkeUrl?: StringValue;
}

const InngangInnsendingDigital = ({
    temaKey,
    titleKey,
    ytelse,
    internalSaksnummer = null,
    inngangkategori = null,
    digitalKlageFullmakt = false,
    allowsAnke,
    showAnkeList = false,
    mailKlageUrl,
    mailAnkeUrl
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
            <ContentContainer>
                <CenteredPageTitle>{title}</CenteredPageTitle>

                <Row>
                    <DineAnkemuligheter show={showAnkeList} />
                </Row>

                <WhiteSection>
                    <DigitalContent
                        temaKey={temaKey}
                        titleKey={titleKey}
                        ytelse={ytelse}
                        saksnummer={internalSaksnummer}
                        digitalKlageFullmakt={digitalKlageFullmakt}
                    />
                    <InlineRow>
                        <KlageViaBrevKnapp mailKlageUrl={mailKlageUrl} />
                    </InlineRow>
                    {allowsAnke && (
                        <InlineRow>
                            <AnkeViaBrevKnapp mailAnkeUrl={mailAnkeUrl} />
                        </InlineRow>
                    )}
                    {inngang.innsendingsvalg.common.read_more} {inngang.innsendingsvalg.common.estimate}
                </WhiteSection>
            </ContentContainer>
        </InngangMainContainer>
    );
};

interface DigitalContentProps {
    temaKey: TemaKey;
    titleKey: string | null;
    ytelse: string | null;
    saksnummer: string | null;
    digitalKlageFullmakt: boolean;
}

const DigitalContent = ({ temaKey, titleKey, ytelse, saksnummer, digitalKlageFullmakt }: DigitalContentProps) => {
    const { search } = useLocation();
    const { inngang } = useTranslation();
    if (saksnummer === null) {
        const query = queryString.parse(search);
        saksnummer = getQueryValue(query.saksnummer);
    }
    const query = useMemo(
        () =>
            queryString.stringify(
                {
                    tema: temaKey,
                    tittel: titleKey,
                    ytelse,
                    saksnummer
                },
                {
                    skipNull: true,
                    skipEmptyString: true,
                    sort: false
                }
            ),
        [temaKey, titleKey, ytelse, saksnummer]
    );

    return (
        <>
            <InlineRow>
                <KlageDigitaltKnapp query={query} />
                <ExternalLink href={inngang.innsendingsvalg.digital.elektronisk_id.url}>
                    {inngang.innsendingsvalg.digital.elektronisk_id.text}
                </ExternalLink>
            </InlineRow>
            {digitalKlageFullmakt && (
                <InlineRow>
                    <KlageDigitaltFullmaktKnapp />
                    <ExternalLink href={inngang.innsendingsvalg.digital.fullmakt_help.url}>
                        {inngang.innsendingsvalg.digital.fullmakt_help.text}
                    </ExternalLink>
                </InlineRow>
            )}
        </>
    );
};

function getBreadcrumbs(inngangkategori: InngangKategori | null, lang: Languages): Breadcrumb[] {
    if (inngangkategori === null) {
        return [];
    }

    return [
        {
            title: inngangkategori.title[lang],
            url: `/${lang}/${inngangkategori.path}`,
            handleInApp: true
        }
    ];
}

function getQueryValue(queryValue: string | string[] | null | undefined) {
    if (typeof queryValue === 'string' && queryValue.length !== 0) {
        return queryValue;
    }
    return null;
}

const arePropsEqual = (prevProps: Props, nextProps: Props) =>
    prevProps.temaKey === nextProps.temaKey &&
    prevProps.internalSaksnummer === nextProps.internalSaksnummer &&
    prevProps.titleKey === nextProps.titleKey &&
    prevProps.ytelse === nextProps.ytelse;

export default React.memo(InngangInnsendingDigital, arePropsEqual);
