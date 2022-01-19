import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';
import { Label } from 'nav-frontend-skjema';
import { CenteredContainer } from '../../../styled-components/common';
import { Attachment } from '../../../store/anke/attachment';
import { AppContext } from '../../../app-context/app-context';
import { NotLoggedInError } from '../../../api/errors';
import { login } from '../../../user/login';
import { LoginButton } from '../../../styled-components/login-button';
import AutosaveProgressIndicator, { AutosaveStatus } from './autosave-progress';
import { useLogPageView } from '../../../logging/use-log-page-view';
import { PageIdentifier } from '../../../logging/amplitude';
import BegrunnelseText from './begrunnelse-text';
import AttachmentsSection from './attachments/attachments';
import VedtakDate from './vedtak-date';
import { KlageAlertStripeFeil } from '../../../styled-components/alert';
import { FatRow, Row } from '../../../styled-components/row';
import { useLanguage } from '../../../language/use-language';
import { useTranslation } from '../../../language/use-translation';
import { Languages } from '../../../language/language';
import { Anke, AnkeStatus, UpdateAnke } from '../../../store/anke/types/anke';
import { updateAnke } from '../../../api/anke/api';
import ankeStore from '../../../store/anke/anke-store';

interface Props {
    anke: Anke;
}

const Begrunnelse = ({ anke }: Props) => {
    const history = useHistory();
    const { setAnke } = useContext(AppContext);
    const language = useLanguage();
    useLogPageView(PageIdentifier.ANKESKJEMA_BEGRUNNElSE);
    const { ankeskjema } = useTranslation();

    const [fritekst, setFritekst] = useState<string>(anke.fritekst);
    const [attachments, setAttachments] = useState<Attachment[]>(anke.vedlegg);

    const [loading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [autosaveStatus, setAutosaveStatus] = useState<AutosaveStatus>(AutosaveStatus.NONE);

    useEffect(() => {
        if (anke.status !== AnkeStatus.DRAFT) {
            history.replace(`/${language}/anke/${anke.ankeInternalSaksnummer}/oppsummering`);
        }
    }, [anke, history, language]);

    const performAnkeUpdate = useCallback(async () => {
        const ankeUpdate = createAnkeUpdate(anke, fritekst, language);
        try {
            await updateAnke(ankeUpdate);
            setAnke({
                ...anke,
                ...ankeUpdate,
                vedlegg: attachments
            });
            ankeStore.clear();
            setAutosaveStatus(AutosaveStatus.SAVED);
            return true;
        } catch (error) {
            setAutosaveStatus(AutosaveStatus.FAILED);
            ankeStore.store(fritekst);
            if (error instanceof Error) {
                setError(error);
            }
            return false;
        }
    }, [fritekst, attachments, anke, setAnke, language]);

    useEffect(() => {
        if (anke.fritekst === fritekst) {
            setAutosaveStatus(AutosaveStatus.SAVED);
            return;
        }
        setAutosaveStatus(AutosaveStatus.SAVING);
        const timeout = setTimeout(performAnkeUpdate, 1000);
        return () => clearTimeout(timeout); // Clear existing timer every time it runs.
    }, [fritekst, anke, performAnkeUpdate]);

    const submitAnke = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        setSubmitted(true);
        if (!validForm()) {
            return;
        }
        setIsLoading(true);

        const ankeUpdated = await performAnkeUpdate();
        if (ankeUpdated) {
            history.push(`/${language}/anke/${anke.ankeInternalSaksnummer}/oppsummering`);
            return;
        }

        setIsLoading(false);
    };

    const storeAnkeAndLogIn = () => {
        ankeStore.store(fritekst);
        login();
    };

    const validBegrunnelse = () => fritekst.length !== 0;
    const validForm = validBegrunnelse;

    const getFeilmeldinger = () => {
        if (!validBegrunnelse()) {
            return [ankeskjema.begrunnelse.begrunnelse_text.begrunnelse_mangler];
        }
        return [];
    };

    return (
        <>
            {submitted && !validForm() && (
                <KlageAlertStripeFeil>
                    {getFeilmeldinger().map(feilmelding => (
                        <Normaltekst key={feilmelding}>{feilmelding}</Normaltekst>
                    ))}
                </KlageAlertStripeFeil>
            )}

            <VedtakDate title={ankeskjema.begrunnelse.vedtak_date.title} vedtakDate={anke.vedtakDate} />

            <Row>
                <Label htmlFor={'begrunnelse-text'}>{ankeskjema.begrunnelse.begrunnelse_text.title}</Label>
                <BegrunnelseText
                    id="begrunnelse-text"
                    fritekst={fritekst}
                    setFritekst={setFritekst}
                    showErrors={submitted}
                    placeholder={ankeskjema.begrunnelse.begrunnelse_text.placeholder}
                    description={ankeskjema.begrunnelse.begrunnelse_text.description}
                    errorText={ankeskjema.begrunnelse.begrunnelse_text.error_empty}
                />
                <AutosaveProgressIndicator autosaveStatus={autosaveStatus} />
            </Row>

            <FatRow>
                <AttachmentsSection
                    attachments={attachments}
                    setAttachments={setAttachments}
                    setIsLoading={setIsLoading}
                    anke={anke}
                />
            </FatRow>

            <Errors error={error} logIn={storeAnkeAndLogIn} />

            <CenteredContainer>
                <Hovedknapp onClick={submitAnke} disabled={loading} spinner={loading}>
                    {ankeskjema.begrunnelse.next_button}
                </Hovedknapp>
            </CenteredContainer>
        </>
    );
};

const createAnkeUpdate = (anke: Anke, fritekst: string, language: Languages): UpdateAnke => ({
    ankeInternalSaksnummer: anke.ankeInternalSaksnummer,
    tema: anke.tema,
    language,
    fritekst
});

interface ErrorProps {
    error: Error | null;
    logIn: () => void;
}

const Errors = ({ error, logIn }: ErrorProps) => {
    const { ankeskjema } = useTranslation();
    if (error === null) {
        return null;
    }

    if (error instanceof NotLoggedInError) {
        return (
            <KlageAlertStripeFeil>
                <Normaltekst>{ankeskjema.common.logged_out.text}</Normaltekst>
                <LoginButton onClick={logIn}>{ankeskjema.common.logged_out.log_in}</LoginButton>
            </KlageAlertStripeFeil>
        );
    }

    return (
        <KlageAlertStripeFeil>
            <Normaltekst>{error.message}</Normaltekst>
        </KlageAlertStripeFeil>
    );
};

export default Begrunnelse;
