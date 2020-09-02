import React from 'react';
import Envelope from '../../assets/images/icons/Envelope';
import {
    ContentContainer,
    MarginContainer,
    CenteredContainer,
    Margin40Container
} from '../../styled-components/main-styled-components';
import { Systemtittel, Normaltekst, Element } from 'nav-frontend-typografi';
import { AlertStripeSuksess } from 'nav-frontend-alertstriper';
import { formatDate } from '../../utils/date-util';

interface Props {
    journalPostId?: string;
    success: boolean;
    finalizedDate: string;
}
const Kvittering = (props: Props) => {
    window.onbeforeunload = null;

    return (
        <ContentContainer>
            <CenteredContainer>
                <MarginContainer>
                    <Envelope />
                </MarginContainer>
                <Margin40Container>
                    <Systemtittel>Kvittering for innsendt klage</Systemtittel>
                </Margin40Container>
                {/* TODO: Hvis success så vis link til søknad-PDF */}

                {props.finalizedDate && (
                    <Margin40Container>
                        <Normaltekst>Sendt inn: {formatDate(new Date(props.finalizedDate))}</Normaltekst>
                    </Margin40Container>
                )}
            </CenteredContainer>
            <Margin40Container>
                <AlertStripeSuksess className="fit-content">
                    <Element>Nå er resten vårt ansvar</Element>
                    <Normaltekst>
                        Du trenger ikke gjøre noe mer, vi tar kontakt med deg hvis det er noe vi lurer på eller hvis vi
                        trenger flere opplysninger fra deg.
                    </Normaltekst>
                </AlertStripeSuksess>
            </Margin40Container>

            <CenteredContainer>
                <Margin40Container>
                    <Normaltekst>
                        Du kan lese mer om hvordan vi behandler klagen din videre på våre{' '}
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.nav.no/no/nav-og-samfunn/kontakt-nav/klage-ris-og-ros/klagerettigheter"
                        >
                            tema-sider om klage og anke
                        </a>
                        .
                    </Normaltekst>
                </Margin40Container>

                <Margin40Container>
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://tjenester.nav.no/saksoversikt/tema/FOR"
                        className="knapp"
                    >
                        Se dine saker på DITT NAV
                    </a>
                </Margin40Container>
            </CenteredContainer>
        </ContentContainer>
    );
};

export default Kvittering;