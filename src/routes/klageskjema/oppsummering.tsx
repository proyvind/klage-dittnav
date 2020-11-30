import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Undertittel, Undertekst, Normaltekst } from 'nav-frontend-typografi';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import PersonligeOpplysningerSummary from './summary/personlige-opplysninger-summary';
import VedtakSummary from './summary/vedtak-summary';
import {
    MarginContainer,
    CenteredContainer,
    FlexColumnWithSpacingContainer,
    WrapNormaltekst
} from '../../styled-components/common';
import AttachmentSummary from './summary/attachment-summary';
import { finalizeKlage } from '../../api/api';
import Clipboard from '../../icons/ClipboardIcon';
import { ColoredLine } from '../../styled-components/colored-line';
import { toFiles } from '../../klage/attachment';
import { PageIdentifier } from '../../logging/amplitude';
import { useLogPageView } from '../../logging/use-log-page-view';
import { AppContext } from '../../app-context/app-context';
import { device } from '../../styled-components/media-queries';
import { Klage, KlageStatus } from '../../klage/klage';
import { ExternalLink } from '../../link/link';
import { CenteredPageSubTitle } from '../../styled-components/page-title';

interface Props {
    klage: Klage;
}

const Oppsummering = ({ klage }: Props) => {
    const history = useHistory();
    const { setKlage, user } = useContext(AppContext);
    const [loading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

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
            <Icon />
            <CenteredPageSubTitle tag={'h2'}>Oppsummering</CenteredPageSubTitle>
            <Frame>
                <Ekspanderbartpanel
                    border={false}
                    apen={false}
                    className="form-expand"
                    tittel={<BlackUndertittel>Person&shy;opplysninger</BlackUndertittel>}
                >
                    <Text>Hentet fra Folkeregisteret og Kontakt- og reserverasjonsregisteret.</Text>
                    <PersonligeOpplysningerSummary user={user} />
                    <FlexColumnWithSpacingContainer>
                        <ExternalLink showIcon href="https://www.skatteetaten.no/person/folkeregister/">
                            Endre navn eller adresse (Folkeregisteret)
                        </ExternalLink>
                        <ExternalLink showIcon href="https://brukerprofil.difi.no/minprofil">
                            Endre telefonnummer (Kontakt- og reservasjonsregisteret)
                        </ExternalLink>
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

                <SummarySection>
                    <Undertittel>Begrunnelse i din klage</Undertittel>
                    <WrapNormaltekst>{klage.fritekst}</WrapNormaltekst>
                </SummarySection>

                <SummarySection>
                    <Undertittel>Vedlagte dokumenter ({klage.vedlegg.length})</Undertittel>
                    <AttachmentSummary klage={klage} attachments={toFiles(klage.vedlegg)} />
                </SummarySection>
            </Frame>
            {getError(error)}

            <CenteredContainer>
                <RowKnapp
                    onClick={() => history.push(`/${klage.id}/begrunnelse`)}
                    disabled={klage.status !== KlageStatus.DRAFT}
                >
                    Tilbake
                </RowKnapp>
                <Hovedknapp onClick={submitForm} disabled={loading} spinner={loading}>
                    {getSubmitText(klage.status)}
                </Hovedknapp>
            </CenteredContainer>
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
                <Normaltekst>{error}</Normaltekst>
            </AlertStripeFeil>
        </MarginContainer>
    );
};

const getSubmitText = (status: KlageStatus) => (status === KlageStatus.DRAFT ? 'Send inn' : 'Se innsendt klage');

const Frame = styled.section`
    margin-bottom: 48px;
    padding: 0;
    border: none;

    @media ${device.tablet} {
        padding: 16px;
        border: 1px solid #a2a1a1;
    }
`;

const Text = styled(Undertekst)`
    && {
        margin-bottom: 16px;
    }
`;

const BlackUndertittel = styled(Undertittel)`
    && {
        color: #000;
    }
`;

const SummarySection = styled.section`
    padding: 1rem;
`;

const RowKnapp = styled(Knapp)`
    && {
        margin-right: 10px;
    }
`;

const Icon = styled(Clipboard)`
    && {
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 16px;
        width: 100px;
    }
`;

export default Oppsummering;
