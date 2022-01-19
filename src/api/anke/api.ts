import { del, getJSON, getText, postFormData, postJSON, putJSON } from '../fetch';
import { logError } from '../../logging/frontendLogger';
import { Attachment } from '../../store/anke/attachment';
import { ENVIRONMENT } from '../../environment/environment';
import {
    Anke,
    UpdateAnke,
    FinalizedAnke,
    AvailableAnke,
    NewAnke,
    AnkeInternalSaksnummer
} from '../../store/anke/types/anke';
import { TemaKey } from '../../tema/tema';

export async function getDraftAnke(
    ankeInternalSaksnummer: AnkeInternalSaksnummer | null,
    fullmaktsgiver: string | null
) {
    const url = ENVIRONMENT.draftAnkeUrl(ankeInternalSaksnummer, fullmaktsgiver);
    try {
        return await getJSON<Anke>(url, 'Ingen påbegynt anke funnet.');
    } catch {
        return null;
    }
}

export async function resumeOrCreateAnke(anke: NewAnke) {
    const url = ENVIRONMENT.ankerUrl;
    try {
        return await postJSON<NewAnke, Anke>(url, `Fant ikke endepunkt for å opprette anke`, anke);
    } catch (error) {
        if (error instanceof Error) {
            logError(error, 'Resume or create anke error.', { resource: url, anke });
        }
        throw error;
    }
}

export async function getAnke(ankeInternalSaksnummer: AnkeInternalSaksnummer) {
    const url = ENVIRONMENT.ankeUrl(ankeInternalSaksnummer);
    try {
        return await getJSON<Anke>(url, ankeNotFoundMessage(ankeInternalSaksnummer));
    } catch (error) {
        if (error instanceof Error) {
            logError(error, 'Get anke error.', { resource: url, ankeInternalSaksnummer });
        }
        throw error;
    }
}

export async function updateAnke(anke: UpdateAnke) {
    const url = ENVIRONMENT.ankeUrl(anke.ankeInternalSaksnummer);
    try {
        return await putJSON<UpdateAnke, never>(url, ankeNotFoundMessage(anke.ankeInternalSaksnummer), anke, false);
    } catch (error) {
        if (error instanceof Error) {
            logError(error, 'Update anke error.', { resource: url, anke });
        }
        throw error;
    }
}

export async function finalizeAnke(ankeInternalSaksnummer: AnkeInternalSaksnummer) {
    const url = ENVIRONMENT.finalizeAnkeUrl(ankeInternalSaksnummer);
    try {
        return await postJSON<never, FinalizedAnke>(url, ankeNotFoundMessage(ankeInternalSaksnummer));
    } catch (error) {
        if (error instanceof Error) {
            logError(error, 'Finalize anke error.', { resource: url, ankeInternalSaksnummer });
        }
        throw error;
    }
}

export async function getJournalpostId(ankeInternalSaksnummer: AnkeInternalSaksnummer) {
    const url = ENVIRONMENT.ankeJournalpostIdUrl(ankeInternalSaksnummer);
    try {
        return await getText(url, ankeNotFoundMessage(ankeInternalSaksnummer));
    } catch (error) {
        if (error instanceof Error) {
            logError(error, 'Get journalpost ID error.', { resource: url, ankeInternalSaksnummer });
        }
        throw error;
    }
}

export async function addAttachment(ankeInternalSaksnummer: AnkeInternalSaksnummer, attachment: File) {
    const url = ENVIRONMENT.ankeAttachmentsUrl(ankeInternalSaksnummer);
    try {
        const formData = new FormData();
        formData.append('vedlegg', attachment, attachment.name);
        return await postFormData<Attachment>(url, ankeNotFoundMessage(ankeInternalSaksnummer), formData);
    } catch (error) {
        if (error instanceof Error) {
            logError(error, 'Add attachment error.', { resource: url, ankeInternalSaksnummer });
        }
        throw error;
    }
}

export async function deleteAttachment(
    ankeInternalSaksnummer: AnkeInternalSaksnummer,
    attachmentId: number | string
): Promise<void> {
    const url = ENVIRONMENT.ankeAttachmentUrl(ankeInternalSaksnummer, attachmentId);
    try {
        await del(url, ankeOrAttachmentNotFoundMessage(ankeInternalSaksnummer, attachmentId));
        return;
    } catch (error) {
        if (error instanceof Error) {
            logError(error, 'Delete attachment error.', {
                resource: url,
                ankeInternalSaksnummer,
                attachmentId
            })
        }
        throw error;
    }
}

export async function getAllAvailableAnkerForUser(temaKey?: TemaKey) {
    const url = temaKey
        ? ENVIRONMENT.allAvailableAnkerByTemaForUserUrl(temaKey)
        : ENVIRONMENT.allAvailableAnkerForUserUrl();
    try {
        return await getJSON<AvailableAnke[]>(url, availableAnkerNotFoundMessage());
    } catch (error) {
        if (error instanceof Error) {
            logError(error, 'Get anke error.', { resource: url });
        }
        throw error;
    }
}

const ankeNotFoundMessage = (ankeInternalSaksnummer: AnkeInternalSaksnummer) =>
    `Fant ikke anke med ID "${ankeInternalSaksnummer}".`;
const ankeOrAttachmentNotFoundMessage = (ankeInternalSaksnummer: AnkeInternalSaksnummer, vedleggId: string | number) =>
    `Fant ikke anke med ID "${ankeInternalSaksnummer}" eller vedlegg med ID "${vedleggId}".`;

const availableAnkerNotFoundMessage = () => 'Fant ikke noen ankemuligheter';
