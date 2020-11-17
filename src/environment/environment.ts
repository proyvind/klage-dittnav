type KlageId = string | number;

export const LOGGED_IN_PATH = '/loggedin-redirect';

export class EnvironmentInitError extends Error {
    constructor(appUrl: string | undefined, apiUrl: string | undefined, loginUrl: string | undefined) {
        super(`Environment failed to initialize. App URL: "${appUrl}", API URL: "${apiUrl}", login URL: "${loginUrl}"`);
    }
}

export class Environment {
    public appUrl: string;
    public apiUrl: string;
    public loginServiceUrl: string;

    constructor() {
        if (
            typeof process.env.REACT_APP_URL === 'undefined' ||
            typeof process.env.REACT_APP_API_URL === 'undefined' ||
            typeof process.env.REACT_APP_LOGINSERVICE_URL === 'undefined'
        ) {
            throw new EnvironmentInitError(
                process.env.REACT_APP_URL,
                process.env.REACT_APP_API_URL,
                process.env.REACT_APP_LOGINSERVICE_URL
            );
        }
        this.appUrl = process.env.REACT_APP_URL;
        this.apiUrl = process.env.REACT_APP_API_URL;
        this.loginServiceUrl = process.env.REACT_APP_LOGINSERVICE_URL;
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
