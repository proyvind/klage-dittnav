import React from 'react';
import PersonligeOpplysningerSummary from '../../components/summary/personlige-opplysninger-summary';
import VedtakSummary from '../../components/summary/vedtak-summary';
import { ContentContainer, MarginContainer } from '../../styled-components/main-styled-components';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import VedleggSummary from '../../components/summary/vedlegg-summary';
import { Bruker } from '../../types/bruker';
import { Vedtak } from '../../types/vedtak';

interface Props {
    person: Bruker;
    vedtak: Vedtak;
    begrunnelse: string;
    vedlegg: File[];
    submitForm(): any;
}

const OppsummeringSkjemaPage = (props: Props) => {
    return (
        <ContentContainer>
            <MarginContainer>
                <Systemtittel>Personlige opplysninger</Systemtittel>
            </MarginContainer>
            <PersonligeOpplysningerSummary person={props.person} />

            <MarginContainer>
                <Systemtittel>Opplysninger fra vedtaket du klager på</Systemtittel>
            </MarginContainer>
            <VedtakSummary vedtak={props.vedtak} />

            <MarginContainer>
                <Systemtittel>Begrunnelse i din klage</Systemtittel>
            </MarginContainer>
            <Normaltekst>{props.begrunnelse}</Normaltekst>

            <MarginContainer>
                <Systemtittel>Vedlagte dokumenter</Systemtittel>
            </MarginContainer>
            <VedleggSummary vedlegg={props.vedlegg} />

            <MarginContainer>
                <Hovedknapp onClick={() => props.submitForm()}>Send inn</Hovedknapp>
            </MarginContainer>
        </ContentContainer>
    );
};

export default OppsummeringSkjemaPage;
