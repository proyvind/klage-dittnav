export const LOGGED_IN_PATH = '/loggedin-redirect';

export enum EnvString {
  PROD = 'production',
  DEV = 'development',
  LOCAL = 'local',
}

interface EnvironmentVariables {
  apiUrl: string;
  environment: EnvString;
  version: string;
}

class Environment implements EnvironmentVariables {
  public apiUrl: string;
  public environment: EnvString;
  public version: string;

  constructor() {
    const { apiUrl, environment, version } = this.init();
    this.apiUrl = apiUrl;
    this.environment = environment;
    this.version = version;
  }

  private init(): EnvironmentVariables {
    const environment = this.getEnvironment();
    const version = this.getVersion();

    return {
      apiUrl: '/api',
      environment,
      version,
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
