import React from 'react';
import { Sidetittel, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import { InngangKategori } from '../../data/kategorier';
import {
    Margin40Container,
    Margin40TopContainer,
    PointsFlexListContainer
} from '../../styled-components/main-styled-components';
import { PageIdentifier } from '../../utils/logger/amplitude';
import { useLogPageView } from '../../utils/logger/use-log-page-view';
import KlageLinkPanel from '../link/link';

interface Props {
    inngangkategori: InngangKategori;
}

const InngangKategorier = ({ inngangkategori }: Props) => {
    useLogPageView(PageIdentifier.INNGANG_KATEGORIER);
    return (
        <section>
            <div>
                <Margin40TopContainer>
                    <Sidetittel>{inngangkategori.title}</Sidetittel>
                </Margin40TopContainer>
                <Margin40Container>
                    <Systemtittel>Hvilken tjeneste eller ytelse gjelder det?</Systemtittel>
                </Margin40Container>
            </div>
            <PointsFlexListContainer>{getLinks(inngangkategori)}</PointsFlexListContainer>
        </section>
    );
};

const getLinks = ({ kategorier, path }: InngangKategori) =>
    kategorier.map(kategori => (
        <KlageLinkPanel key={kategori.title} href={`/${path}/${kategori.path}`} className="lenkepanel-flex" border>
            <div>
                <Undertittel className="lenkepanel__heading">{kategori.title}</Undertittel>
            </div>
        </KlageLinkPanel>
    ));

export default InngangKategorier;
