import React, { useState } from 'react';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Normaltekst, Undertekst } from 'nav-frontend-typografi';
import AttachmentPreview from './preview';
import UploadButton from './upload-button';
import { Attachment } from '../../../../klage/attachment';
import { Section } from '../../../../styled-components/section';
import { KlageUndertittel } from '../../../../styled-components/undertittel';
import { CenteredContainer } from '../../../../styled-components/common';
import { Klage } from '../../../../klage/klage';
import { PageParagraph } from '../../../../styled-components/page-paragraph';
import { KlageAlertStripe, KlageAlertStripeFeil } from '../../../../styled-components/alert';

interface Props {
    attachments: Attachment[];
    klage: Klage;
    setAttachments: (attachments: Attachment[]) => void;
    setIsLoadig: (loading: boolean) => void;
}

const AttachmentsSection = ({ klage, attachments, setAttachments, setIsLoadig }: Props) => {
    const [attachmentsLoading, setAttachmentsLoading] = useState<boolean>(false);
    const [attachmentError, setAttachmentError] = useState<string | null>(null);

    return (
        <Section>
            <KlageUndertittel>Vedlegg ({attachments.length})</KlageUndertittel>
            <AttachmentPreview
                attachments={attachments}
                setAttachments={setAttachments}
                setLoading={setIsLoadig}
                setError={setAttachmentError}
            />
            {showAttachmentLoader(attachmentsLoading)}
            <PageParagraph>Har du informasjon du ønsker å legge ved, laster du det opp her.</PageParagraph>
            {getAttachmentError(attachmentError)}

            <UploadButton
                attachments={attachments}
                setAttachments={setAttachments}
                setLoading={setAttachmentsLoading}
                klage={klage}
                setError={setAttachmentError}
            />

            <KlageAlertStripe type="info" form="inline">
                <Undertekst>
                    Filtyper som støttes: <b>PNG</b>, <b>JPEG</b>, og <b>PDF</b>.
                </Undertekst>
                <Undertekst>
                    Filstørrelsen kan ikke være større enn 8 MB, og total størrelse av alle vedlegg kan ikke være større
                    enn 32 MB.
                </Undertekst>
            </KlageAlertStripe>
        </Section>
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
        <KlageAlertStripeFeil>
            <Normaltekst>{error}</Normaltekst>
        </KlageAlertStripeFeil>
    );
};

export default AttachmentsSection;
