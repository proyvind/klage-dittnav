import React from 'react';
import PersonligeOpplysningerSummary from '../../components/summary/personlige-opplysninger-summary';
import VedtakSummary from '../../components/summary/vedtak-summary';
import { ContentContainer, MarginContainer } from '../../styled-components/main-styled-components';
import { Systemtittel } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';

const VedtakSummaryPage = (props: any) => {
    return (
        <ContentContainer>
            <MarginContainer>
                <Systemtittel>Personlige opplysninger</Systemtittel>
            </MarginContainer>
            <PersonligeOpplysningerSummary person={props.person} />
            <MarginContainer>
                <Systemtittel>Vedtak</Systemtittel>
            </MarginContainer>
            <VedtakSummary vedtak={props.vedtak} />

            <Hovedknapp onClick={() => props.next()}>Bekreft</Hovedknapp>
        </ContentContainer>
    );
};

export default VedtakSummaryPage;
