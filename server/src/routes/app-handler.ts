import { Handler } from 'express';
import { getLogger } from '@app/logger';
import { indexFile } from './index-file';

const log = getLogger('static-routes');

export const appHandler: Handler = (req, res) => {
  try {
    res.setHeader('Content-Type', 'text/html');
    res.send(indexFile.indexFile);
  } catch (error) {
    log.error({ error, msg: 'HTTP 500 - Failed to send index file' });
    res.status(500).send('<h1>500 Internal Server Error</h1>');
  }
};
