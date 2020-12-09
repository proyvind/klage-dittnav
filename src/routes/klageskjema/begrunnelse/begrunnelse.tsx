import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import { RadioPanelGruppe, Textarea } from 'nav-frontend-skjema';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Normaltekst, Undertittel, Element, Undertekst } from 'nav-frontend-typografi';
import AlertStripe, { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Datepicker } from 'nav-datovelger';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { CenteredContainer, MarginContainer } from '../../../styled-components/common';
import { getAttachmentErrorMessage, Attachment, AttachmentFile, toFiles } from '../../../klage/attachment';
import AttachmentPreview from './attachment-preview';
import { updateKlage, addAttachment, deleteAttachment } from '../../../api/api';
import { datoValg } from './date-option';
import { AppContext } from '../../../app-context/app-context';
import { ISODate, ISODateTime } from '../../../date/date';
import { Klage, KlageStatus, UpdateKlage, VedtakType } from '../../../klage/klage';
import { ApiError, NotLoggedInError } from '../../../api/errors';
import klageStore from '../../../klage/klage-store';
import { login } from '../../../user/login';
import { LoginButton } from '../../../styled-components/login-button';
import AutosaveProgressIndicator, { AutosaveStatus } from './autosave-progress';
import { useLogPageView } from '../../../logging/use-log-page-view';
import { PageIdentifier } from '../../../logging/amplitude';
import { Row, SlimRow } from '../../../styled-components/row';
import { Section } from '../../../styled-components/section';

interface UploadError {
    timestamp: ISODateTime;
    status: number;
    error: string;
    message: string;
    path: string;
}

interface Props {
    klage: Klage;
}

const Begrunnelse = ({ klage }: Props) => {
    const history = useHistory();
    const { setKlage } = useContext(AppContext);
    useLogPageView(PageIdentifier.KLAGESKJEMA_BEGRUNNElSE);

    const [loading, setIsLoading] = useState<boolean>(false);
    const [fritekst, setFritekst] = useState<string>(klage.fritekst);
    const [vedtakDate, setVedtakDate] = useState<string | null>(klage.vedtakDate);
    const [vedtakType, setVedtakType] = useState<VedtakType | null>(klage.vedtakType);
    const [attachments, setAttachments] = useState<Attachment[]>(klage.vedlegg);
    const [error, setError] = useState<Error | null>(null);
    const [attachmentsLoading, setAttachmentsLoading] = useState<boolean>(false);
    const [attachmentError, setAttachmentError] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [autosaveStatus, setAutosaveStatus] = useState<AutosaveStatus>(AutosaveStatus.NONE);

    useEffect(() => {
        if (klage.status !== KlageStatus.DRAFT) {
            history.replace(`/${klage.id}/oppsummering`);
        }
    }, [klage, history]);

    const performKlageUpdate = useCallback(async () => {
        const klageUpdate = createKlageUpdate(klage, fritekst, vedtakType, vedtakDate);
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
            klageStore.store(fritekst, vedtakType, vedtakDate);
            setError(error);
            return false;
        }
    }, [fritekst, vedtakDate, vedtakType, attachments, klage, setKlage]);

    useEffect(() => {
        if (klage.vedtakType === vedtakType && klage.vedtakDate === vedtakDate && klage.fritekst === fritekst) {
            setAutosaveStatus(AutosaveStatus.SAVED);
            return;
        }
        setAutosaveStatus(AutosaveStatus.SAVING);
        const timeout = setTimeout(performKlageUpdate, 1000);
        return () => clearTimeout(timeout); // Clear existing timer every time it runs.
    }, [fritekst, vedtakDate, vedtakType, klage, performKlageUpdate]);

    const fileInput = useRef<HTMLInputElement>(null);

    const handleAttachmentClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        fileInput.current?.click();
    };

    const uploadAttachment = async (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        const files = event.target.files;
        if (files === null || files.length === 0) {
            return;
        }

        setAttachmentsLoading(true);

        const uploads = Array.from(files).map(async file => {
            try {
                return await addAttachment(klage.id, file);
            } catch (err) {
                if (err instanceof ApiError) {
                    const errorBody: UploadError = await err.response.json();
                    const errorMessage = getAttachmentErrorMessage(errorBody.message);
                    setAttachmentError(getUploadAttachmentErrorMessage(file, errorMessage));
                } else if (err instanceof Error) {
                    setAttachmentError(getUploadAttachmentErrorMessage(file, err.message));
                } else {
                    setAttachmentError(getUploadAttachmentErrorMessage(file));
                }
                return null;
            }
        });

        await Promise.all(uploads).then(addedAttachments => {
            const addedAttachmentList = addedAttachments.filter(notNull);
            setAttachments(attachments.concat(addedAttachmentList));
            setAttachmentsLoading(false);
        });
    };

    const deleteAttachmentHandler = async (attachmentFile: AttachmentFile) => {
        setAttachmentsLoading(true);
        try {
            await deleteAttachment(attachmentFile.klageId, attachmentFile.id);
            setAttachments(attachments.filter(({ id }) => id.toString() !== attachmentFile.id));
            setAttachmentsLoading(false);
        } catch (err) {
            if (err instanceof Error) {
                setAttachmentError(getDeleteAttachmentErrorMessage(attachmentFile, err.message));
            } else {
                setAttachmentError(getDeleteAttachmentErrorMessage(attachmentFile));
            }
            setAttachmentsLoading(false);
        }
    };

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
        klageStore.store(fritekst, vedtakType, vedtakDate);
        login();
    };

    const validForm = () => validBegrunnelse() && validDatoalternativ();
    const validBegrunnelse = () => fritekst.length !== 0;
    const validDatoalternativ = () => vedtakType !== null;

    const getFeilmeldinger = () => {
        const feilmeldinger: string[] = [];
        if (!validDatoalternativ()) {
            feilmeldinger.push('Du må velge hvilket vedtak du ønsker å klage på før du går videre.');
        }
        if (!validBegrunnelse()) {
            feilmeldinger.push('Du må skrive en begrunnelse før du går videre.');
        }
        return feilmeldinger;
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

            <Section>
                <KlageUndertittel>Hva er du uenig i?</KlageUndertittel>
                <SlimRow>
                    <RadioPanelGruppe
                        name="datoValg"
                        radios={datoValg}
                        checked={vedtakType ?? undefined}
                        onChange={(_, value: VedtakType) => setVedtakType(value)}
                        feil={submitted && !validDatoalternativ() && 'Du må velge hvilket vedtak du ønsker å klage på.'}
                    />
                </SlimRow>
                {vedtakType === VedtakType.EARLIER && (
                    <SlimRow>
                        <Element>Vedtaksdato (valgfri)</Element>
                        <Datepicker
                            onChange={(dateISO, isValid) => setVedtakDate(isValid ? dateISO : null)}
                            value={vedtakDate ?? undefined}
                            showYearSelector
                            limitations={{
                                maxDate: new Date().toISOString().substring(0, 10)
                            }}
                        />
                    </SlimRow>
                )}
            </Section>
            <Section>
                <KlageUndertittel>Hvorfor er du uenig?</KlageUndertittel>
                <Textarea
                    name="begrunnelse"
                    value={fritekst}
                    description={INPUTDESCRIPTION}
                    placeholder="Skriv inn din begrunnelse her."
                    maxLength={0}
                    onChange={e => setFritekst(e.target.value)}
                    style={{
                        minHeight: '180px'
                    }}
                    feil={submitted && !validBegrunnelse() && 'Du må skrive en begrunnelse før du går videre.'}
                />
                <AutosaveProgressIndicator autosaveStatus={autosaveStatus} />
            </Section>

            <Section>
                <KlageUndertittel>Vedlegg ({attachments.length})</KlageUndertittel>
                <AttachmentPreview attachments={toFiles(attachments)} deleteAttachment={deleteAttachmentHandler} />
                {showAttachmentLoader(attachmentsLoading)}
                <Normaltekst>Har du informasjon du ønsker å legge ved, laster du det opp her.</Normaltekst>
                {getAttachmentError(attachmentError)}
            </Section>

            <Row>
                <Knapp onClick={handleAttachmentClick}>Last opp nytt vedlegg</Knapp>
                <input
                    type="file"
                    multiple
                    accept="image/png, image/jpeg, image/jpg, .pdf"
                    ref={fileInput}
                    onChange={e => {
                        uploadAttachment(e);
                        e.currentTarget.value = '';
                    }}
                    style={{ display: 'none' }}
                />
            </Row>

            <Row>
                <AlertStripe type="info" form="inline">
                    <Undertekst>
                        Filtyper som støttes: <b>PNG</b>, <b>JPEG</b>, og <b>PDF</b>.
                    </Undertekst>
                    <Undertekst>
                        Filstørrelsen kan ikke være større enn 8 MB, og total størrelse av alle vedlegg kan ikke være
                        større enn 32 MB.
                    </Undertekst>
                </AlertStripe>
            </Row>

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
    fritekst: string,
    vedtakType: VedtakType | null,
    vedtakDate: ISODate | null
): UpdateKlage => ({
    id: klage.id,
    tema: klage.tema,
    ytelse: klage.ytelse,
    saksnummer: klage.saksnummer,
    fritekst,
    vedtakType,
    vedtakDate
});

const showAttachmentLoader = (loading: boolean) => {
    if (!loading) {
        return null;
    }
    return (
        <CenteredContainer>
            <NavFrontendSpinner type={'XL'} />
        </CenteredContainer>
    );
};

const getAttachmentError = (error: string | null) => {
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

const getError = (error: Error | null, logIn: () => void) => {
    if (error === null) {
        return null;
    }

    if (error instanceof NotLoggedInError) {
        return (
            <MarginContainer>
                <AlertStripeFeil>
                    <Normaltekst>
                        Du har blitt logget ut. For å fortsette trenger du bare å logge inn igjen.
                    </Normaltekst>
                    <LoginButton onClick={logIn}>Logg inn</LoginButton>
                </AlertStripeFeil>
            </MarginContainer>
        );
    }

    return (
        <MarginContainer>
            <AlertStripeFeil>
                <Normaltekst>{error.message}</Normaltekst>
            </AlertStripeFeil>
        </MarginContainer>
    );
};

const getUploadAttachmentErrorMessage = ({ name, type, size }: File, reason: string = 'Ukjent årsak.') =>
    `Kunne ikke laste opp vedlegg "${name}" med type "${type}" på ${size} bytes. ${reason}`;

const getDeleteAttachmentErrorMessage = ({ name, id }: AttachmentFile, reason: string = 'Ukjent årsak.') =>
    `Kunne ikke slette vedlegg "${name}" med ID "${id}". ${reason}`;

function notNull<T>(v: T | null): v is T {
    return v !== null;
}

const INPUTDESCRIPTION =
    'Forklar med dine egne ord hva som gjør at du er uenig og hva du ønsker endret. Legg ved dokumenter som kan vise NAV hvorfor du er uenig.';

const KlageAlertStripeFeil = styled(AlertStripeFeil)`
    && {
        margin-bottom: 16px;
    }
`;

const KlageUndertittel = styled(Undertittel)`
    && {
        margin-bottom: 16px;
    }
`;

export default Begrunnelse;
