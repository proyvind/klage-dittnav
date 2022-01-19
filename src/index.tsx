import React from 'react';
import ReactDOM from 'react-dom';
import App from './routes/routes';
import { logError } from './logging/frontendLogger';
import './index.css';

try {
    ReactDOM.render(<App />, document.getElementById('root'));
} catch (e) {
    if (e instanceof Error) {
        logError(e);
    }
}
