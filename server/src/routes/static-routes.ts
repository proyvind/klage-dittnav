import express from 'express';
import { frontendDistDirectoryPath } from '../config/config';
import { getCookie } from '../functions/cookies';
import { getLogger } from '../logger';
import { indexFile } from './index-file';

const log = getLogger('static-routes');

const router = express.Router();

export const setupStaticRoutes = () => {
  router.get(['/nb*', '/en*'], async (req, res) => {
    res.setHeader('Content-Type', 'text/html');

    try {
      res.contentType('text/html');
      res.send(indexFile.indexFile);
    } catch (error) {
      log.error({ error, msg: 'HTTP 500 - Failed to send index file' });
      res.status(500).send('<h1>500 Internal Server Error</h1>');
    }
  });

  router.use(express.static(frontendDistDirectoryPath, { index: false }));

  router.get('*', (req, res) => {
    const decoratorLanguage = getCookie('decorator-language', req);

    if (decoratorLanguage === 'en') {
      return res.redirect(301, `/en${req.url}`);
    }

    return res.redirect(301, `/nb${req.url}`);
  });

  return router;
};
