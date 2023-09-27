import { requiredEnvString } from './env-var';
import { serverConfig } from './server-config';

const getEnvironmentVersion = <T>(local: T, test: T, development: T, production: T): T => {
  if (isDeployedToDev) {
    return development;
  }

  if (isDeployedToProd) {
    return production;
  }

  if (isTesting) {
    return test;
  }

  return local;
};

const isDeployedToDev = serverConfig.cluster === 'dev-gcp';
export const isDeployedToProd = serverConfig.cluster === 'prod-gcp';
export const isDeployed = isDeployedToDev || isDeployedToProd;
export const isTesting = requiredEnvString('NODE_ENV', 'unknown') === 'test';

export const ENVIRONMENT = getEnvironmentVersion('local', 'test', 'development', 'production');

export const DOMAIN: string = getEnvironmentVersion(
  `http://localhost:${serverConfig.port}`,
  `http://localhost:${serverConfig.port}`,
  'https://klage.intern.dev.nav.no',
  'https://klage.intern.nav.no',
);

export const NAIS_NAMESPACE = requiredEnvString('NAIS_NAMESPACE', 'none');
