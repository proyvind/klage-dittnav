import path from 'path';
import { isDeployed } from './env';
import { requiredEnvUrl } from './env-var';

export const slack = {
  url: isDeployed ? requiredEnvUrl('SLACK_URL') : '',
  channel: '#klage-notifications',
  messagePrefix: 'KLAGE-DITTNAV frontend NodeJS - ',
};

export const API_CLIENT_IDS = ['klage-dittnav-api'];

export const cwd = process.cwd(); // This will be the server folder, as long as the paths in the NPM scripts are not changed.
export const serverDirectoryPath = cwd;
export const serverDistDirectoryPath = path.resolve(path.dirname(serverDirectoryPath), './dist');
export const frontendDirectoryPath = path.resolve(serverDirectoryPath, '../frontend');
export const frontendDistDirectoryPath = path.resolve(frontendDirectoryPath, './dist');
