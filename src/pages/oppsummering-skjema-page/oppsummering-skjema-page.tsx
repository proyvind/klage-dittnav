import React from 'react';
import PersonligeOpplysningerSummary from '../../components/summary/personlige-opplysninger-summary';
import VedtakSummary from '../../components/summary/vedtak-summary';
import { ContentContainer, MarginContainer, CenteredContainer } from '../../styled-components/main-styled-components';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import VedleggSummary from '../../components/summary/vedlegg-summary';
import { Bruker } from '../../types/bruker';
import { Vedtak } from '../../types/vedtak';
import { useSelector } from 'react-redux';
import { Store } from '../../store/reducer';

interface Props {
    person: Bruker;
    vedtak: Vedtak;
    begrunnelse: string;
    vedlegg: File[];
    submitForm(): any;
}

const OppsummeringSkjemaPage = (props: Props) => {
    const { activeVedlegg } = useSelector((state: Store) => state);

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
            {/* TODO: Should come from activeKlage */}
            <Normaltekst>{props.begrunnelse ?? ''}</Normaltekst>
            <MarginContainer>
                <Systemtittel>Vedlagte dokumenter</Systemtittel>
            </MarginContainer>
            <VedleggSummary vedlegg={activeVedlegg} />
            <MarginContainer>
                <CenteredContainer>
                    <Hovedknapp onClick={() => props.submitForm()}>Send inn</Hovedknapp>
                </CenteredContainer>
            </MarginContainer>
        </ContentContainer>
    );
};

export default OppsummeringSkjemaPage;
