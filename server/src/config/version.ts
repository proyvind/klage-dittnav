import { isDeployed, isTesting } from './env';
import { requiredEnvString } from './env-var';

const getDefaultVersion = () => {
  if (isDeployed) {
    return undefined;
  }

  if (isTesting) {
    return 'test';
  }

  return 'local';
};

export const VERSION = requiredEnvString('VERSION', getDefaultVersion());
