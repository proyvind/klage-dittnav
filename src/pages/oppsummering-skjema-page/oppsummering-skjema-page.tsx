import React from 'react';
import PersonligeOpplysningerSummary from '../../components/summary/personlige-opplysninger-summary';
import VedtakSummary from '../../components/summary/vedtak-summary';
import {
    ContentContainer,
    CenteredContentContainer,
    MarginContentContainer
} from '../../styled-components/main-styled-components';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import VedleggSummary from '../../components/summary/vedlegg-summary';

const OppsummeringSkjemaPage = (props: any) => {
    return (
        <ContentContainer>
            <MarginContentContainer>
                <Systemtittel>Personlige opplysninger</Systemtittel>
            </MarginContentContainer>
            <PersonligeOpplysningerSummary person={props.person} />

            <MarginContentContainer>
                <Systemtittel>Opplysninger fra vedtaket du klager på</Systemtittel>
            </MarginContentContainer>
            <VedtakSummary vedtak={props.vedtak} />

            <MarginContentContainer>
                <Systemtittel>Begrunnelse i din klage</Systemtittel>
            </MarginContentContainer>
            <Normaltekst>{props.begrunnelse}</Normaltekst>

            <MarginContentContainer>
                <Systemtittel>Vedlagte dokumenter</Systemtittel>
            </MarginContentContainer>
            <VedleggSummary vedlegg={props.vedlegg} />

            <MarginContentContainer>
                <CenteredContentContainer>
                    <Hovedknapp onClick={() => props.submitForm()}>Send inn</Hovedknapp>
                </CenteredContentContainer>
            </MarginContentContainer>
        </ContentContainer>
    );
};

export default OppsummeringSkjemaPage;
