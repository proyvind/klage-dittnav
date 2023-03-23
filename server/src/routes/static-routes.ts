import { Router, static as expressStatic } from 'express';
import { frontendDistDirectoryPath } from '@app/config/config';
import { getCookie } from '@app/functions/cookies';
import { getLogger } from '@app/logger';
import { indexFile } from './index-file';

const log = getLogger('static-routes');

const router = Router();

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

  router.use(expressStatic(frontendDistDirectoryPath, { index: false }));

  router.get('*', (req, res) => {
    const decoratorLanguage = getCookie('decorator-language', req);

    if (decoratorLanguage === 'en') {
      return res.redirect(301, `/en${req.url}`);
    }

    return res.redirect(301, `/nb${req.url}`);
  });

  return router;
};
