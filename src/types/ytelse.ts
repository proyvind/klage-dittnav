export const validYtelser = ['foreldrepenger', 'engangsstonad', 'svangerskapspenger'];

export const defaultYtelse = 'foreldrepenger';

export const ytelseUrlMap = {
    foreldrepenger:
        'https://www.nav.no/soknader/nb/person/familie/foreldrepenger-og-engangsstonad/NAV%2014-05.09/klage/brev',
    engangsstonad:
        'https://www.nav.no/soknader/nb/person/familie/foreldrepenger-og-engangsstonad/NAV%2014-05.07/klage/brev',
    svangerskapspenger:
        'https://www.nav.no/soknader/nb/person/familie/foreldrepenger-og-engangsstonad/NAV%2014-04.10/klage/brev'
};

export const getUrlToPaperForm = (ytelse: string) => {
    return ytelseUrlMap[ytelse] ?? 'https://www.nav.no/soknader/nb/klage/person';
};
