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
import { toFiles } from '../../types/vedlegg';
import { clearStorageContent } from '../../store/actions';

interface Props {
    previous: () => void;
}

const OppsummeringSkjemaPage = (props: Props) => {
    const { activeKlage, activeKlageSkjema, activeVedlegg, person } = useSelector((state: Store) => state);
    const [loading, setIsLoading] = useState<boolean>(false);
    const history = useHistory();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const submitForm = (event: React.MouseEvent) => {
        event.preventDefault();

        if (typeof activeKlage === 'undefined') {
            return;
        }

        setIsLoading(true);
        if (!activeKlage.id) {
            // TODO: Sett error message
            setIsLoading(false);
            return;
        }
        finalizeKlage(activeKlage.id)
            .then(response => {
                const finalizedDate = response.finalizedDate;
                clearStorageContent();
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

    if (typeof activeKlage === 'undefined') {
        return null;
    }

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
                    <VedtakSummary klage={activeKlageSkjema} />
                </Ekspanderbartpanel>
                <ColoredLine color="#a2a1a1" />

                <div className="simulate-expandable-box">
                    <Undertittel>Begrunnelse i din klage</Undertittel>
                    <Normaltekst className="p_wrap">{activeKlageSkjema.fritekst}</Normaltekst>
                </div>

                <div className="simulate-expandable-box">
                    <Undertittel>Vedlagte dokumenter ({activeVedlegg.length || '0'})</Undertittel>
                    <VedleggSummary klage={activeKlage} vedlegg={toFiles(activeVedlegg)} />
                </div>
            </div>
            <Margin48Container className="override-overlay">
                <FlexCenteredContainer>
                    <Knapp className="row-element" onClick={() => props.previous()}>
                        Tilbake
                    </Knapp>
                    <Hovedknapp className="row-element" onClick={submitForm} disabled={loading} spinner={loading}>
                        Send inn
                    </Hovedknapp>
                </FlexCenteredContainer>
            </Margin48Container>
        </>
    );
};

export default OppsummeringSkjemaPage;
