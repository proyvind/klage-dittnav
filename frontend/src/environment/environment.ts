export const LOGGED_IN_PATH = '/loggedin-redirect';

export enum EnvString {
  PROD = 'production',
  DEV = 'development',
  LOCAL = 'local',
}

interface EnvironmentVariables {
  readonly apiUrl: string;
  readonly environment: EnvString;
  readonly version: string;
  readonly isProduction: boolean;
  readonly isDevelopment: boolean;
  readonly isLocal: boolean;
  readonly isDeployed: boolean;
}

class Environment implements EnvironmentVariables {
  public readonly apiUrl: string;
  public readonly environment: EnvString;
  public readonly version: string;
  public readonly isProduction: boolean;
  public readonly isDevelopment: boolean;
  public readonly isLocal: boolean;
  public readonly isDeployed: boolean;

  constructor() {
    const { apiUrl, environment, version, isProduction, isDevelopment, isLocal, isDeployed } = this.init();
    this.apiUrl = apiUrl;
    this.environment = environment;
    this.version = version;
    this.isProduction = isProduction;
    this.isDevelopment = isDevelopment;
    this.isLocal = isLocal;
    this.isDeployed = isDeployed;
  }

  private init(): EnvironmentVariables {
    const environment = this.getEnvironment();
    const version = this.getVersion();
    const isProduction = environment === EnvString.PROD;
    const isDevelopment = environment === EnvString.DEV;
    const isLocal = environment === EnvString.LOCAL;
    const isDeployed = !isLocal;

    return {
      apiUrl: '/api',
      environment,
      version,
      isProduction,
      isDevelopment,
      isLocal,
      isDeployed,
    };
  }

  private getEnvironment(): EnvString {
    const env = document.documentElement.getAttribute('data-environment');

    if (env === EnvString.PROD || env === EnvString.DEV || env === EnvString.LOCAL) {
      return env;
    }

    return EnvString.LOCAL;
  }

  private getVersion(): string {
    const version = document.documentElement.getAttribute('data-version');

    if (version === null || version === '{{VERSION}}') {
      return EnvString.LOCAL;
    }

    return version;
  }
}

export const ENVIRONMENT = new Environment();
