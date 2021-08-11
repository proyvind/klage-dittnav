import React, { useState } from 'react';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Normaltekst, Undertekst } from 'nav-frontend-typografi';
import { Label } from 'nav-frontend-skjema';
import AttachmentPreview from './preview';
import UploadButton from './upload-button';
import { Attachment } from '../../../../store/anke/attachment';
import { CenteredContainer } from '../../../../styled-components/common';
import { PageParagraph } from '../../../../styled-components/page-paragraph';
import { KlageAlertStripe, KlageAlertStripeFeil } from '../../../../styled-components/alert';
import { Row } from '../../../../styled-components/row';
import { useTranslation } from '../../../../language/use-translation';
import { Anke } from '../../../../store/anke/types/anke';

interface Props {
    attachments: Attachment[];
    anke: Anke;
    setAttachments: (attachments: Attachment[]) => void;
    setIsLoading: (loading: boolean) => void;
}

const FILE_INPUT_ID = 'file-upload-input';

const AttachmentsSection = ({ anke, attachments, setAttachments, setIsLoading }: Props) => {
    const { ankeskjema } = useTranslation();
    const [attachmentsLoading, setAttachmentsLoading] = useState<boolean>(false);
    const [attachmentError, setAttachmentError] = useState<string | null>(null);

    return (
        <Row>
            <Label htmlFor={FILE_INPUT_ID}>
                {ankeskjema.begrunnelse.attachments.title} ({attachments.length})
            </Label>
            <AttachmentPreview
                attachments={attachments}
                setAttachments={setAttachments}
                setLoading={setIsLoading}
                setError={setAttachmentError}
            />
            {showAttachmentLoader(attachmentsLoading)}
            <PageParagraph>{ankeskjema.begrunnelse.attachments.description}</PageParagraph>

            <KlageAlertStripe type="info" form="inline">
                <Undertekst>{ankeskjema.begrunnelse.attachments.supported_types}</Undertekst>
                <Undertekst>{ankeskjema.begrunnelse.attachments.size_limit}</Undertekst>
            </KlageAlertStripe>

            {getAttachmentError(attachmentError)}

            <UploadButton
                inputId={FILE_INPUT_ID}
                attachments={attachments}
                setAttachments={setAttachments}
                setLoading={setAttachmentsLoading}
                anke={anke}
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
