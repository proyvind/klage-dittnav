import React, { useMemo } from 'react';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import LetterOpened from '../../icons/LetterOpenedIcon';
import { IconContainer, LenkePanelContentWithImage, MarginTopContainer } from '../../styled-components/common';
import MobilePhone from '../../icons/MobilePhoneIcon';
import MobilePhoneIdCard from '../../icons/MobilePhoneIdCardIcon';
import { useLogPageView } from '../../logging/use-log-page-view';
import { PageIdentifier } from '../../logging/amplitude';
import { ExternalLink, KlageLinkPanel } from '../../link/link';
import { TemaKey } from '../../tema/tema';
import { InngangMainContainer } from '../../styled-components/main-container';
import { ContentContainer } from '../../styled-components/content-container';
import { CenteredPageTitle } from '../../styled-components/page-title';
import { WhiteSection } from '../../styled-components/white-section';
import { InlineRow } from '../../styled-components/row';
import { usePageInit } from '../../page-init/page-init';
import { InngangKategori, StringValue } from '../../kategorier/kategorier';
import { Breadcrumb, useBreadcrumbs } from '../../breadcrumbs/use-breadcrumbs';
import LawBook from '../../icons/LawBook';
import { klageFormUrl } from '../../kategorier/kategorier';
import { useTitleOrYtelse } from '../../language/titles';
import { Languages } from '../../language/language';
import { useLanguage } from '../../language/use-language';
import { useTranslation } from '../../language/use-translation';

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

const InngangInnsendingDigital = ({
    temaKey,
    titleKey,
    ytelse,
    internalSaksnummer = null,
    inngangkategori = null,
    digitalKlageFullmakt = false,
    allowsAnke,
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

                <WhiteSection>
                    <DigitalContent
                        temaKey={temaKey}
                        titleKey={titleKey}
                        ytelse={ytelse}
                        saksnummer={internalSaksnummer}
                        digitalKlageFullmakt={digitalKlageFullmakt}
                        lang={lang}
                    />
                    <InlineRow>
                        <LenkepanelBase href={(mailKlageUrl ?? klageFormUrl)[lang]} target="_blank" border>
                            <LenkePanelContentWithImage>
                                <IconContainer>
                                    <LetterOpened />
                                </IconContainer>
                                <div>
                                    <Systemtittel className="lenkepanel__heading">
                                        {inngang.innsendingsvalg.digital.cards.post.title}
                                    </Systemtittel>
                                    <MarginTopContainer>
                                        <Normaltekst>
                                            {inngang.innsendingsvalg.digital.cards.post.description}
                                        </Normaltekst>
                                    </MarginTopContainer>
                                </div>
                            </LenkePanelContentWithImage>
                        </LenkepanelBase>
                    </InlineRow>
                    {allowsAnke && (
                        <InlineRow>
                            <LenkepanelBase href={(mailAnkeUrl ?? klageFormUrl)[lang]} target="_blank" border>
                                <LenkePanelContentWithImage>
                                    <IconContainer>
                                        <LawBook />
                                    </IconContainer>
                                    <div>
                                        <Systemtittel className="lenkepanel__heading">
                                            {inngang.innsendingsvalg.digital.cards.anke.title}
                                        </Systemtittel>
                                        <MarginTopContainer>
                                            <Normaltekst>
                                                {inngang.innsendingsvalg.digital.cards.anke.description}
                                            </Normaltekst>
                                        </MarginTopContainer>
                                    </div>
                                </LenkePanelContentWithImage>
                            </LenkepanelBase>
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
    lang: Languages;
}

const DigitalContent = ({ temaKey, titleKey, ytelse, saksnummer, digitalKlageFullmakt, lang }: DigitalContentProps) => {
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
                <KlageLinkPanel href={`/${lang}/ny?${query}`} border>
                    <LenkePanelContentWithImage>
                        <IconContainer>
                            <MobilePhone />
                        </IconContainer>
                        <div>
                            <Systemtittel className="lenkepanel__heading">
                                {inngang.innsendingsvalg.digital.cards.digital.title}
                            </Systemtittel>
                            <MarginTopContainer>
                                <Normaltekst>{inngang.innsendingsvalg.digital.cards.digital.description}</Normaltekst>
                            </MarginTopContainer>
                        </div>
                    </LenkePanelContentWithImage>
                </KlageLinkPanel>
                <ExternalLink href={inngang.innsendingsvalg.digital.elektronisk_id.url} showIcon>
                    {inngang.innsendingsvalg.digital.elektronisk_id.text}
                </ExternalLink>
            </InlineRow>
            {digitalKlageFullmakt && (
                <InlineRow>
                    <KlageLinkPanel href={`${window.location.pathname}/fullmakt`} border>
                        <LenkePanelContentWithImage>
                            <IconContainer>
                                <MobilePhoneIdCard />
                            </IconContainer>
                            <div>
                                <Systemtittel className="lenkepanel__heading">
                                    {inngang.innsendingsvalg.digital.cards.fullmakt.title}
                                </Systemtittel>
                                <MarginTopContainer>
                                    <Normaltekst>
                                        {inngang.innsendingsvalg.digital.cards.fullmakt.description}
                                    </Normaltekst>
                                </MarginTopContainer>
                            </div>
                        </LenkePanelContentWithImage>
                    </KlageLinkPanel>
                    <ExternalLink href={inngang.innsendingsvalg.digital.fullmakt_help.url} showIcon>
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
