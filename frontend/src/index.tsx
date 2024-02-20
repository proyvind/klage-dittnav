import { injectDecoratorClientSide } from '@navikt/nav-dekoratoren-moduler';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { initializeObservability } from '@app/observability';
import { App } from './app/app';
import { ENVIRONMENT } from './environment/environment';

initializeObservability();

if (ENVIRONMENT.isLocal) {
  injectDecoratorClientSide({
    env: 'dev',
    params: {
      simple: true,
      chatbot: true,
      redirectToApp: false,
      logoutUrl: '/oauth2/logout',
      logoutWarning: true,
    },
  });
}

const container = document.getElementById('root');

if (container !== null) {
  const root = createRoot(container);
  root.render(<App />);
}
