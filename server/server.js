// Load environment
require('console-stamp')(console, '[HH:MM:ss.l]');
require('dotenv').config({ path: '../.env' });
const jsdom = require('jsdom');
const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const getDecorator = require('./dekorator');
const getTitles = require('./titles');

const buildPath = path.resolve(__dirname, '../build');
const server = express();
const { JSDOM } = jsdom;

const frontendloggerScript = () => {
    const scriptTag = `<div id="frontendlogger"><script type="application/javascript" src="${process.env.FRONTENDLOGGER_BASE_URL}/logger.js"></script></div>`;
    const { document } = new JSDOM(scriptTag).window;
    return document.getElementById('frontendlogger')['innerHTML'];
};

const securityHeadersMiddleware = (req, res, next) => {
    res.header('X-Frame-Options', 'SAMEORIGIN');
    res.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('X-XSS-Protection', '1; mode=block');
    res.header('Referrer-Policy', 'no-referrer-when-downgrade');
    next();
};

server.set('views', `${__dirname}/../build`);
server.set('view engine', 'mustache');
server.engine('html', mustacheExpress());

server.use(compression());

// Parse application/json
server.use(express.json());

// Static files
server.use('/', express.static(buildPath, { index: false }));

// Nais functions
server.get(`/internal/isReady`, (req, res) => res.sendStatus(200));

server.get(`/internal/isAlive`, (req, res) => res.sendStatus(200));

const { REACT_APP_URL, REACT_APP_API_URL, REACT_APP_LOGINSERVICE_URL, NAIS_CLUSTER_NAME } = process.env;

server.get(['/nb*', '/en*', '/loggedin-redirect'], securityHeadersMiddleware, async (req, res) => {
    try {
        const [fragments, titles] = await Promise.all([getDecorator(NAIS_CLUSTER_NAME), getTitles(REACT_APP_API_URL)]);
        res.render('index.html', {
            ...fragments,
            FRONTEND_LOGGER_SCRIPT: frontendloggerScript(),
            NAIS_CLUSTER_NAME,
            TITLES: JSON.stringify(titles),
            ENV: JSON.stringify({
                REACT_APP_URL,
                REACT_APP_API_URL,
                REACT_APP_LOGINSERVICE_URL
            })
        });
    } catch (e) {
        console.error(e);
        res.status(500).send(e.message);
    }
});

server.use(cookieParser());

server.get('*', securityHeadersMiddleware, (req, res) => {
    const decoratorLanguage = req.cookies['decorator-language'];
    if (decoratorLanguage === 'en') {
        return res.redirect(301, `/en${req.url}`);
    }

    return res.redirect(301, `/nb${req.url}`);
});

const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`App listening on: ${port}`));

process.on('SIGTERM', () => setTimeout(() => console.log('Har sovet i 30 sekunder'), 30000));
