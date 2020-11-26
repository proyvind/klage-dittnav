import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { InngangKategori } from '../../kategorier/kategorier';
import { PointsFlexListContainer } from '../../styled-components/common';
import { PageIdentifier } from '../../logging/amplitude';
import { useLogPageView } from '../../logging/use-log-page-view';
import { KlageFlexLinkPanel } from '../../link/link';
import { InngangMainContainer } from '../../styled-components/main-container';
import { ContentContainer } from '../../styled-components/content-container';
import { PageTitle } from '../../styled-components/page-title';
import { WhiteSection } from '../../styled-components/white-section';
import { SectionTitle } from '../../styled-components/section-title';

interface Props {
    inngangkategori: InngangKategori;
}

const InngangKategorier = ({ inngangkategori }: Props) => {
    useLogPageView(PageIdentifier.INNGANG_KATEGORIER);
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
    kategorier.map(kategori => (
        <KlageFlexLinkPanel key={kategori.title} href={`/${path}/${kategori.path}`} border>
            <div>
                <Undertittel className="lenkepanel__heading">{kategori.title}</Undertittel>
            </div>
        </KlageFlexLinkPanel>
    ));

const arePropsEqual = (prevProps: Props, nextProps: Props) => prevProps.inngangkategori === nextProps.inngangkategori;

export default React.memo(InngangKategorier, arePropsEqual);
