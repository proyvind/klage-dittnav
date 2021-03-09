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
import { finalizeKlage } from '../../../api/api';
import Clipboard from '../../../icons/ClipboardIcon';
import { ColoredLine } from '../../../styled-components/colored-line';
import { toFiles } from '../../../klage/attachment';
import { PageIdentifier } from '../../../logging/amplitude';
import { useLogPageView } from '../../../logging/use-log-page-view';
import { AppContext } from '../../../app-context/app-context';
import { device } from '../../../styled-components/media-queries';
import { Klage, KlageStatus } from '../../../klage/klage';
import { ExternalLink } from '../../../link/link';
import { CenteredPageSubTitle } from '../../../styled-components/page-title';
import { CustomMarginRow } from '../../../styled-components/row';
import InformationPointBox from './information-point-box';
import { KlageUndertittel } from '../../../styled-components/undertittel';
import Checkboxes from './checkboxes';
import { KlageAlertStripeFeil } from '../../../styled-components/alert';
import FullmaktInfo from '../begrunnelse/fullmakt-info';
import { useLanguage } from '../../../language/use-language';
import { useTranslation } from '../../../language/use-translation';

interface Props {
    klage: Klage;
}

const Oppsummering = ({ klage }: Props) => {
    const history = useHistory();
    const language = useLanguage();
    const { klageskjema } = useTranslation();
    const { setKlage, user } = useContext(AppContext);
    const [loading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useLogPageView(PageIdentifier.KLAGESKJEMA_OPPSUMMERING);

    const submitForm = async (event: React.MouseEvent) => {
        event.preventDefault();

        if (klage.status === KlageStatus.DONE) {
            history.push(`/${language}/${klage.id}/kvittering`);
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
            history.push(`/${language}/${klage.id}/kvittering`);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError(klageskjema.summary.submit_error);
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
            <CenteredPageSubTitle tag={'h2'}>{klageskjema.summary.title}</CenteredPageSubTitle>
            <FullmaktInfo />
            <Frame>
                <Ekspanderbartpanel
                    border={false}
                    apen={false}
                    className="form-expand"
                    tittel={<BlackUndertittel>{klageskjema.summary.sections.person.title}</BlackUndertittel>}
                >
                    <Text>{klageskjema.summary.sections.person.info_from}</Text>
                    <PersonligeOpplysningerSummary user={user} />
                    <CustomMarginRow margin={8}>
                        <ExternalLink showIcon href={klageskjema.summary.sections.person.change_name_address.url}>
                            {klageskjema.summary.sections.person.change_name_address.text}
                        </ExternalLink>
                    </CustomMarginRow>
                    <CustomMarginRow margin={0}>
                        <ExternalLink showIcon href={klageskjema.summary.sections.person.change_phone.url}>
                            {klageskjema.summary.sections.person.change_phone.text}
                        </ExternalLink>
                    </CustomMarginRow>
                </Ekspanderbartpanel>
                <ColoredLine color="#a2a1a1" />
                <Ekspanderbartpanel
                    border={false}
                    apen={false}
                    tittel={<BlackUndertittel>{klageskjema.summary.sections.case.title}</BlackUndertittel>}
                >
                    <VedtakSummary klage={klage} />
                </Ekspanderbartpanel>
                <ColoredLine color="#a2a1a1" />

                <SummarySection>
                    <KlageUndertittel>{klageskjema.summary.sections.begrunnelse.title}</KlageUndertittel>
                    <InformationPointBox header={klageskjema.summary.sections.begrunnelse.what}>
                        <Checkboxes checkboxesSelected={klage.checkboxesSelected} />
                    </InformationPointBox>
                    <InformationPointBox header={klageskjema.summary.sections.begrunnelse.why}>
                        <WrapNormaltekst>{klage.fritekst}</WrapNormaltekst>
                    </InformationPointBox>
                </SummarySection>

                <SummarySection>
                    <Undertittel>
                        {klageskjema.summary.sections.begrunnelse.documents} ({klage.vedlegg.length})
                    </Undertittel>
                    <AttachmentSummary klage={klage} attachments={toFiles(klage.vedlegg)} />
                </SummarySection>
            </Frame>

            {getError(error)}

            <CenteredContainer>
                <RowKnapp
                    onClick={() => history.push(`/${language}/${klage.id}/begrunnelse`)}
                    disabled={klage.status !== KlageStatus.DRAFT}
                >
                    {klageskjema.summary.back}
                </RowKnapp>
                <Hovedknapp onClick={submitForm} disabled={loading} spinner={loading}>
                    {klageskjema.summary.next(klage.status)}
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
