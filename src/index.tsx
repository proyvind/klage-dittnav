import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { logError } from './utils/logger/frontendLogger';
import './index.css';

try {
    ReactDOM.render(<App />, document.getElementById('root'));
} catch (e) {
    logError(e);
}
