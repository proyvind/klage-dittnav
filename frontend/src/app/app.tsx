import React from 'react';
import { Provider } from 'react-redux';
import { reduxStore } from '../redux/configure-store';
import { Router } from '../routes/routes';
import '@navikt/ds-css';

export const App = () => (
  <React.StrictMode>
    <Provider store={reduxStore}>
      <Router />
    </Provider>
  </React.StrictMode>
);
