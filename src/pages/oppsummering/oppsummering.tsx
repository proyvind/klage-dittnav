import React, { useState, useEffect, useContext } from 'react';
import PersonligeOpplysningerSummary from '../../components/summary/personlige-opplysninger-summary';
import VedtakSummary from '../../components/summary/vedtak-summary';
import {
    MarginContainer,
    FlexCenteredContainer,
    CenteredContainer,
    MarginTopContainer,
    FlexColumnWithSpacingContainer,
    NoMarginParagraph,
    WrapNormaltekst,
    device,
    InlineMargin48Container
} from '../../styled-components/main-styled-components';
import { Systemtittel, Undertittel, Undertekst } from 'nav-frontend-typografi';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import AttachmentSummary from '../../components/summary/attachment-summary';
import { finalizeKlage } from '../../services/base-service';
import { useHistory } from 'react-router-dom';
import Clipboard from '../../assets/images/icons/Clipboard';
import Lenke from 'nav-frontend-lenker';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import ExternalLink from '../../assets/images/icons/ExternalLink';
import { ColoredLine } from '../../components/general/colored-line';
import { toFiles } from '../../types/attachment';
import { PageIdentifier } from '../../utils/logger/amplitude';
import { useLogPageView } from '../../utils/logger/use-log-page-view';
import { Klage, KlageStatus } from '../../types/klage';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { AppContext } from '../../components/app-context/app-context';
import styled from 'styled-components/macro';

interface Props {
    klage: Klage;
}

const Oppsummering = ({ klage }: Props) => {
    const history = useHistory();
    const { setKlage, user } = useContext(AppContext);
    const [loading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => window.scrollTo(0, 0), []);
    useLogPageView(PageIdentifier.KLAGESKJEMA_OPPSUMMERING);

    const submitForm = async (event: React.MouseEvent) => {
        event.preventDefault();

        if (klage.status === KlageStatus.DONE) {
            history.push(`/${klage.id}/kvittering`);
            return;
        }

        setIsLoading(true);
        try {
            const { finalizedDate } = await finalizeKlage(klage.id);
            setKlage({
                ...klage,
                finalizedDate,
                status: KlageStatus.DONE
            });
            history.push(`/${klage.id}/kvittering`);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Klarte ikke sende inn klagen. Ukjent feil.');
            }
        }
        setIsLoading(false);
    };

    if (user === null) {
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

            <Frame>
                <Ekspanderbartpanel
                    border={false}
                    apen={false}
                    className="form-expand"
                    tittel={<BlackUndertittel>Person&shy;opplysninger</BlackUndertittel>}
                >
                    <Undertekst>Hentet fra Folkeregisteret og Kontakt- og reserverasjonsregisteret.</Undertekst>
                    <MarginTopContainer>
                        <PersonligeOpplysningerSummary user={user} />
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
                    tittel={<BlackUndertittel>Opplysninger fra saken</BlackUndertittel>}
                >
                    <VedtakSummary klage={klage} />
                </Ekspanderbartpanel>
                <ColoredLine color="#a2a1a1" />

                <PaddedDiv>
                    <Undertittel>Begrunnelse i din klage</Undertittel>
                    <WrapNormaltekst>{klage.fritekst}</WrapNormaltekst>
                </PaddedDiv>

                <PaddedDiv>
                    <Undertittel>Vedlagte dokumenter ({klage.vedlegg.length})</Undertittel>
                    <AttachmentSummary klage={klage} attachments={toFiles(klage.vedlegg)} />
                </PaddedDiv>
            </Frame>
            {getError(error)}
            <InlineMargin48Container>
                <FlexCenteredContainer>
                    <RowKnapp
                        onClick={() => history.push(`/${klage.id}/begrunnelse`)}
                        disabled={klage.status !== KlageStatus.DRAFT}
                    >
                        Tilbake
                    </RowKnapp>
                    <RowHovedknapp onClick={submitForm} disabled={loading} spinner={loading}>
                        {getSubmitText(klage.status)}
                    </RowHovedknapp>
                </FlexCenteredContainer>
            </InlineMargin48Container>
        </>
    );
};

const getError = (error: string | null) => {
    if (error === null) {
        return null;
    }

    return (
        <MarginContainer>
            <AlertStripeFeil>
                <NoMarginParagraph>{error}</NoMarginParagraph>
            </AlertStripeFeil>
        </MarginContainer>
    );
};

const getSubmitText = (status: KlageStatus) => (status === KlageStatus.DRAFT ? 'Send inn' : 'Se innsendt klage');

const Frame = styled.div`
    @media ${device.mobileS} {
        padding: 0px;
        padding-bottom: 100px;
        border: none;
    }
    @media ${device.tablet} {
        padding: 48px;
        padding-bottom: 150px;
        border: 1px solid #a2a1a1;
    }
`;

const BlackUndertittel = styled(Undertittel)`
    color: #000;
`;

const PaddedDiv = styled.div`
    padding: 1rem;
`;

const RowKnapp = styled(Knapp)`
    margin: 10px 5px;
`;

const RowHovedknapp = styled(Hovedknapp)`
    margin: 10px 5px;
`;
export default Oppsummering;
