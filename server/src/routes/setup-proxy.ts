import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { getOnBehalfOfAccessToken } from '../auth/on-behalf-of';
import { getTokenXClient } from '../auth/token-x-client';
import { API_CLIENT_IDS } from '../config/config';
import { getLogger } from '../logger';

const log = getLogger('proxy');

export const setupProxy = async () => {
  const authClient = await getTokenXClient();
  const router = express.Router();

  API_CLIENT_IDS.forEach((appName) => {
    const route = `/api/${appName}`;

    router.use(route, async (req, res, next) => {
      const tokenXtoken = req.header('Authorization');

      if (typeof tokenXtoken === 'string') {
        try {
          const obo_access_token = await getOnBehalfOfAccessToken(authClient, tokenXtoken, appName);
          req.headers['authorization'] = `Bearer ${obo_access_token}`;
          req.headers['idporten-token'] = tokenXtoken;
        } catch (error) {
          log.warn({
            msg: `Failed to prepare request with OBO token for route ${route}`,
            error,
            data: { appName },
          });
        }
      }

      next();
    });

    router.use(
      `/api/${appName}`,
      createProxyMiddleware({
        target: `http://${appName}`,
        pathRewrite: {
          [`^/api/${appName}`]: '',
        },
        onError: (err, req, res) => {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.write(
            JSON.stringify({
              error: `Failed to connect to API. Reason: ${err.message}`,
            })
          );
          res.end();
        },
        logLevel: 'warn',
        logProvider: () => ({
          log: (msg: string) => log.info({ msg, data: { appName } }),
          info: (msg: string) => log.info({ msg, data: { appName } }),
          debug: (msg: string) => log.debug({ msg, data: { appName } }),
          warn: (msg: string) => log.warn({ msg, data: { appName } }),
          error: (msg: string) => log.error({ msg, data: { appName } }),
        }),
        changeOrigin: true,
      })
    );
  });

  return router;
};
