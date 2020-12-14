const NodeCache = require('node-cache');
const fetch = require('node-fetch');

const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = SECONDS_PER_MINUTE * 60;

// Refresh cache every hour
const cache = new NodeCache({
    stdTTL: SECONDS_PER_HOUR,
    checkperiod: SECONDS_PER_MINUTE
});

const getTitles = async apiUrl => {
    const titles = cache.get('titles');
    if (titles) {
        return titles;
    }

    const res = await fetch(`${apiUrl}/titles`);
    if (!res.ok) {
        throw new Error(`Failed to get titles. HTTP error ${res.statusCode}.`);
    }
    const json = await res.json();
    cache.set('titles', json);
    return json;
};

module.exports = getTitles;
