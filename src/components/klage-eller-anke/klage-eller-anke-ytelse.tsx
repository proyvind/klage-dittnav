import { Sidetittel, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import React from 'react';
import { getKategori, KategoriTema } from '../../data/klage-eller-anke-temaer';
import {
    Margin40Container,
    Margin40TopContainer,
    PointsFlexListContainer
} from '../../styled-components/main-styled-components';
import { RouteComponentProps } from 'react-router-dom';
import NotFoundPage from '../../pages/not-found/not-found-page';
import KlageLinkPanel from '../link/link';

interface MatchParams {
    kategori: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

const KlageEllerAnkeYtelse = (props: Props) => {
    const kategori = getKategori(props.match.params.kategori);
    if (kategori === null) {
        return <NotFoundPage />;
    }

    return (
        <section>
            <div>
                <Margin40TopContainer>
                    <Sidetittel>{kategori.tittel}</Sidetittel>
                </Margin40TopContainer>
                <Margin40Container>
                    <Systemtittel>Hvilken tjeneste eller ytelse gjelder det?</Systemtittel>
                </Margin40Container>
            </div>
            <PointsFlexListContainer>
                {getLinks(props.match.params.kategori, kategori.underkategorier)}
            </PointsFlexListContainer>
        </section>
    );
};

const getLinks = (kategori: string, underkategorier: KategoriTema[]) =>
    underkategorier.map(tema => (
        <KlageLinkPanel key={tema.tittel} href={`${kategori}/${tema.tema}`} className="lenkepanel-flex" border>
            <div>
                <Undertittel className="lenkepanel__heading">{tema.tittel}</Undertittel>
            </div>
        </KlageLinkPanel>
    ));

export default KlageEllerAnkeYtelse;
