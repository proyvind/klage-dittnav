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
import FullmaktInfo from '../begrunnelse/fullmakt-info';
import { useTranslation } from '../../../language/use-translation';

interface Props {
    klageId: string | number;
    journalPostId: string;
    finalizedDate: ISODate;
}
const Kvittering = (props: Props) => {
    const { klageskjema } = useTranslation();
    return (
        <>
            <Icon />
            <CenteredPageSubTitle tag={'h2'}>{klageskjema.kvittering.title}</CenteredPageSubTitle>
            <FullmaktInfo />
            <CenteredPageParagraph>
                <ExternalLink href={ENVIRONMENT.klagePdfUrl(props.klageId)}>
                    {klageskjema.kvittering.download}
                </ExternalLink>
            </CenteredPageParagraph>
            <CenteredPageParagraph>
                {klageskjema.kvittering.sent}: {isoDateToPretty(props.finalizedDate)}
            </CenteredPageParagraph>

            <FitContentAlertStripeSuksess>
                <Element>{klageskjema.kvittering.general_info.title}</Element>
                <Normaltekst>{klageskjema.kvittering.general_info.description}</Normaltekst>
            </FitContentAlertStripeSuksess>

            <CenteredPageParagraph>
                {klageskjema.kvittering.read_more} {klageskjema.kvittering.see_estimate}
            </CenteredPageParagraph>
            <CenteredContainer>
                <ExternalLink href="https://tjenester.nav.no/saksoversikt/tema/FOR" className="knapp">
                    {klageskjema.kvittering.dine_saker}
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
    prevProps.klageId !== nextProps.klageId &&
    prevProps.journalPostId !== nextProps.journalPostId &&
    prevProps.finalizedDate !== nextProps.finalizedDate;

export default React.memo(Kvittering, propsAreEqual);
