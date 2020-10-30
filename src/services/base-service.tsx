import { FinalizedKlage, NewKlage, Klage, UpdateKlage } from '../types/klage';
import { User } from '../types/user';
import { Attachment } from '../types/attachment';
import { del, getJSON, getText, postFormData, postJSON, putJSON } from '../utils/fetch/fetch';
import { logError } from '../utils/logger/frontendLogger';
import { environment } from '../utils/environment';

export async function getUser() {
    const url = environment.userUrl;
    try {
        return await getJSON<User>(url, 'Fant ikke endepunkt for å hente bruker.');
    } catch (error) {
        logError(error, 'Get user error.', { resource: url });
        throw error;
    }
}

export async function createKlage(klage: NewKlage) {
    const url = environment.klagerUrl;
    try {
        return await postJSON<NewKlage, Klage>(url, 'Fant ikke endepunkt for å opprette klage.', klage);
    } catch (error) {
        logError(error, 'Create klage error.', { resource: url, klage });
        throw error;
    }
}

export async function getKlage(klageId: string | number) {
    const url = environment.klageUrl(klageId);
    try {
        return await getJSON<Klage>(url, klageNotFoundMessage(klageId));
    } catch (error) {
        logError(error, 'Get klage error.', { resource: url, klageId });
        throw error;
    }
}

export async function updateKlage(klage: UpdateKlage) {
    const url = environment.klageUrl(klage.id);
    try {
        return await putJSON<UpdateKlage, never>(url, klageNotFoundMessage(klage.id), klage, false);
    } catch (error) {
        logError(error, 'Update klage error.', { resource: url, klageId: klage.id, klage });
        throw error;
    }
}

export async function finalizeKlage(klageId: string | number) {
    const url = environment.finalizeKlageUrl(klageId);
    try {
        return await postJSON<never, FinalizedKlage>(url, klageNotFoundMessage(klageId));
    } catch (error) {
        logError(error, 'Finalize klage error.', { resource: url, klageId });
        throw error;
    }
}

export async function getJournalpostId(klageId: string | number) {
    const url = environment.klageJournalpostIdUrl(klageId);
    try {
        return await getText(url, klageNotFoundMessage(klageId));
    } catch (error) {
        logError(error, 'Get journalpost ID error.', { resource: url, klageId });
        throw error;
    }
}

export async function addAttachment(klageId: string | number, attachment: File) {
    const url = environment.attachmentsUrl(klageId);
    try {
        const formData = new FormData();
        formData.append('vedlegg', attachment, attachment.name);
        return await postFormData<Attachment>(url, klageNotFoundMessage(klageId), formData);
    } catch (error) {
        logError(error, 'Add attachment error.', { resource: url, klageId });
        throw error;
    }
}

export async function deleteAttachment(klageId: string | number, attachmentId: number | string): Promise<void> {
    const url = environment.attachmentUrl(klageId, attachmentId);
    try {
        await del(url, klageOrAttachmentNotFoundMessage(klageId, attachmentId));
        return;
    } catch (error) {
        logError(error, 'Delete attachment error.', { resource: url, klageId, attachmentId });
        throw error;
    }
}

const klageNotFoundMessage = (klageId: string | number) => `Fant ikke klage med ID "${klageId}".`;
const klageOrAttachmentNotFoundMessage = (klageId: string | number, vedleggId: string | number) =>
    `Fant ikke klage med ID "${klageId}" eller vedlegg med ID "${vedleggId}".`;
