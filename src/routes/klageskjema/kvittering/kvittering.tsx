import React from 'react';
import styled from 'styled-components/macro';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import { AlertStripeSuksess } from 'nav-frontend-alertstriper';
import Envelope from '../../../icons/EnvelopeIcon';
import { environment } from '../../../environment/environment';
import { ISODate, isoDateToPretty } from '../../../date/date';
import { ExternalLink } from '../../../link/link';
import { CenteredContainer } from '../../../styled-components/common';
import { CenteredPageSubTitle } from '../../../styled-components/page-title';
import { CenteredPageParagraph } from '../../../styled-components/page-paragraph';

interface Props {
    klageId: string | number;
    journalPostId: string;
    finalizedDate: ISODate;
}
const Kvittering = (props: Props) => (
    <>
        <Icon />
        <CenteredPageSubTitle tag={'h2'}>Kvittering for innsendt klage</CenteredPageSubTitle>
        <CenteredPageParagraph>
            <ExternalLink href={environment.klagePdfUrl(props.klageId)}>Se og last ned klagen din</ExternalLink>
        </CenteredPageParagraph>
        <CenteredPageParagraph>Sendt inn: {isoDateToPretty(props.finalizedDate)}</CenteredPageParagraph>

        <FitContentAlertStripeSuksess>
            <Element>Nå er resten vårt ansvar</Element>
            <Normaltekst>
                Du trenger ikke gjøre noe mer, vi tar kontakt med deg hvis det er noe vi lurer på eller hvis vi trenger
                flere opplysninger fra deg.
            </Normaltekst>
        </FitContentAlertStripeSuksess>

        <CenteredPageParagraph>
            Du kan lese mer om hvordan vi behandler klagen din videre på våre{' '}
            <ExternalLink href="https://www.nav.no/no/nav-og-samfunn/kontakt-nav/klage-ris-og-ros/klagerettigheter">
                tema-sider om klage og anke
            </ExternalLink>
            . Du kan se{' '}
            <ExternalLink href="https://www.nav.no/no/nav-og-samfunn/kontakt-nav/klage-ris-og-ros/klagerettigheter">
                forventet saksbehandlingstid for klage og anke
            </ExternalLink>{' '}
            i egen oversikt.
        </CenteredPageParagraph>
        <CenteredContainer>
            <ExternalLink href="https://tjenester.nav.no/saksoversikt/tema/FOR" className="knapp">
                Se dine saker på DITT NAV
            </ExternalLink>
        </CenteredContainer>
    </>
);

const Icon = styled(Envelope)`
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 16px;
    width: 100px;
`;

const FitContentAlertStripeSuksess = styled(AlertStripeSuksess)`
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 32px;
`;

const propsAreEqual = (prevProps: Props, nextProps: Props): boolean =>
    prevProps.klageId !== nextProps.klageId &&
    prevProps.journalPostId !== nextProps.journalPostId &&
    prevProps.finalizedDate !== nextProps.finalizedDate;

export default React.memo(Kvittering, propsAreEqual);
