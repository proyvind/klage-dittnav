import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { RadioPanelGruppe, Textarea } from 'nav-frontend-skjema';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Normaltekst, Undertittel, Element, Undertekst } from 'nav-frontend-typografi';
import AlertStripe, { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Datepicker } from 'nav-datovelger';
import NavFrontendSpinner from 'nav-frontend-spinner';
import {
    CenteredContainer,
    FlexCenteredContainer,
    InlineMargin48Container,
    Margin40Container,
    Margin48TopContainer,
    MarginContainer,
    MarginTopContainer,
    NoMarginParagraph,
    NoMarginUndertekst
} from '../../styled-components/main-styled-components';
import { getAttachmentErrorMessage, Attachment, AttachmentFile, toFiles } from '../../types/attachment';
import AttachmentPreview from './attachment-preview';
import { updateKlage, addAttachment, deleteAttachment } from '../../services/base-service';
import { DateOption, datoValg } from './datoValg';
import { dateToVedtakText, UpdateKlage, parseVedtakText, Klage, KlageStatus } from '../../types/klage';
import { ApiError, CustomError } from '../../utils/fetch/errors';
import { ISODateTime } from '../../utils/date';
import { AppContext } from '../app-context/app-context';
import styled from 'styled-components/macro';

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

    const [loading, setIsLoading] = useState<boolean>(false);

    const vedtak = klage?.vedtak ?? null;
    const klageFritekst = klage?.fritekst ?? '';
    const klageVedlegg = klage?.vedlegg ?? [];

    const { dateOption, isoDate } = useMemo(() => parseVedtakText(vedtak), [vedtak]);

    const [fritekst, setFritekst] = useState<string>(klageFritekst);
    const [chosenISODate, setISODate] = useState<string | null>(isoDate);
    const [chosenDateOption, setDateOption] = useState<DateOption>(dateOption);
    const [attachments, setAttachments] = useState<Attachment[]>(klageVedlegg);

    useEffect(() => {
        if (klage.status !== KlageStatus.DRAFT) {
            history.replace(`/${klage.id}/oppsummering`);
        }
    }, [klage, history]);

    useEffect(() => window.scrollTo(0, 0), []);

    const [error, setError] = useState<string | null>(null);
    const [attachmentsLoading, setAttachmentsLoading] = useState<boolean>(false);
    const [attachmentError, setAttachmentError] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState<boolean>(false);

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

    const createKlageUpdate = (klage: Klage): UpdateKlage => ({
        id: klage.id,
        tema: klage.tema,
        ytelse: klage.ytelse,
        saksnummer: klage.saksnummer,
        fritekst,
        vedtak: dateToVedtakText(chosenDateOption, chosenISODate)
    });

    const submitKlage = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        setSubmitted(true);
        if (!validForm()) {
            return;
        }
        setIsLoading(true);

        const klageUpdate = createKlageUpdate(klage);

        setKlage({
            ...klage,
            ...klageUpdate,
            vedlegg: attachments
        });

        await updateKlage(klageUpdate)
            .then(() => history.push(`/${klage.id}/oppsummering`))
            .catch((error: CustomError) => {
                setError(error.message);
                setIsLoading(false);
            });
    };

    const validForm = () => validBegrunnelse() && validDatoalternativ();
    const validBegrunnelse = () => fritekst.length !== 0;
    const validDatoalternativ = () => chosenDateOption !== DateOption.INGEN;

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
                <MarginContainer>
                    <AlertStripeFeil>
                        {getFeilmeldinger().map((feilmelding, index) => (
                            <NoMarginParagraph key={index}>{feilmelding}</NoMarginParagraph>
                        ))}
                    </AlertStripeFeil>
                </MarginContainer>
            )}

            <MarginContainer>
                <Undertittel>Hvilket vedtak gjelder klagen?</Undertittel>
            </MarginContainer>
            <MarginContainer>
                <RadioPanelGruppe
                    name="datoValg"
                    radios={datoValg}
                    checked={chosenDateOption}
                    onChange={(_, value: DateOption) => setDateOption(value)}
                    feil={submitted && !validDatoalternativ() && 'Du må velge hvilket vedtak du ønsker å klage på.'}
                />
            </MarginContainer>
            {chosenDateOption === DateOption.TIDLIGERE_VEDTAK && (
                <MarginContainer>
                    <Element>Vedtaksdato (valgfritt)</Element>
                    <Datepicker
                        onChange={(dateISO, isValid) => setISODate(isValid ? dateISO : null)}
                        value={chosenISODate ?? undefined}
                        showYearSelector
                        limitations={{
                            maxDate: new Date().toISOString().substring(0, 10)
                        }}
                    />
                </MarginContainer>
            )}
            <InlineMargin48Container>
                <Undertittel>Begrunn klagen din</Undertittel>
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
            </InlineMargin48Container>

            <MarginContainer>
                <Undertittel>Vedlegg ({attachments.length})</Undertittel>
                <AttachmentPreview attachments={toFiles(attachments)} deleteAttachment={deleteAttachmentHandler} />
                {showAttachmentLoader(attachmentsLoading)}
                <InlineMarginTopContainer>
                    <Normaltekst>
                        Om du har ny eller oppdatert informasjon du ønsker å legge ved kan det lastes opp her.
                    </Normaltekst>
                    <MarginTopContainer>
                        <Normaltekst>
                            All informasjon du har sendt inn tidligere i denne saken vil følge med klagen din og trenger
                            ikke lastes opp på nytt.
                        </Normaltekst>
                    </MarginTopContainer>
                </InlineMarginTopContainer>
                {getAttachmentError(attachmentError)}
            </MarginContainer>

            <Margin40Container>
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
            </Margin40Container>

            <MarginContainer>
                <AlertStripe type="info" form="inline">
                    <NoMarginUndertekst>
                        Filtyper som støttes: <b>PNG</b>, <b>JPEG</b>, og <b>PDF</b>.
                    </NoMarginUndertekst>
                    <Undertekst>
                        Filstørrelsen kan ikke være større enn 8 MB, og total størrelse av alle vedlegg kan ikke være
                        større enn 32 MB.
                    </Undertekst>
                </AlertStripe>
            </MarginContainer>

            {getError(error)}

            <InlineMargin48TopContainer>
                <FlexCenteredContainer>
                    <Hovedknapp className="row-element" onClick={submitKlage} disabled={loading} spinner={loading}>
                        Gå videre
                    </Hovedknapp>
                </FlexCenteredContainer>
            </InlineMargin48TopContainer>
        </>
    );
};

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
                <NoMarginParagraph>{error}</NoMarginParagraph>
            </AlertStripeFeil>
        </MarginContainer>
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

const getUploadAttachmentErrorMessage = ({ name, type, size }: File, reason: string = 'Ukjent årsak.') =>
    `Kunne ikke laste opp vedlegg "${name}" med type "${type}" på ${size} bytes. ${reason}`;

const getDeleteAttachmentErrorMessage = ({ name, id }: AttachmentFile, reason: string = 'Ukjent årsak.') =>
    `Kunne ikke slette vedlegg "${name}" med ID "${id}". ${reason}`;

function notNull<T>(v: T | null): v is T {
    return v !== null;
}

const INPUTDESCRIPTION =
    'Skriv inn hvilke endringer du ønsker i vedtaket, og beskriv hva du begrunner klagen med. Legg ved dokumenter som du mener kan være til støtte for klagen.';

const InlineMargin48TopContainer = styled(Margin48TopContainer)`
    display: inline-block;
    position: initial;
`;

const InlineMarginTopContainer = styled(MarginTopContainer)`
    display: inline-block;
    position: initial;
`;

export default Begrunnelse;
