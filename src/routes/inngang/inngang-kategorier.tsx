import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { InngangKategori } from '../../kategorier/kategorier';
import { PointsFlexListContainer } from '../../styled-components/common';
import { PageIdentifier } from '../../logging/amplitude';
import { useLogPageView } from '../../logging/use-log-page-view';
import { ExternalKlageFlexLinkPanel, KlageFlexLinkPanel } from '../../link/link';
import { InngangMainContainer } from '../../styled-components/main-container';
import { ContentContainer } from '../../styled-components/content-container';
import { PageTitle } from '../../styled-components/page-title';
import { WhiteSection } from '../../styled-components/white-section';
import { SectionTitle } from '../../styled-components/section-title';
import { usePageInit } from '../../page-init/page-init';
import { useBreadcrumbs } from '../../breadcrumbs/use-breadcrumbs';

interface Props {
    inngangkategori: InngangKategori;
}

const InngangKategorier = ({ inngangkategori }: Props) => {
    useLogPageView(PageIdentifier.INNGANG_KATEGORIER);
    usePageInit(`${inngangkategori.title} \u2013 klage eller anke`);
    useBreadcrumbs([], inngangkategori.title);

    return (
        <InngangMainContainer>
            <ContentContainer>
                <PageTitle>{inngangkategori.title}</PageTitle>
                <WhiteSection>
                    <SectionTitle>Hvilken tjeneste eller ytelse gjelder det?</SectionTitle>
                    <PointsFlexListContainer>{getLinks(inngangkategori)}</PointsFlexListContainer>
                </WhiteSection>
            </ContentContainer>
        </InngangMainContainer>
    );
};

const getLinks = ({ kategorier, path }: InngangKategori) =>
    kategorier.map(kategori => {
        if (!kategori.externalUrl) {
            return (
                <KlageFlexLinkPanel key={kategori.title} href={`/${path}/${kategori.path}`} border>
                    <div>
                        <Undertittel className="lenkepanel__heading">{kategori.title}</Undertittel>
                    </div>
                </KlageFlexLinkPanel>
            );
        }
        return (
            <ExternalKlageFlexLinkPanel key={kategori.title} href={kategori.externalUrl} border>
                <div>
                    <Undertittel className="lenkepanel__heading">{kategori.title}</Undertittel>
                </div>
            </ExternalKlageFlexLinkPanel>
        );
    });

const arePropsEqual = (prevProps: Props, nextProps: Props) => prevProps.inngangkategori === nextProps.inngangkategori;

export default React.memo(InngangKategorier, arePropsEqual);
