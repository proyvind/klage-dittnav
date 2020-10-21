import { Sidetittel, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import React from 'react';
import { InngangKategori, Kategori } from '../../data/kategorier';
import {
    Margin40Container,
    Margin40TopContainer,
    PointsFlexListContainer
} from '../../styled-components/main-styled-components';
import KlageLinkPanel from '../link/link';

const InngangKategorier = (kategori: InngangKategori) => (
    <section>
        <div>
            <Margin40TopContainer>
                <Sidetittel>{kategori.title}</Sidetittel>
            </Margin40TopContainer>
            <Margin40Container>
                <Systemtittel>Hvilken tjeneste eller ytelse gjelder det?</Systemtittel>
            </Margin40Container>
        </div>
        <PointsFlexListContainer>{getLinks(kategori.path, kategori.kategorier)}</PointsFlexListContainer>
    </section>
);

const getLinks = (kategori: string, underkategorier: Kategori[]) =>
    underkategorier.map(tema => (
        <KlageLinkPanel key={tema.title} href={`/${kategori}/${tema.tema}`} className="lenkepanel-flex" border>
            <div>
                <Undertittel className="lenkepanel__heading">{tema.title}</Undertittel>
            </div>
        </KlageLinkPanel>
    ));

export default InngangKategorier;
