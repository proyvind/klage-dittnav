import React from 'react';
import Envelope from '../../assets/images/icons/Envelope';
import { ContentContainer, MarginContainer, CenteredContainer } from '../../styled-components/main-styled-components';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';

const KvitteringIkkeJournalfort = (props: any) => {
    window.onbeforeunload = null;

    return (
        <ContentContainer>
            <CenteredContainer>
                <MarginContainer>
                    <Envelope />
                </MarginContainer>

                <MarginContainer>
                    <Systemtittel>Kvittering for innsendt klage</Systemtittel>
                </MarginContainer>

                <MarginContainer>
                    <AlertStripeInfo>Klagen din er nå klar for innsending til NAV.</AlertStripeInfo>
                </MarginContainer>
                <MarginContainer>
                    <Normaltekst>
                        Følg med på innboksen, hvis du ikke får noe i løpet av dagen (dette skal ikke ta lang tid), så
                        si ifra
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

export default KvitteringIkkeJournalfort;
