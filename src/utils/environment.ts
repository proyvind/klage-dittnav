import { getJSON } from './fetch/fetch';

interface InboundEnvironment {
    readonly appUrl: string;
    readonly loginserviceUrl: string;
    readonly apiUrl: string;
}

type KlageId = string | number;

export const LOGGED_IN_PATH = '/loggedin-redirect';

export class NotInitializedError extends Error {
    constructor() {
        super('Environment was accessed before it has been initialized.');
    }
}

export class Environment {
    private initialized = false;
    private _appUrl: string | null = null;
    private _apiUrl: string | null = null;
    private _loginserviceUrl: string | null = null;

    isInitialized = () => this.initialized;

    async init() {
        if (this.initialized) {
            return this;
        }

        const { appUrl, apiUrl, loginserviceUrl } = await getJSON<InboundEnvironment>(
            '/config',
            'Fant ikke konfigurasjonsendepunktet.'
        );
        this._apiUrl = apiUrl;
        this._appUrl = appUrl;
        this._loginserviceUrl = loginserviceUrl;
        this.initialized = true;
        return this;
    }

    get apiUrl() {
        if (this.initialized && this._apiUrl !== null) {
            return this._apiUrl;
        }
        throw new NotInitializedError();
    }
    get appUrl() {
        if (this.initialized && this._appUrl !== null) {
            return this._appUrl;
        }
        throw new NotInitializedError();
    }
    get loginServiceUrl() {
        if (this.initialized && this._loginserviceUrl !== null) {
            return this._loginserviceUrl;
        }
        throw new NotInitializedError();
    }

    get loginUrl() {
        return `${this.loginServiceUrl}?redirect=${this.appUrl}${LOGGED_IN_PATH}`;
    }
    get userUrl() {
        return `${this.apiUrl}/bruker`;
    }
    get klagerUrl() {
        return `${this.apiUrl}/klager`;
    }
    klageUrl = (klageId: KlageId): string => `${this.klagerUrl}/${klageId}`;
    finalizeKlageUrl = (klageId: KlageId) => `${this.klageUrl(klageId)}/finalize`;
    klageJournalpostIdUrl = (klageId: KlageId) => `${this.klageUrl(klageId)}/journalpostid`;
    klagePdfUrl = (klageId: KlageId) => `${this.apiUrl}/klager/${klageId}/pdf`;
    attachmentsUrl = (klageId: KlageId) => `${this.apiUrl}/klager/${klageId}/vedlegg`;
    attachmentUrl = (klageId: KlageId, attachmentId: string | number) =>
        `${this.apiUrl}/klager/${klageId}/vedlegg/${attachmentId}`;
}

export const environment = new Environment();
