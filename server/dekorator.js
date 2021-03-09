const jsdom = require('jsdom');
const fetch = require('node-fetch');
const NodeCache = require('node-cache');
const { JSDOM } = jsdom;

const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = SECONDS_PER_MINUTE * 60;

// Refresh cache every hour
const cache = new NodeCache({
    stdTTL: SECONDS_PER_HOUR,
    checkperiod: SECONDS_PER_MINUTE
});

const DECORATOR_BASE_URL = 'https://www.nav.no/dekoratoren/';
const DECORATOR_BASE_URL_GCP = 'https://dekoratoren.dev.nav.no/common-html/v4/navno';

const getDecorator = async naisClusterName => {
    const decorator = cache.get('main-cache');
    if (decorator) {
        return decorator;
    }

    const baseUrl = naisClusterName === 'dev-gcp' ? DECORATOR_BASE_URL_GCP : DECORATOR_BASE_URL;
    const decoratorUrl = baseUrl + '?simple=true&redirectToApp=true';

    const res = await fetch(decoratorUrl);
    if (!res.ok) {
        throw new Error(`Failed to get Decorator. HTTP error ${res.statusCode}.`);
    }
    const html = await res.text();
    const { document } = new JSDOM(html).window;
    const prop = 'innerHTML';
    const data = {
        NAV_SKIPLINKS: document.getElementById('skiplinks')[prop],
        NAV_SCRIPTS: document.getElementById('scripts')[prop],
        NAV_STYLES: document.getElementById('styles')[prop],
        NAV_HEADING: document.getElementById('header-withmenu')[prop],
        NAV_FOOTER: document.getElementById('footer-withmenu')[prop],
        MEGAMENU_RESOURCES: document.getElementById('megamenu-resources')[prop]
    };
    cache.set('main-cache', data);
    return data;
};

module.exports = getDecorator;
