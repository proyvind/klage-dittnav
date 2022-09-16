import promBundle from 'express-prom-bundle';
import { NAIS_NAMESPACE } from '../config/env';
import { VERSION } from '../config/version';
import { normalizePath } from './normalize-path';

const labels: Record<string, string> = {
  app_version: VERSION.substring(0, 7),
  namespace: NAIS_NAMESPACE,
};

export const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,
  includeUp: true,
  excludeRoutes: ['/metrics', '/isAlive', '/isReady'],
  normalizePath: ({ originalUrl }) => normalizePath(originalUrl),
  customLabels: labels,
  promClient: { collectDefaultMetrics: { labels } },
  formatStatusCode: ({ statusCode }) => {
    if (statusCode >= 200 && statusCode < 400) {
      return '2xx (3xx)';
    }

    return statusCode;
  },
});
