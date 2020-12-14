import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { InngangKategori } from '../../kategorier/kategorier';
import { SpaceBetweenFlexListContainer } from '../../styled-components/common';
import { PageIdentifier } from '../../logging/amplitude';
import { useLogPageView } from '../../logging/use-log-page-view';
import { ExternalKlageFlexLinkPanel, KlageFlexLinkPanel } from '../../link/link';
import { InngangMainContainer } from '../../styled-components/main-container';
import { ContentContainer } from '../../styled-components/content-container';
import { CenteredPageTitle } from '../../styled-components/page-title';
import { WhiteSection } from '../../styled-components/white-section';
import { SectionTitle } from '../../styled-components/section-title';
import { usePageInit } from '../../page-init/page-init';
import { useBreadcrumbs } from '../../breadcrumbs/use-breadcrumbs';
import { useTitle } from '../../language/titles';
import { useLanguage } from '../../language/use-language';
import { useTranslation } from '../../language/use-translation';

interface Props {
    inngangkategori: InngangKategori;
}

const InngangKategorier = ({ inngangkategori }: Props) => {
    useLogPageView(PageIdentifier.INNGANG_KATEGORIER);
    const lang = useLanguage();
    const title = inngangkategori.title[lang];
    const { inngang } = useTranslation();
    usePageInit(`${title} \u2013 ${inngang.title_postfix}`);
    useBreadcrumbs([], title);

    return (
        <InngangMainContainer>
            <ContentContainer>
                <CenteredPageTitle>{title}</CenteredPageTitle>

                <WhiteSection>
                    <SectionTitle>{inngang.kategorier.title}</SectionTitle>
                    <KategoriLenker {...inngangkategori} />
                </WhiteSection>
            </ContentContainer>
        </InngangMainContainer>
    );
};

const KategoriLenker = ({ kategorier, path }: InngangKategori) => {
    const lang = useLanguage();
    return (
        <SpaceBetweenFlexListContainer>
            {kategorier.map(kategori => {
                if (typeof kategori.externalUrl === 'string') {
                    return (
                        <ExternalKategoriLink
                            key={kategori.externalUrl}
                            titleKey={kategori.titleKey}
                            externalUrl={kategori.externalUrl}
                        />
                    );
                }

                return (
                    <KategoriLink
                        key={kategori.titleKey}
                        titleKey={kategori.titleKey}
                        path={`/${lang}/${path}/${kategori.path}`}
                    />
                );
            })}
        </SpaceBetweenFlexListContainer>
    );
};

interface KategoriLinkProps {
    titleKey: string;
    path: string;
}

const KategoriLink = ({ titleKey, path }: KategoriLinkProps) => {
    const title = useTitle(titleKey);
    return (
        <KlageFlexLinkPanel key={titleKey} href={path} border>
            <div>
                <Undertittel className="lenkepanel__heading">{title}</Undertittel>
            </div>
        </KlageFlexLinkPanel>
    );
};

interface ExternalKategoriProps {
    titleKey: string;
    externalUrl: string;
}

const ExternalKategoriLink = ({ titleKey, externalUrl }: ExternalKategoriProps) => {
    const title = useTitle(titleKey);
    return (
        <ExternalKlageFlexLinkPanel key={titleKey} href={externalUrl} border>
            <div>
                <Undertittel className="lenkepanel__heading">{title}</Undertittel>
            </div>
        </ExternalKlageFlexLinkPanel>
    );
};

const arePropsEqual = (prevProps: Props, nextProps: Props) => prevProps.inngangkategori === nextProps.inngangkategori;

export default React.memo(InngangKategorier, arePropsEqual);
