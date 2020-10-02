import { TemaKey } from './tema';

export const TEMA_URL_MAP = {
    FOR: 'https://www.nav.no/soknader/nb/person/familie/foreldrepenger-og-engangsstonad/NAV%2014-05.09/klage/brev'
};

export const getUrlToPaperForm = (tema: TemaKey) => {
    return getTemaUrl(tema) ?? 'https://www.nav.no/soknader/nb/klage/person';
};

type TemaUrlKey = keyof typeof TEMA_URL_MAP;

const TEMA_URL_KEYS = Object.keys(TEMA_URL_MAP);

function getTemaUrl(tema: TemaKey) {
    const temaUrlKey = ensureTemaKeyIsTemaUrlKey(tema);
    if (temaUrlKey === null) {
        return null;
    }
    return TEMA_URL_MAP[temaUrlKey];
}

function ensureTemaKeyIsTemaUrlKey(tema: TemaKey): TemaUrlKey | null {
    if (TEMA_URL_KEYS.includes(tema)) {
        return tema as TemaUrlKey;
    }
    return null;
}
