import React, { useState, useEffect, Dispatch } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
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
import { ActionTypes, clearStorageContent } from '../../store/actions';
import { PageIdentifier } from '../../utils/logger/amplitude';
import { useLogPageView } from '../../utils/logger/use-log-page-view';

interface Props {
    previous: () => void;
}

const OppsummeringSkjemaPage = (props: Props) => {
    const { klage, vedlegg, person } = useSelector((state: Store) => state);
    const [loading, setIsLoading] = useState<boolean>(false);
    const history = useHistory();
    const dispatch: Dispatch<ActionTypes> = useDispatch();

    useEffect(() => window.scrollTo(0, 0), []);
    useLogPageView(PageIdentifier.KLAGESKJEMA_OPPSUMMERING);

    const submitForm = (event: React.MouseEvent) => {
        event.preventDefault();

        if (klage === null) {
            return;
        }

        setIsLoading(true);
        finalizeKlage(klage.id)
            .then(response => {
                dispatch({ type: 'SET_FINALIZED_DATE', value: response.finalizedDate });
                clearStorageContent();
                history.push({ pathname: '/kvittering' });
                setIsLoading(false);
            })
            .catch(error => {
                logError(error, 'Finalize klage failed', { klageId: klage.id });
                setIsLoading(false);
            });
    };

    if (klage === null || person === null) {
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
                    <VedtakSummary klage={klage} />
                </Ekspanderbartpanel>
                <ColoredLine color="#a2a1a1" />

                <div className="simulate-expandable-box">
                    <Undertittel>Begrunnelse i din klage</Undertittel>
                    <Normaltekst className="p_wrap">{klage.fritekst}</Normaltekst>
                </div>

                <div className="simulate-expandable-box">
                    <Undertittel>Vedlagte dokumenter ({vedlegg.length || '0'})</Undertittel>
                    <VedleggSummary klage={klage} vedlegg={toFiles(vedlegg)} />
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
