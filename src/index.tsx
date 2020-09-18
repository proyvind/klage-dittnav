import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { footer, header, scripts, styles } from './mock-api/get/decorator';
//import { setupMock } from './mock-api/setup-mock';
import configureStore from './store/configureStore';
import Environment, { fetchEnv, isLocalhost } from './utils/environment';
import { BrowserRouter } from 'react-router-dom';
import { logError, logInfo } from './utils/logger/frontendLogger';

//const mockEnabled = process.env.NODE_ENV === 'development' || process.env.REACT_APP_MOCK_DATA === 'true';
const store = configureStore();

const init = async () => {
    if (process.env.NODE_ENV === 'development') {
        // Mock decorator
        document.body.innerHTML = document.body.innerHTML.replace('{{{NAV_HEADING}}}', header);
        document.body.innerHTML = document.body.innerHTML.replace('{{{NAV_FOOTER}}}', footer);
        document.body.innerHTML = document.body.innerHTML.replace('{{{NAV_STYLES}}}', styles);
        document.body.innerHTML = document.body.innerHTML.replace('{{{NAV_SCRIPTS}}}', scripts);

        // Execute client.js
        let script = document.createElement('script');
        script.src = 'https://www.nav.no/dekoratoren/client.js';
        document.body.appendChild(script);
    }
    // If not i develop mode, but still want to run mock
    //if (mockEnabled) {
    //    setupMock();
    //}

    if (isLocalhost && process.env.NODE_ENV === 'development') {
        logInfo('Local environment.');
        Environment.setEnv({
            appUrl: process.env.REACT_APP_URL!,
            loginserviceUrl: process.env.REACT_APP_LOGINSERVICE_URL!,
            apiUrl: process.env.REACT_APP_API_URL!
        });
    } else {
        try {
            const env = await fetchEnv();
            Environment.setEnv(env);
        } catch (e) {
            logError(e);
        }
    }

    ReactDOM.render(
        <React.StrictMode>
            <Provider store={store}>
                <BrowserRouter>
                    <div id="app" className="app">
                        <App />
                    </div>
                </BrowserRouter>
            </Provider>
        </React.StrictMode>,
        document.getElementById('root')
    );
};
init();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
