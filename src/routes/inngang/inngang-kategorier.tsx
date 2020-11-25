import React from 'react';
import { Sidetittel, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import { InngangKategori } from '../../kategorier/kategorier';
import {
    CenterInMobileContainer,
    Margin40Container,
    Margin40TopContainer,
    PointsFlexListContainer,
    WhiteBackgroundContainer
} from '../../styled-components/common';
import { PageIdentifier } from '../../logging/amplitude';
import { useLogPageView } from '../../logging/use-log-page-view';
import { KlageFlexLinkPanel } from '../../link/link';
import Layout from '../layout';

interface Props {
    inngangkategori: InngangKategori;
}

const InngangKategorier = ({ inngangkategori }: Props) => {
    useLogPageView(PageIdentifier.INNGANG_KATEGORIER);
    return (
        <Layout backgroundColor="#e7e9e9">
            <Margin40TopContainer>
                <CenterInMobileContainer>
                    <Sidetittel>{inngangkategori.title}</Sidetittel>
                </CenterInMobileContainer>
            </Margin40TopContainer>
            <Margin40Container>
                <WhiteBackgroundContainer>
                    <Systemtittel>Hvilken tjeneste eller ytelse gjelder det?</Systemtittel>
                    <Margin40TopContainer>
                        <PointsFlexListContainer>{getLinks(inngangkategori)}</PointsFlexListContainer>
                    </Margin40TopContainer>
                </WhiteBackgroundContainer>
            </Margin40Container>
        </Layout>
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
