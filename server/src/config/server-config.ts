import { requiredEnvNumber, requiredEnvString } from './env-var';

export const serverConfig = {
  // should be equivalent to the URL this application is hosted on for correct CORS origin header.
  host: requiredEnvString('HOST', '0.0.0.0'),
  cluster: requiredEnvString('NAIS_CLUSTER_NAME', 'none'),
  // Port for your application.
  port: requiredEnvNumber('PORT', 8080),
};
