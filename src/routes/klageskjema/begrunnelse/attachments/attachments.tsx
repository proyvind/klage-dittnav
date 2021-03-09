import React, { useState } from 'react';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Normaltekst, Undertekst } from 'nav-frontend-typografi';
import { Label } from 'nav-frontend-skjema';
import AttachmentPreview from './preview';
import UploadButton from './upload-button';
import { Attachment } from '../../../../klage/attachment';
import { CenteredContainer } from '../../../../styled-components/common';
import { Klage } from '../../../../klage/klage';
import { PageParagraph } from '../../../../styled-components/page-paragraph';
import { KlageAlertStripe, KlageAlertStripeFeil } from '../../../../styled-components/alert';
import { Row } from '../../../../styled-components/row';
import { useTranslation } from '../../../../language/use-translation';

interface Props {
    attachments: Attachment[];
    klage: Klage;
    setAttachments: (attachments: Attachment[]) => void;
    setIsLoadig: (loading: boolean) => void;
}

const FILE_INPUT_ID = 'file-upload-input';

const AttachmentsSection = ({ klage, attachments, setAttachments, setIsLoadig }: Props) => {
    const { klageskjema } = useTranslation();
    const [attachmentsLoading, setAttachmentsLoading] = useState<boolean>(false);
    const [attachmentError, setAttachmentError] = useState<string | null>(null);

    return (
        <Row>
            <Label htmlFor={FILE_INPUT_ID}>
                {klageskjema.begrunnelse.attachments.title} ({attachments.length})
            </Label>
            <AttachmentPreview
                attachments={attachments}
                setAttachments={setAttachments}
                setLoading={setIsLoadig}
                setError={setAttachmentError}
            />
            {showAttachmentLoader(attachmentsLoading)}
            <PageParagraph>{klageskjema.begrunnelse.attachments.description}</PageParagraph>

            <KlageAlertStripe type="info" form="inline">
                <Undertekst>{klageskjema.begrunnelse.attachments.supported_types}</Undertekst>
                <Undertekst>{klageskjema.begrunnelse.attachments.size_limit}</Undertekst>
            </KlageAlertStripe>

            {getAttachmentError(attachmentError)}

            <UploadButton
                inputId={FILE_INPUT_ID}
                attachments={attachments}
                setAttachments={setAttachments}
                setLoading={setAttachmentsLoading}
                klage={klage}
                setError={setAttachmentError}
            />
        </Row>
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
