import React from 'react';
import PersonligeOpplysningerSummary from '../../components/summary/personlige-opplysninger-summary';
import VedtakSummary from '../../components/summary/vedtak-summary';
import { ContentContainer, MarginContainer, CenteredContainer } from '../../styled-components/main-styled-components';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import VedleggSummary from '../../components/summary/vedlegg-summary';
import { useSelector } from 'react-redux';
import { Store } from '../../store/reducer';
import { finalizeKlage } from '../../services/klageService';
import { useHistory } from 'react-router-dom';

const OppsummeringSkjemaPage = () => {
    const { activeKlage, activeVedlegg, person } = useSelector((state: Store) => state);
    const history = useHistory();

    const submitForm = (event: any) => {
        event.preventDefault();
        if (!activeKlage.id) {
            // TODO: Sett error message
            return;
        }
        finalizeKlage(activeKlage.id)
            .then(response => {
                console.log(response);
                history.push(`/kvittering`);
                // TODO: Set success message
            })
            .catch(error => {
                console.log(error);
                // TODO: Set error message
            });
    };

    return (
        <ContentContainer>
            <MarginContainer>
                <Systemtittel>Personlige opplysninger</Systemtittel>
            </MarginContainer>
            <PersonligeOpplysningerSummary person={person} />
            <MarginContainer>
                <Systemtittel>Opplysninger fra vedtaket du klager på</Systemtittel>
            </MarginContainer>
            <VedtakSummary klage={activeKlage} />
            <MarginContainer>
                <Systemtittel>Begrunnelse i din klage</Systemtittel>
            </MarginContainer>
            <Normaltekst>{activeKlage.fritekst ?? ''}</Normaltekst>
            <MarginContainer>
                <Systemtittel>Vedlagte dokumenter</Systemtittel>
            </MarginContainer>
            <VedleggSummary vedlegg={activeVedlegg} />
            <MarginContainer>
                <CenteredContainer>
                    <Hovedknapp onClick={(event: any) => submitForm(event)}>Send inn</Hovedknapp>
                </CenteredContainer>
            </MarginContainer>
        </ContentContainer>
    );
};

export default OppsummeringSkjemaPage;
