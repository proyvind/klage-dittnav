import { Sidetittel, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import React from 'react';
import { KategoriTema, KlageAnkeTema } from '../../data/klage-eller-anke-temaer';
import {
    Margin40Container,
    Margin40TopContainer,
    PointsFlexListContainer
} from '../../styled-components/main-styled-components';
import KlageLinkPanel from '../link/link';

const KlageEllerAnkeYtelse = (kategori: KlageAnkeTema) => (
    <section>
        <div>
            <Margin40TopContainer>
                <Sidetittel>{kategori.tittel}</Sidetittel>
            </Margin40TopContainer>
            <Margin40Container>
                <Systemtittel>Hvilken tjeneste eller ytelse gjelder det?</Systemtittel>
            </Margin40Container>
        </div>
        <PointsFlexListContainer>{getLinks(kategori.path, kategori.underkategorier)}</PointsFlexListContainer>
    </section>
);

const getLinks = (kategori: string, underkategorier: KategoriTema[]) =>
    underkategorier.map(tema => (
        <KlageLinkPanel key={tema.tittel} href={`/${kategori}/${tema.tema}`} className="lenkepanel-flex" border>
            <div>
                <Undertittel className="lenkepanel__heading">{tema.tittel}</Undertittel>
            </div>
        </KlageLinkPanel>
    ));

export default KlageEllerAnkeYtelse;
