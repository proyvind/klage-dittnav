const jsdom = require('jsdom');
const request = require('request');
const NodeCache = require('node-cache');
const { JSDOM } = jsdom;

const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = SECONDS_PER_MINUTE * 60;

// Refresh cache every hour
const cache = new NodeCache({
    stdTTL: SECONDS_PER_HOUR,
    checkperiod: SECONDS_PER_MINUTE
});

const baseUrl = process.env.REACT_APP_APPRES_CMS_URL;
const decoratorUrl = baseUrl + '/common-html/v4/navno?simple=true';

const getDecorator = () =>
    new Promise((resolve, reject) => {
        const decorator = cache.get('main-cache');
        if (decorator) {
            resolve(decorator);
        } else {
            request(decoratorUrl, (error, response, body) => {
                if (!error && response.statusCode >= 200 && response.statusCode < 400) {
                    const { document } = new JSDOM(body).window;
                    const prop = 'innerHTML';
                    const data = {
                        NAV_SCRIPTS: document.getElementById('scripts')[prop],
                        NAV_STYLES: document.getElementById('styles')[prop],
                        NAV_HEADING: document.getElementById('header-withmenu')[prop],
                        NAV_FOOTER: document.getElementById('footer-withmenu')[prop]
                    };
                    cache.set('main-cache', data);
                    console.log(`Creating cache`);
                    resolve(data);
                } else {
                    reject(new Error(error));
                }
            });
        }
    });

module.exports = getDecorator;
