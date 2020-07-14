import React from 'react';
import PersonligeOpplysningerSummary from '../../components/summary/personlige-opplysninger-summary';
import VedtakSummary from '../../components/summary/vedtak-summary';
import {
    MarginContainer,
    FlexCenteredContainer,
    CenteredContainer,
    Margin40Container
} from '../../styled-components/main-styled-components';
import { Normaltekst, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import VedleggSummary from '../../components/summary/vedlegg-summary';
import { useSelector } from 'react-redux';
import { Store } from '../../store/reducer';
import { finalizeKlage } from '../../services/klageService';
import { useHistory } from 'react-router-dom';
import Clipboard from '../../assets/images/icons/Clipboard';
import Lenke from 'nav-frontend-lenker';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import ExternalLink from '../../assets/images/icons/ExternalLink';
import { ColoredLine } from '../../components/general/colored-line';

const OppsummeringSkjemaPage = (props: any) => {
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
        <>
            <CenteredContainer>
                <MarginContainer>
                    <Clipboard />
                </MarginContainer>
                <MarginContainer>
                    <Systemtittel>Oppsummering</Systemtittel>
                </MarginContainer>
            </CenteredContainer>

            <div className="outlined">
                <Ekspanderbartpanel
                    border={false}
                    apen={false}
                    className="form-expand"
                    tittel={
                        <Undertittel>
                            Opplysninger fra Folkeregisteret og Kontakt- og reserverasjonsregisteret
                        </Undertittel>
                    }
                >
                    <PersonligeOpplysningerSummary person={person} />
                    <div className="list-align-right">
                        <Lenke href="#">
                            <span>Endre navn eller adresse (Folkeregisteret)</span>
                            <ExternalLink />
                        </Lenke>
                        <Lenke href="#">
                            <span>Endre telefonnummer (Kontakt- og reservasjonsregisteret)</span>
                            <ExternalLink />
                        </Lenke>
                    </div>
                </Ekspanderbartpanel>
                <ColoredLine color="#a2a1a1" />
                <Ekspanderbartpanel
                    border={false}
                    apen={false}
                    className="form-expand"
                    tittel={<Undertittel>Opplysninger fra saken</Undertittel>}
                >
                    <VedtakSummary klage={activeKlage} />
                </Ekspanderbartpanel>
                <ColoredLine color="#a2a1a1" />

                <div className="simulate-expandable-box">
                    <Undertittel>Begrunnelse i din klage</Undertittel>
                    <Normaltekst className="p_wrap">{activeKlage.fritekst ?? ''}</Normaltekst>
                </div>

                <div className="simulate-expandable-box">
                    <Undertittel>Vedlagte dokumenter</Undertittel>
                    <VedleggSummary vedlegg={activeVedlegg} />
                </div>
            </div>
            <Margin40Container>
                <FlexCenteredContainer>
                    <Knapp className="row-element" onClick={() => props.previous()}>
                        Tilbake
                    </Knapp>
                    <Hovedknapp className="row-element" onClick={(event: any) => submitForm(event)}>
                        Send inn
                    </Hovedknapp>
                </FlexCenteredContainer>
            </Margin40Container>
        </>
    );
};

export default OppsummeringSkjemaPage;
