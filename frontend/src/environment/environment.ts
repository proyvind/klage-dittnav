export const LOGGED_IN_PATH = '/loggedin-redirect';

export enum EnvString {
  PROD = 'production',
  DEV = 'development',
  LOCAL = 'local',
}

interface EnvironmentVariables {
  apiUrl: string;
  environment: EnvString;
}

export class Environment implements EnvironmentVariables {
  public apiUrl: string;
  public environment: EnvString;

  constructor() {
    const { apiUrl, environment } = this.init();
    this.apiUrl = apiUrl;
    this.environment = environment;
  }

  private init(): EnvironmentVariables {
    const environment = this.getEnvironment();

    return {
      apiUrl: '/api',
      environment,
    };
  }

  private getEnvironment(): EnvString {
    const env = document.documentElement.getAttribute('data-environment');

    if (env === EnvString.PROD || env === EnvString.DEV || env === EnvString.LOCAL) {
      return env;
    }

    return EnvString.LOCAL;
  }
}

export const ENVIRONMENT = new Environment();
