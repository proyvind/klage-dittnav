import { del, getJSON, getText, postFormData, postJSON, putJSON } from './fetch';
import { logError } from '../logging/frontendLogger';
import { User } from '../user/user';
import { Attachment } from '../klage/attachment';
import { ENVIRONMENT } from '../environment/environment';
import { NewKlage, Klage, UpdateKlage, FinalizedKlage } from '../klage/klage';
import { TemaKey } from '../tema/tema';
import { foedselsnrFormat } from '../routes/klageskjema/summary/text-formatting';
import { TITLES } from '../language/titles';

export async function getUser() {
    const url = ENVIRONMENT.userUrl;
    try {
        return await getJSON<User>(url, 'Fant ikke endepunkt for å hente bruker.');
    } catch (error) {
        logError(error, 'Get user error.', { resource: url });
        throw error;
    }
}

export async function getDraftKlage(
    temaKey: TemaKey,
    titleKey: string | null,
    ytelse: string | null,
    internalSaksnummer: string | null,
    fullmaktsgiver: string | null
) {
    const url = ENVIRONMENT.draftKlageUrl(temaKey, titleKey, ytelse, internalSaksnummer, fullmaktsgiver);
    try {
        return await getJSON<Klage>(url, 'Ingen påbegynt klage funnet.');
    } catch {
        return null;
    }
}

export async function hasFullmaktFor(tema: TemaKey, fnr: string) {
    const url = ENVIRONMENT.hasFullmaktForUrl(tema, fnr);
    try {
        const ffnr = foedselsnrFormat(fnr);
        return await getJSON<User>(
            url,
            `Du har ikke fullmakt for person med personnummer ${ffnr} for området ${TITLES.getTemaTitle(tema)}.`
        );
    } catch (error) {
        logError(error, 'Get fullmakt user error.', { resource: url });
        throw error;
    }
}

export async function getFullmaktsgiver(tema: string, fnr: string) {
    const url = ENVIRONMENT.hasFullmaktForUrl(tema, fnr);
    try {
        return await getJSON<User>(url, `Finner ikke fullmaktsgiver med personnummer ${foedselsnrFormat('' + fnr)}`);
    } catch (error) {
        logError(error, 'Get fullmaktsgiver user error.', { resource: url });
        throw error;
    }
}

export async function createKlage(klage: NewKlage) {
    const url = ENVIRONMENT.klagerUrl;
    try {
        return await postJSON<NewKlage, Klage>(url, 'Fant ikke endepunkt for å opprette klage.', klage);
    } catch (error) {
        logError(error, 'Create klage error.', { resource: url, klage });
        throw error;
    }
}

export async function getKlage(klageId: string | number) {
    const url = ENVIRONMENT.klageUrl(klageId);
    try {
        return await getJSON<Klage>(url, klageNotFoundMessage(klageId));
    } catch (error) {
        logError(error, 'Get klage error.', { resource: url, klageId });
        throw error;
    }
}

export async function updateKlage(klage: UpdateKlage) {
    const url = ENVIRONMENT.klageUrl(klage.id);
    try {
        return await putJSON<UpdateKlage, never>(url, klageNotFoundMessage(klage.id), klage, false);
    } catch (error) {
        logError(error, 'Update klage error.', { resource: url, klageId: klage.id, klage });
        throw error;
    }
}

export async function finalizeKlage(klageId: string | number) {
    const url = ENVIRONMENT.finalizeKlageUrl(klageId);
    try {
        return await postJSON<never, FinalizedKlage>(url, klageNotFoundMessage(klageId));
    } catch (error) {
        logError(error, 'Finalize klage error.', { resource: url, klageId });
        throw error;
    }
}

export async function getJournalpostId(klageId: string | number) {
    const url = ENVIRONMENT.klageJournalpostIdUrl(klageId);
    try {
        return await getText(url, klageNotFoundMessage(klageId));
    } catch (error) {
        logError(error, 'Get journalpost ID error.', { resource: url, klageId });
        throw error;
    }
}

export async function addAttachment(klageId: string | number, attachment: File) {
    const url = ENVIRONMENT.attachmentsUrl(klageId);
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
    const url = ENVIRONMENT.attachmentUrl(klageId, attachmentId);
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
