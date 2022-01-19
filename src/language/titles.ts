import { ENVIRONMENT } from '../environment/environment';
import { StringValue } from '../kategorier/kategorier';
import { logError } from '../logging/frontendLogger';
import { TemaKey } from '../tema/tema';
import { Languages } from './language';
import { useLanguage } from './use-language';

class Titles {
    private titles: Record<string, StringValue> = {};

    constructor() {
        try {
            const json = document.getElementById('titles')?.textContent;
            if (typeof json !== 'string') {
                throw new Error('Missing titles');
            } else {
                this.titles = JSON.parse(json);
                this.titleKeys = Object.keys(this.titles);
            }
        } catch (e) {
            if (e instanceof Error) {
                logError(e);
            }
            fetch(`${ENVIRONMENT.apiUrl}/titles`)
                .then(res => res.json())
                .then(json => {
                    this.titles = json;
                    this.titleKeys = Object.keys(this.titles);
                });
        }
    }

    private titleKeys: string[] = [];

    private isString = (key?: string | null): key is string => typeof key === 'string';

    public isTitleKey = (titleKey?: string | null): titleKey is string =>
        this.isString(titleKey) && this.titleKeys.includes(titleKey);

    public getTitle(titleKey: string | TemaKey, lang: Languages = Languages.nb): string {
        if (this.isTitleKey(titleKey)) {
            return this.titles[titleKey][lang] ?? titleKey;
        }

        return titleKey;
    }

    public getTemaTitle = (temaKey: TemaKey, lang: Languages = Languages.nb) => {
        const value = this.titles[temaKey];
        if (typeof value === 'undefined') {
            return `${lang}_TITLE_${temaKey}`;
        }
        return value[lang] ?? `${lang}_TITLE_${temaKey}`;
    };

    public ensureTitleKey = (titleKey?: string | null): string | null => (this.isTitleKey(titleKey) ? titleKey : null);
}

export const TITLES = new Titles();

export const useTitleOrYtelse = (temaKey: TemaKey, titleKey?: string | null, ytelse?: string | null) => {
    const lang = useLanguage();
    if (typeof titleKey === 'string') {
        return TITLES.getTitle(titleKey, lang);
    }
    if (typeof ytelse === 'string') {
        return ytelse;
    }
    return TITLES.getTemaTitle(temaKey, lang) ?? titleKey ?? temaKey;
};

export const useTemaName = (temaKey: TemaKey) => {
    const lang = useLanguage();
    return TITLES.getTemaTitle(temaKey, lang) ?? temaKey;
};

export const useTitle = (titleKey: string): string => {
    const lang = useLanguage();
    return TITLES.getTitle(titleKey, lang) ?? titleKey;
};
