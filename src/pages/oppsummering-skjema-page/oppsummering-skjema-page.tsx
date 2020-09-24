import React, { useState, useEffect } from 'react';
import PersonligeOpplysningerSummary from '../../components/summary/personlige-opplysninger-summary';
import VedtakSummary from '../../components/summary/vedtak-summary';
import {
    MarginContainer,
    FlexCenteredContainer,
    CenteredContainer,
    Margin48Container,
    MarginTopContainer,
    FlexColumnWithSpacingContainer
} from '../../styled-components/main-styled-components';
import { Normaltekst, Systemtittel, Undertittel, Undertekst } from 'nav-frontend-typografi';
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
import { logError } from '../../utils/logger/frontendLogger';

const OppsummeringSkjemaPage = (props: any) => {
    const { activeKlage, activeVedlegg, person } = useSelector((state: Store) => state);
    const [loading, setIsLoading] = useState<boolean>(false);
    const history = useHistory();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const submitForm = (event: any) => {
        event.preventDefault();
        setIsLoading(true);
        if (!activeKlage.id) {
            // TODO: Sett error message
            setIsLoading(false);
            return;
        }
        finalizeKlage(activeKlage.id)
            .then(response => {
                const finalizedDate = response.finalizedDate;
                sessionStorage.removeItem('nav.klage.klageId');
                sessionStorage.removeItem('nav.klage.tema');
                sessionStorage.removeItem('nav.klage.ytelse');
                sessionStorage.removeItem('nav.klage.saksnr');
                history.push({ pathname: `/kvittering`, state: { finalizedDate } });
                setIsLoading(false);
                // TODO: Set success message
            })
            .catch(error => {
                logError(error, 'Finalize klage failed', { klageid: activeKlage.id });
                setIsLoading(false);
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

            <div className="framed">
                <Ekspanderbartpanel
                    border={false}
                    apen={false}
                    className="form-expand"
                    tittel={<Undertittel>Person&shy;opplysninger</Undertittel>}
                >
                    <Undertekst>Hentet fra Folkeregisteret og Kontakt- og reserverasjonsregisteret.</Undertekst>
                    <MarginTopContainer>
                        <PersonligeOpplysningerSummary person={person} />
                    </MarginTopContainer>
                    <FlexColumnWithSpacingContainer>
                        <Lenke
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.skatteetaten.no/person/folkeregister/"
                        >
                            <span>Endre navn eller adresse (Folkeregisteret)</span>
                            <ExternalLink />
                        </Lenke>
                        <Lenke target="_blank" rel="noopener noreferrer" href="https://brukerprofil.difi.no/minprofil">
                            <span>Endre telefonnummer (Kontakt- og reservasjonsregisteret)</span>
                            <ExternalLink />
                        </Lenke>
                    </FlexColumnWithSpacingContainer>
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
                    <Undertittel>Vedlagte dokumenter ({activeVedlegg.length || '0'})</Undertittel>
                    <VedleggSummary klage={activeKlage} vedlegg={activeVedlegg} />
                </div>
            </div>
            <Margin48Container className="override-overlay">
                <FlexCenteredContainer>
                    <Knapp className="row-element" onClick={() => props.previous()}>
                        Tilbake
                    </Knapp>
                    <Hovedknapp
                        className="row-element"
                        onClick={(event: any) => submitForm(event)}
                        disabled={loading}
                        spinner={loading}
                    >
                        Send inn
                    </Hovedknapp>
                </FlexCenteredContainer>
            </Margin48Container>
        </>
    );
};

export default OppsummeringSkjemaPage;
