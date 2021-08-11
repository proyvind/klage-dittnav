import React from 'react';
import styled from 'styled-components/macro';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import { AlertStripeSuksess } from 'nav-frontend-alertstriper';
import Envelope from '../../../icons/EnvelopeIcon';
import { ENVIRONMENT } from '../../../environment/environment';
import { ISODate, isoDateToPretty } from '../../../date/date';
import { ExternalLink } from '../../../link/link';
import { CenteredContainer } from '../../../styled-components/common';
import { CenteredPageSubTitle } from '../../../styled-components/page-title';
import { CenteredPageParagraph } from '../../../styled-components/page-paragraph';
import { useTranslation } from '../../../language/use-translation';
import { AnkeInternalSaksnummer } from '../../../store/anke/types/anke';

interface Props {
    ankeInternalSaksnummer: AnkeInternalSaksnummer;
    finalizedDate: ISODate;
}
const Kvittering = ({ ankeInternalSaksnummer, finalizedDate }: Props) => {
    const { ankeskjema } = useTranslation();
    return (
        <>
            <Icon />
            <CenteredPageSubTitle tag={'h2'}>{ankeskjema.kvittering.title}</CenteredPageSubTitle>
            <CenteredPageParagraph>
                <ExternalLink href={ENVIRONMENT.ankePdfUrl(ankeInternalSaksnummer)}>
                    {ankeskjema.kvittering.download}
                </ExternalLink>
            </CenteredPageParagraph>
            <CenteredPageParagraph>
                {ankeskjema.kvittering.sent}: {isoDateToPretty(finalizedDate)}
            </CenteredPageParagraph>

            <FitContentAlertStripeSuksess>
                <Element>{ankeskjema.kvittering.general_info.title}</Element>
                <Normaltekst>{ankeskjema.kvittering.general_info.description}</Normaltekst>
            </FitContentAlertStripeSuksess>

            <CenteredPageParagraph>
                {ankeskjema.kvittering.read_more} {ankeskjema.kvittering.see_estimate}
            </CenteredPageParagraph>
            <CenteredContainer>
                <ExternalLink href="https://tjenester.nav.no/saksoversikt/tema/FOR" className="knapp">
                    {ankeskjema.kvittering.dine_saker}
                </ExternalLink>
            </CenteredContainer>
        </>
    );
};

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
    prevProps.ankeInternalSaksnummer !== nextProps.ankeInternalSaksnummer &&
    prevProps.finalizedDate !== nextProps.finalizedDate;

export default React.memo(Kvittering, propsAreEqual);
