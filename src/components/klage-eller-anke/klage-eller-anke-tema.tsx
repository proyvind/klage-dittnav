import React from 'react';
import { Systemtittel, Normaltekst, Sidetittel, Undertittel } from 'nav-frontend-typografi';
import { KLAGE_ELLER_ANKE_TEMAER } from '../../data/klage-eller-anke-temaer';
import {
    Margin40Container,
    Margin40TopContainer,
    PointsFlexListContainer
} from '../../styled-components/main-styled-components';
import Veilederpanel from 'nav-frontend-veilederpanel';
import VeilederIcon from '../../assets/Veileder.svg';
import KlageLinkPanel from '../link/link';

const KlageEllerAnkeTema = () => (
    <section>
        <div>
            <Margin40TopContainer>
                <Sidetittel>Klage eller anke på vedtak</Sidetittel>
            </Margin40TopContainer>

            <Margin40TopContainer>
                <Veilederpanel type={'plakat'} kompakt svg={<img src={VeilederIcon} alt="Veileder" />}>
                    <Normaltekst>
                        Hvis NAV har behandlet en sak som gjelder deg og du er uenig i vedtaket, har du flere
                        valgmuligheter for å belyse saken bedre og få en ny vurdering. Start med å velge hvilket tema
                        saken gjelder. Du finner denne informasjonen i vedtaket som du har mottatt fra NAV.
                    </Normaltekst>
                </Veilederpanel>
            </Margin40TopContainer>

            <Margin40Container>
                <Systemtittel>Hvilket tema gjelder det?</Systemtittel>
            </Margin40Container>
        </div>
        <PointsFlexListContainer>{getLinks()}</PointsFlexListContainer>
    </section>
);

const getLinks = () =>
    KLAGE_ELLER_ANKE_TEMAER.map(tema => (
        <KlageLinkPanel key={tema.tittel} href={`klage-anke/${tema.path}`} className="lenkepanel-flex" border>
            <div>
                <Undertittel className="lenkepanel__heading">{tema.tittel}</Undertittel>
                <Normaltekst>{tema.beskrivelse}</Normaltekst>
            </div>
        </KlageLinkPanel>
    ));

export default KlageEllerAnkeTema;
