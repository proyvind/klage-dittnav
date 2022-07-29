import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { getOnBehalfOfAccessToken } from '../auth/on-behalf-of';
import { getTokenXClient } from '../auth/token-x-client';
import { API_CLIENT_IDS } from '../config/config';

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
          const errorMessage = error instanceof Error ? error.message : '';
          console.warn(`Failed to prepare request with OBO token. ${errorMessage}`, route);
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
            }),
          );
          res.end();
        },
        logLevel: 'warn',
        changeOrigin: true,
      }),
    );
  });

  return router;
};
