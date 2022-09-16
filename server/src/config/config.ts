import path from 'path';
import { isDeployed } from './env';
import { requiredEnvString, requiredEnvUrl } from './env-var';

export const slack = {
  url: isDeployed ? requiredEnvUrl('SLACK_URL') : '',
  channel: '#klage-notifications',
  messagePrefix: `${requiredEnvString('NAIS_APP_NAME', 'klage-dittnav').toUpperCase()} frontend NodeJS -`,
};

export const OBO_CLIENT_IDS = ['klage-dittnav-api'];
export const PROXIED_CLIENT_IDS = ['klage-dittnav-api', 'klage-kodeverk-api'];

const cwd = process.cwd(); // This will be the server folder, as long as the paths in the NPM scripts are not changed.
const serverDirectoryPath = cwd;
const frontendDirectoryPath = path.resolve(serverDirectoryPath, '../frontend');
export const frontendDistDirectoryPath = path.resolve(frontendDirectoryPath, './dist');
