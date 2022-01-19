import queryString from 'query-string';
import { logError } from '../logging/frontendLogger';
import { AnkeInternalSaksnummer } from '../store/anke/types/anke';
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

interface EnvironmentVariables {
    appUrl: string;
    apiUrl: string;
    loginServiceUrl: string;
    environment: EnvString;
}

export class Environment implements EnvironmentVariables {
    public appUrl: string;
    public apiUrl: string;
    public loginServiceUrl: string;
    public environment: EnvString;

    constructor() {
        const { apiUrl, appUrl, loginServiceUrl, environment } = this.init();
        this.apiUrl = apiUrl;
        this.appUrl = appUrl;
        this.loginServiceUrl = loginServiceUrl;
        this.environment = environment;
    }

    private init(): EnvironmentVariables {
        const environmentElement = document.getElementById('environment');
        if (environmentElement === null) {
            return this.getDevServerEnvironment();
        }

        const environment = this.getEnvironment(environmentElement);
        const jsonText = environmentElement.textContent;
        const variables = this.parseJsonEnvironment(jsonText);
        if (variables === null) {
            if (environment === EnvString.LOCAL) {
                return this.getDevServerEnvironment();
            }
            throw new EnvironmentInitError(environment, jsonText);
        }

        if (environment === EnvString.LOCAL) {
            variables.REACT_APP_URL = `${window.location.protocol}//${window.location.host}`;
        }

        if (
            typeof variables.REACT_APP_URL !== 'string' ||
            typeof variables.REACT_APP_API_URL !== 'string' ||
            typeof variables.REACT_APP_LOGINSERVICE_URL !== 'string'
        ) {
            throw new EnvironmentInitError(environment, jsonText);
        }
        return {
            appUrl: variables.REACT_APP_URL,
            apiUrl: variables.REACT_APP_API_URL,
            loginServiceUrl: variables.REACT_APP_LOGINSERVICE_URL,
            environment: environment
        };
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
            if (err instanceof Error) {
                logError(err, `Failed to parse environment JSON: ${jsonText}`);
            }
            return null;
        }
    }

    private getDevServerEnvironment(): EnvironmentVariables {
        if (
            typeof process.env.REACT_APP_API_URL !== 'string' ||
            typeof process.env.REACT_APP_LOGINSERVICE_URL !== 'string'
        ) {
            throw new EnvironmentInitError();
        }
        return {
            appUrl: `${window.location.protocol}//${window.location.host}`,
            apiUrl: process.env.REACT_APP_API_URL,
            loginServiceUrl: process.env.REACT_APP_LOGINSERVICE_URL,
            environment: EnvString.LOCAL
        };
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
        titleKey: string | null,
        ytelse: string | null,
        internalSaksnummer: string | null,
        fullmaktsgiver: string | null
    ) => {
        const query = queryString.stringify(
            {
                tema: temaKey,
                titleKey,
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
    klagePdfUrl = (klageId: KlageId) => `${this.klageUrl(klageId)}/pdf`;
    klageAttachmentsUrl = (klageId: KlageId) => `${this.klageUrl(klageId)}/vedlegg`;
    klageAttachmentUrl = (klageId: KlageId, attachmentId: string | number) =>
        `${this.klageUrl(klageId)}/vedlegg/${attachmentId}`;
    hasFullmaktForUrl = (tema: string, fnr: string) => `${this.apiUrl}/fullmaktsgiver/${tema}/${fnr}`;
    fullmaktsgiverUrl = (tema: string, fnr: string) => `${this.apiUrl}/bruker/${tema}/${fnr}`;

    get ankerUrl() {
        return `${this.apiUrl}/anker`;
    }

    ankeUrl = (ankeInternalSaksnummer: AnkeInternalSaksnummer): string => `${this.ankerUrl}/${ankeInternalSaksnummer}`;

    draftAnkeUrl = (ankeInternalSaksnummer: AnkeInternalSaksnummer | null, fullmaktsgiver: string | null) => {
        const query = queryString.stringify(
            {
                ankeInternalSaksnummer,
                fullmaktsgiver
            },
            {
                skipNull: true,
                skipEmptyString: true,
                sort: false,
                encode: true
            }
        );
        return `${this.ankerUrl}/draft?${query}`;
    };

    finalizeAnkeUrl = (ankeInternalSaksnummer: AnkeInternalSaksnummer) =>
        `${this.ankeUrl(ankeInternalSaksnummer)}/finalize`;
    ankeJournalpostIdUrl = (ankeInternalSaksnummer: AnkeInternalSaksnummer) =>
        `${this.ankeUrl(ankeInternalSaksnummer)}/journalpostid`;
    ankePdfUrl = (ankeInternalSaksnummer: AnkeInternalSaksnummer) => `${this.ankeUrl(ankeInternalSaksnummer)}/pdf`;
    ankeAttachmentsUrl = (ankeInternalSaksnummer: AnkeInternalSaksnummer) =>
        `${this.ankeUrl(ankeInternalSaksnummer)}/vedlegg`;
    ankeAttachmentUrl = (ankeInternalSaksnummer: AnkeInternalSaksnummer, attachmentId: string | number) =>
        `${this.ankeUrl(ankeInternalSaksnummer)}/vedlegg/${attachmentId}`;
    allAvailableAnkerForUserUrl = () => `${this.ankerUrl}/available`;
    allAvailableAnkerByTemaForUserUrl = (temaKey: TemaKey) => `${this.ankerUrl}/available?tema=${temaKey}`;
}

export const ENVIRONMENT = new Environment();
