import http from 'http';
import { Socket } from 'net';
import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { OBO_CLIENT_IDS, PROXIED_CLIENT_IDS } from '@app/config/config';
import { setOboToken } from '@app/functions/set-obo';
import { getLogger } from '@app/logger';

const log = getLogger('proxy');

export const setupProxy = async () => {
  const router = Router();

  OBO_CLIENT_IDS.forEach((appName) => {
    const route = `/api/${appName}`;

    router.use(route, async (req, res, next) => {
      await setOboToken(req, appName);
      next();
    });
  });

  PROXIED_CLIENT_IDS.forEach((appName) => {
    const proxy = createProxyMiddleware({
      target: `http://${appName}`,
      pathRewrite: {
        [`^/api/${appName}`]: '',
      },
      on: {
        error: (error, req, res) => {
          if (!isServerResponse(res)) {
            log.error({
              msg: 'Response is not a ServerResponse.',
              error,
              data: { appName, url: req.url, method: req.method },
            });

            return;
          }

          if (res.headersSent) {
            log.error({
              msg: 'Headers already sent.',
              error,
              data: {
                appName,
                statusCode: res.statusCode,
                url: req.url,
                method: req.method,
              },
            });

            return;
          }

          res.writeHead(500, { 'Content-Type': 'application/json' });
          const body = JSON.stringify({ error: `Failed to connect to API. Reason: ${error.message}` });
          res.end(body);
          log.error({
            msg: 'Failed to connect to API.',
            error,
            data: { appName, url: req.url, method: req.method },
          });
        },
      },
      logger: log,
      changeOrigin: true,
    });

    router.use(`/api/${appName}`, proxy);
  });

  return router;
};

const isServerResponse = (
  res: http.ServerResponse<http.IncomingMessage> | Socket,
): res is http.ServerResponse<http.IncomingMessage> =>
  'headersSent' in res &&
  typeof res.headersSent === 'boolean' &&
  'writeHead' in res &&
  typeof res.writeHead === 'function' &&
  'end' in res &&
  typeof res.end === 'function';
