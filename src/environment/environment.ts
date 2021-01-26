import queryString from 'query-string';
import { logError } from '../logging/frontendLogger';
import { TemaKey } from '../tema/tema';

type KlageId = string | number;

export const LOGGED_IN_PATH = '/loggedin-redirect';

export class EnvironmentInitError extends Error {
    constructor(env: string | null = null, variabels: string | null = null) {
        super(`Environment failed to initialize for environment "${env}". Variables: "${variabels}"`);
    }
}

export enum EnvString {
    PROD = 'prod-gcp',
    DEV = 'dev-gcp',
    LOCAL = 'local'
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
    public environment: EnvString;

    constructor() {
        const environmentElement = document.getElementById('environment');
        if (environmentElement === null) {
            if (
                typeof process.env.REACT_APP_API_URL !== 'string' ||
                typeof process.env.REACT_APP_LOGINSERVICE_URL !== 'string'
            ) {
                throw new EnvironmentInitError();
            }
            this.appUrl = `${window.location.protocol}//${window.location.host}`;
            this.apiUrl = process.env.REACT_APP_API_URL;
            this.loginServiceUrl = process.env.REACT_APP_LOGINSERVICE_URL;
            this.environment = EnvString.LOCAL;
            return;
        }

        const environment = this.getEnvironment(environmentElement);

        const jsonText = environmentElement.textContent;
        const variables = this.parseJsonEnvironment(jsonText);
        if (
            variables === null ||
            typeof variables.REACT_APP_URL !== 'string' ||
            typeof variables.REACT_APP_API_URL !== 'string' ||
            typeof variables.REACT_APP_LOGINSERVICE_URL !== 'string'
        ) {
            throw new EnvironmentInitError(environment, jsonText);
        }
        this.appUrl = variables.REACT_APP_URL;
        this.apiUrl = variables.REACT_APP_API_URL;
        this.loginServiceUrl = variables.REACT_APP_LOGINSERVICE_URL;
        this.environment = environment;
    }

    private getEnvironment(environmentElement: HTMLElement) {
        const env = environmentElement.getAttribute('data-environment');
        if (env === EnvString.PROD || env === EnvString.DEV || env === EnvString.LOCAL) {
            return env;
        }
        return EnvString.LOCAL;
    }

    private parseJsonEnvironment(jsonText: string | null) {
        if (jsonText === null || jsonText.length <= 10) {
            return null;
        }
        try {
            const json: Env = JSON.parse(jsonText);
            return json;
        } catch (err) {
            logError(err, `Failed to parse environment JSON: ${jsonText}`);
            return null;
        }
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
    draftKlageUrl = (
        temaKey: TemaKey,
        ytelse: string,
        internalSaksnummer: string | null,
        fullmaktsgiver: string | null
    ) => {
        const query = queryString.stringify(
            {
                tema: temaKey,
                ytelse,
                internalSaksnummer,
                fullmaktsgiver
            },
            {
                skipNull: true,
                skipEmptyString: true,
                sort: false,
                encode: true
            }
        );
        return `${this.klagerUrl}/draft?${query}`;
    };
    finalizeKlageUrl = (klageId: KlageId) => `${this.klageUrl(klageId)}/finalize`;
    klageJournalpostIdUrl = (klageId: KlageId) => `${this.klageUrl(klageId)}/journalpostid`;
    klagePdfUrl = (klageId: KlageId) => `${this.apiUrl}/klager/${klageId}/pdf`;
    attachmentsUrl = (klageId: KlageId) => `${this.apiUrl}/klager/${klageId}/vedlegg`;
    attachmentUrl = (klageId: KlageId, attachmentId: string | number) =>
        `${this.apiUrl}/klager/${klageId}/vedlegg/${attachmentId}`;
    hasFullmaktForUrl = (tema: string, fnr: string) => `${this.apiUrl}/fullmaktsgiver/${tema}/${fnr}`;
    fullmaktsgiverUrl = (tema: string, fnr: string) => `${this.apiUrl}/bruker/${tema}/${fnr}`;
}

export const environment = new Environment();
