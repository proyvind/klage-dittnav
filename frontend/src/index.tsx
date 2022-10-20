import { injectDecoratorClientSide } from '@navikt/nav-dekoratoren-moduler';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import React from 'react';
import ReactDOM from 'react-dom';
import { createRoutesFromChildren, matchRoutes, useLocation, useNavigationType } from 'react-router-dom';
import { App } from './app/app';
import { ENVIRONMENT } from './environment/environment';

if (ENVIRONMENT.isLocal) {
  injectDecoratorClientSide({
    env: 'dev',
    simple: true,
    chatbot: true,
    redirectToApp: false,
    logoutUrl: '/oauth2/logout',
  });
}

Sentry.init({
  dsn: 'https://ec59cb6bad7f4a30be759b6cdfccc968@sentry.gc.nav.no/140',
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.reactRouterV6Instrumentation(
        React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes
      ),
    }),
  ],
  tracesSampleRate: 1.0,
  environment: ENVIRONMENT.environment,
  release: ENVIRONMENT.version,
  normalizeDepth: 10,
  enabled: ENVIRONMENT.isDeployed,
});

try {
  ReactDOM.render(<App />, document.getElementById('root'));
} catch (error) {
  Sentry.captureException(error);
}
