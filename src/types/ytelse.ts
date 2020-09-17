export const temaUrlMap = {
    FOR: 'https://www.nav.no/soknader/nb/person/familie/foreldrepenger-og-engangsstonad/NAV%2014-05.09/klage/brev'
};

export const getUrlToPaperForm = (tema: string) => {
    return temaUrlMap[tema] ?? 'https://www.nav.no/soknader/nb/klage/person';
};
