import React from 'react';
import PersonligeOpplysningerSummary from '../../components/summary/personlige-opplysninger-summary';
import VedtakSummary from '../../components/summary/vedtak-summary';
import { ContentContainer, MarginContentContainer } from '../../styled-components/main-styled-components';
import { Systemtittel } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';

const VedtakSummaryPage = (props: any) => {
    return (
        <ContentContainer>
            <MarginContentContainer>
                <Systemtittel>Personlige opplysninger</Systemtittel>
            </MarginContentContainer>
            <PersonligeOpplysningerSummary person={props.person} />
            <MarginContentContainer>
                <Systemtittel>Vedtak</Systemtittel>
            </MarginContentContainer>
            <VedtakSummary vedtak={props.vedtak} />

            <Hovedknapp onClick={() => props.next()}>Bekreft</Hovedknapp>
        </ContentContainer>
    );
};

export default VedtakSummaryPage;
