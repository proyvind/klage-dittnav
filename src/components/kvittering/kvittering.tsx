import React from 'react';
import envelope from '../../assets/images/icons/envelope.svg';
import { ContentContainer, MarginContainer, CenteredContainer } from '../../styled-components/main-styled-components';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import { AlertStripeSuksess } from 'nav-frontend-alertstriper';
import { Knapp } from 'nav-frontend-knapper';

const Kvittering = (props: any) => {
    return (
        <ContentContainer>
            <CenteredContainer>
                <MarginContainer>
                    <img src={envelope} alt="Kvittering" />
                </MarginContainer>

                <MarginContainer>
                    <Systemtittel>Kvittering for innsendt klage</Systemtittel>
                </MarginContainer>

                <MarginContainer>
                    <AlertStripeSuksess>Klagen din er nå innsendt til NAV.</AlertStripeSuksess>
                </MarginContainer>
                <MarginContainer>
                    <Normaltekst>
                        Du kan finne igjen klagen din under Dine saker når vi starter å behandle den.{' '}
                    </Normaltekst>
                </MarginContainer>

                <MarginContainer>
                    <Normaltekst>
                        Du kan lese mer om hvordan vi behandler klagen din videre på våre tema-sider om klage og anke.
                    </Normaltekst>
                </MarginContainer>

                {/* TODO: What should this button do */}
                {/* <MarginContainer>
                    <Knapp>Se din foreldrepengesak på DITT NAV</Knapp>
                </MarginContainer> */}
            </CenteredContainer>
        </ContentContainer>
    );
};

export default Kvittering;
