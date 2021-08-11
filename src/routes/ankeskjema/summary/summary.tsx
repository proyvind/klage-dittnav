import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Undertittel, Undertekst, Normaltekst } from 'nav-frontend-typografi';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import PersonligeOpplysningerSummary from './personlige-opplysninger-summary';
import VedtakSummary from './vedtak-summary';
import { CenteredContainer, WrapNormaltekst } from '../../../styled-components/common';
import AttachmentSummary from './attachment-summary';
import Clipboard from '../../../icons/ClipboardIcon';
import { ColoredLine } from '../../../styled-components/colored-line';
import { toFiles } from '../../../store/anke/attachment';
import { PageIdentifier } from '../../../logging/amplitude';
import { useLogPageView } from '../../../logging/use-log-page-view';
import { AppContext } from '../../../app-context/app-context';
import { device } from '../../../styled-components/media-queries';
import { ExternalLink } from '../../../link/link';
import { CenteredPageSubTitle } from '../../../styled-components/page-title';
import { CustomMarginRow } from '../../../styled-components/row';
import InformationPointBox from './information-point-box';
import { KlageUndertittel } from '../../../styled-components/undertittel';
import { KlageAlertStripeFeil } from '../../../styled-components/alert';
import { useLanguage } from '../../../language/use-language';
import { useTranslation } from '../../../language/use-translation';
import { Anke, AnkeStatus } from '../../../store/anke/types/anke';
import { finalizeAnke } from '../../../api/anke/api';

interface Props {
    anke: Anke;
}

const Oppsummering = ({ anke }: Props) => {
    const history = useHistory();
    const language = useLanguage();
    const { ankeskjema } = useTranslation();
    const { setAnke, user } = useContext(AppContext);
    const [loading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useLogPageView(PageIdentifier.ANKESKJEMA_OPPSUMMERING);

    const submitForm = async (event: React.MouseEvent) => {
        event.preventDefault();

        if (anke.status === AnkeStatus.DONE) {
            history.push(`/${language}/anke/${anke.ankeInternalSaksnummer}/kvittering`);
            return;
        }

        setIsLoading(true);
        try {
            const { finalizedDate } = await finalizeAnke(anke.ankeInternalSaksnummer);
            setAnke({
                ...anke,
                finalizedDate,
                status: AnkeStatus.DONE
            });
            history.push(`/${language}/anke/${anke.ankeInternalSaksnummer}/kvittering`);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError(ankeskjema.summary.submit_error);
            }
            setIsLoading(false);
        }
    };

    if (user === null) {
        return null;
    }

    return (
        <>
            <Icon />
            <CenteredPageSubTitle tag={'h2'}>{ankeskjema.summary.title}</CenteredPageSubTitle>
            <Frame>
                <Ekspanderbartpanel
                    border={false}
                    apen={false}
                    className="form-expand"
                    tittel={<BlackUndertittel>{ankeskjema.summary.sections.person.title}</BlackUndertittel>}
                >
                    <Text>{ankeskjema.summary.sections.person.info_from}</Text>
                    <PersonligeOpplysningerSummary user={user} />
                    <CustomMarginRow margin={8}>
                        <ExternalLink href={ankeskjema.summary.sections.person.change_name_address.url}>
                            {ankeskjema.summary.sections.person.change_name_address.text}
                        </ExternalLink>
                    </CustomMarginRow>
                    <CustomMarginRow margin={0}>
                        <ExternalLink href={ankeskjema.summary.sections.person.change_phone.url}>
                            {ankeskjema.summary.sections.person.change_phone.text}
                        </ExternalLink>
                    </CustomMarginRow>
                </Ekspanderbartpanel>
                <ColoredLine color="#a2a1a1" />
                <Ekspanderbartpanel
                    border={false}
                    apen={false}
                    tittel={<BlackUndertittel>{ankeskjema.summary.sections.case.title}</BlackUndertittel>}
                >
                    <VedtakSummary anke={anke} />
                </Ekspanderbartpanel>
                <ColoredLine color="#a2a1a1" />

                <SummarySection>
                    <KlageUndertittel>{ankeskjema.summary.sections.begrunnelse.title}</KlageUndertittel>
                    <InformationPointBox header={ankeskjema.summary.sections.begrunnelse.why}>
                        <WrapNormaltekst>{anke.fritekst}</WrapNormaltekst>
                    </InformationPointBox>
                </SummarySection>

                <SummarySection>
                    <Undertittel>
                        {ankeskjema.summary.sections.begrunnelse.documents} ({anke.vedlegg.length})
                    </Undertittel>
                    <AttachmentSummary anke={anke} attachments={toFiles(anke.vedlegg)} />
                </SummarySection>
            </Frame>

            {getError(error)}

            <CenteredContainer>
                <RowKnapp
                    onClick={() => history.push(`/${language}/anke/${anke.ankeInternalSaksnummer}/begrunnelse`)}
                    disabled={anke.status !== AnkeStatus.DRAFT}
                >
                    {ankeskjema.summary.back}
                </RowKnapp>
                <Hovedknapp onClick={submitForm} disabled={loading} spinner={loading}>
                    {ankeskjema.summary.next(anke.status)}
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
        <KlageAlertStripeFeil>
            <Normaltekst>{error}</Normaltekst>
        </KlageAlertStripeFeil>
    );
};

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
