import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';
import { Label } from 'nav-frontend-skjema';
import { updateKlage } from '../../../api/api';
import { CenteredContainer } from '../../../styled-components/common';
import { Attachment } from '../../../klage/attachment';
import { AppContext } from '../../../app-context/app-context';
import { ISODate } from '../../../date/date';
import { Klage, KlageStatus, Language, Reason, UpdateKlage } from '../../../klage/klage';
import { NotLoggedInError } from '../../../api/errors';
import klageStore from '../../../klage/klage-store';
import { login } from '../../../user/login';
import { LoginButton } from '../../../styled-components/login-button';
import AutosaveProgressIndicator, { AutosaveStatus } from './autosave-progress';
import { useLogPageView } from '../../../logging/use-log-page-view';
import { PageIdentifier } from '../../../logging/amplitude';
import Reasons from './reasons';
import BegrunnelseText from './begrunnelse-text';
import AttachmentsSection from './attachments/attachments';
import VedtakDate from './vedtak-date';
import { KlageAlertStripeFeil } from '../../../styled-components/alert';
import Saksnummer from './saksnummer';
import { Row } from '../../../styled-components/row';
import FullmaktInfo from './fullmakt-info';

interface Props {
    klage: Klage;
}

const Begrunnelse = ({ klage }: Props) => {
    const history = useHistory();
    const { setKlage } = useContext(AppContext);
    useLogPageView(PageIdentifier.KLAGESKJEMA_BEGRUNNElSE);

    const [reasons, setReasons] = useState<Reason[]>(klage.checkboxesSelected);
    const [vedtakDate, setVedtakDate] = useState<string | null>(klage.vedtakDate);
    const [userSaksnummer, setUserSaksnummer] = useState<string | null>(klage.userSaksnummer);
    const [fritekst, setFritekst] = useState<string>(klage.fritekst);
    const [attachments, setAttachments] = useState<Attachment[]>(klage.vedlegg);

    const [loading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [autosaveStatus, setAutosaveStatus] = useState<AutosaveStatus>(AutosaveStatus.NONE);

    useEffect(() => {
        if (klage.status !== KlageStatus.DRAFT) {
            history.replace(`/${klage.id}/oppsummering`);
        }
    }, [klage, history]);

    const performKlageUpdate = useCallback(async () => {
        const klageUpdate = createKlageUpdate(klage, reasons, fritekst, userSaksnummer, vedtakDate);
        try {
            await updateKlage(klageUpdate);
            setKlage({
                ...klage,
                ...klageUpdate,
                vedlegg: attachments
            });
            klageStore.clear();
            setAutosaveStatus(AutosaveStatus.SAVED);
            return true;
        } catch (error) {
            setAutosaveStatus(AutosaveStatus.FAILED);
            klageStore.store(fritekst, reasons, vedtakDate, userSaksnummer);
            setError(error);
            return false;
        }
    }, [fritekst, userSaksnummer, vedtakDate, reasons, attachments, klage, setKlage]);

    useEffect(() => {
        if (
            klage.vedtakDate === vedtakDate &&
            klage.checkboxesSelected === reasons &&
            klage.userSaksnummer === userSaksnummer &&
            klage.fritekst === fritekst
        ) {
            setAutosaveStatus(AutosaveStatus.SAVED);
            return;
        }
        setAutosaveStatus(AutosaveStatus.SAVING);
        const timeout = setTimeout(performKlageUpdate, 1000);
        return () => clearTimeout(timeout); // Clear existing timer every time it runs.
    }, [fritekst, vedtakDate, reasons, userSaksnummer, klage, performKlageUpdate]);

    const submitKlage = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        setSubmitted(true);
        if (!validForm()) {
            return;
        }
        setIsLoading(true);

        const klageUpdated = await performKlageUpdate();
        if (klageUpdated) {
            history.push(`/${klage.id}/oppsummering`);
            return;
        }

        setIsLoading(false);
    };

    const storeKlageAndLogIn = () => {
        klageStore.store(fritekst, reasons, vedtakDate, userSaksnummer);
        login();
    };

    const validBegrunnelse = () => fritekst.length !== 0;
    const validForm = validBegrunnelse;

    const getFeilmeldinger = () => {
        if (!validBegrunnelse()) {
            return ['Du må skrive en begrunnelse før du går videre.'];
        }
        return [];
    };

    return (
        <>
            {submitted && !validForm() && (
                <KlageAlertStripeFeil>
                    {getFeilmeldinger().map((feilmelding, index) => (
                        <Normaltekst key={index}>{feilmelding}</Normaltekst>
                    ))}
                </KlageAlertStripeFeil>
            )}

            <FullmaktInfo />
            <Reasons checkedReasons={reasons} setCheckedReasons={setReasons} />
            <VedtakDate vedtakDate={vedtakDate} setVedtakDate={setVedtakDate} />
            {!klage.internalSaksnummer && <Saksnummer saksnummer={userSaksnummer} setSaksnummer={setUserSaksnummer} />}

            <Row>
                <Label htmlFor={'begrunnelse-text'}>Hvorfor er du uenig?</Label>
                <BegrunnelseText
                    id="begrunnelse-text"
                    fritekst={fritekst}
                    setFritekst={setFritekst}
                    showErrors={submitted}
                />
                <AutosaveProgressIndicator autosaveStatus={autosaveStatus} />
            </Row>

            <AttachmentsSection
                attachments={attachments}
                setAttachments={setAttachments}
                setIsLoadig={setIsLoading}
                klage={klage}
            />

            {getError(error, storeKlageAndLogIn)}

            <CenteredContainer>
                <Hovedknapp onClick={submitKlage} disabled={loading} spinner={loading}>
                    Gå videre
                </Hovedknapp>
            </CenteredContainer>
        </>
    );
};

const createKlageUpdate = (
    klage: Klage,
    checkboxesSelected: Reason[],
    fritekst: string,
    userSaksnummer: string | null,
    vedtakDate: ISODate | null
): UpdateKlage => ({
    id: klage.id,
    tema: klage.tema,
    ytelse: klage.ytelse,
    fullmaktsgiver: klage.fullmaktsgiver,
    checkboxesSelected,
    userSaksnummer,
    internalSaksnummer: klage.internalSaksnummer,
    fritekst,
    vedtakDate,
    language: klage.language ?? Language.nb // temp fix
});

const getError = (error: Error | null, logIn: () => void) => {
    if (error === null) {
        return null;
    }

    if (error instanceof NotLoggedInError) {
        return (
            <KlageAlertStripeFeil>
                <Normaltekst>Du har blitt logget ut. For å fortsette trenger du bare å logge inn igjen.</Normaltekst>
                <LoginButton onClick={logIn}>Logg inn</LoginButton>
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
