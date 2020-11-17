import { logError } from '../logging/frontendLogger';

type KlageId = string | number;

export const LOGGED_IN_PATH = '/loggedin-redirect';

export class EnvironmentInitError extends Error {
    constructor(appUrl?: string, apiUrl?: string, loginUrl?: string) {
        super(`Environment failed to initialize. App URL: "${appUrl}", API URL: "${apiUrl}", login URL: "${loginUrl}"`);
    }
}

interface Env {
    REACT_APP_URL?: string;
    REACT_APP_API_URL?: string;
    REACT_APP_LOGINSERVICE_URL?: string;
}

export class Environment {
    public appUrl: string;
    public apiUrl: string;
    public loginServiceUrl: string;

    constructor() {
        const { appUrl, apiUrl, loginUrl } = this.getEnvironment();
        this.appUrl = appUrl;
        this.apiUrl = apiUrl;
        this.loginServiceUrl = loginUrl;
    }

    private getEnvironment() {
        const realEnv = this.parseJsonEnvironment();
        if (realEnv !== null) {
            return realEnv;
        }
        const appUrl = `${window.location.protocol}//${window.location.host}`;
        const devEnv = this.ensureEnvironment(
            appUrl,
            process.env.REACT_APP_API_URL,
            process.env.REACT_APP_LOGINSERVICE_URL
        );
        if (devEnv !== null) {
            return devEnv;
        }
        throw new EnvironmentInitError(appUrl, process.env.REACT_APP_API_URL, process.env.REACT_APP_LOGINSERVICE_URL);
    }

    private parseJsonEnvironment() {
        const environmentElement = document.getElementById('environment');
        if (environmentElement === null) {
            return null;
        }
        const jsonText = environmentElement.textContent;
        if (jsonText === null || jsonText.length <= 10) {
            return null;
        }
        try {
            const json: Env = JSON.parse(jsonText);
            return this.ensureEnvironment(json.REACT_APP_URL, json.REACT_APP_API_URL, json.REACT_APP_LOGINSERVICE_URL);
        } catch (err) {
            logError(err, `Failed to parse environment JSON: ${jsonText}`);
            return null;
        }
    }

    private ensureEnvironment(appUrl?: string, apiUrl?: string, loginUrl?: string) {
        if (typeof appUrl === 'undefined' || typeof apiUrl === 'undefined' || typeof loginUrl === 'undefined') {
            return null;
        }
        return { appUrl, apiUrl, loginUrl };
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
