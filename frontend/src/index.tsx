import { injectDecoratorClientSide } from '@navikt/nav-dekoratoren-moduler';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app/app';
import { ENVIRONMENT, EnvString } from './environment/environment';
import { logger } from './logging/frontend-logger';

if (ENVIRONMENT.environment === EnvString.LOCAL) {
  injectDecoratorClientSide({
    env: 'dev',
    simple: true,
    chatbot: true,
    redirectToApp: false,
    logoutUrl: '/oauth2/logout',
  });
}

try {
  ReactDOM.render(<App />, document.getElementById('root'));
} catch (error) {
  if (error instanceof Error) {
    logger.error({ message: error.message, error });
  } else {
    logger.error({ message: 'Unknown error.', error });
  }
}
