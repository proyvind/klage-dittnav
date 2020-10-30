import React from 'react';
import Envelope from '../../assets/images/icons/Envelope';
import {
    ContentContainer,
    MarginContainer,
    CenteredContainer,
    Margin40Container,
    Margin32Container
} from '../../styled-components/main-styled-components';
import { Systemtittel, Normaltekst, Element } from 'nav-frontend-typografi';
import { AlertStripeSuksess } from 'nav-frontend-alertstriper';
import Lenke from 'nav-frontend-lenker';
import { ISODate, isoDateToPretty } from '../../utils/date';
import { environment } from '../../utils/environment';
import styled from 'styled-components/macro';

interface Props {
    klageId: string | number;
    journalPostId: string;
    finalizedDate: ISODate;
}
const Kvittering = (props: Props) => (
    <ContentContainer>
        <CenteredContainer>
            <MarginContainer>
                <Envelope />
            </MarginContainer>
            <Margin40Container>
                <Systemtittel>Kvittering for innsendt klage</Systemtittel>
            </Margin40Container>
            <Margin32Container>
                <Lenke target="_blank" rel="noopener noreferrer" href={environment.klagePdfUrl(props.klageId)}>
                    Se og last ned søknaden din
                </Lenke>
            </Margin32Container>
            <Margin32Container>
                <Normaltekst>Sendt inn: {isoDateToPretty(props.finalizedDate)}</Normaltekst>
            </Margin32Container>
        </CenteredContainer>
        <Margin40Container>
            <FitContentAlertStripeSuksess>
                <Element>Nå er resten vårt ansvar</Element>
                <Normaltekst>
                    Du trenger ikke gjøre noe mer, vi tar kontakt med deg hvis det er noe vi lurer på eller hvis vi
                    trenger flere opplysninger fra deg.
                </Normaltekst>
            </FitContentAlertStripeSuksess>
        </Margin40Container>

        <CenteredContainer>
            <Margin40Container>
                <Normaltekst>
                    Du kan lese mer om hvordan vi behandler klagen din videre på våre{' '}
                    <Lenke
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.nav.no/no/nav-og-samfunn/kontakt-nav/klage-ris-og-ros/klagerettigheter"
                    >
                        tema-sider om klage og anke
                    </Lenke>
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

const FitContentAlertStripeSuksess = styled(AlertStripeSuksess)`
    width: fit-content;
    margin: 0 auto;
`;

const propsAreEqual = (prevProps: Props, nextProps: Props): boolean =>
    prevProps.klageId !== nextProps.klageId &&
    prevProps.journalPostId !== nextProps.journalPostId &&
    prevProps.finalizedDate !== nextProps.finalizedDate;

export default React.memo(Kvittering, propsAreEqual);
