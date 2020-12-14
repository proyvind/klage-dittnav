import { Language, nb } from './nb';
import { en } from './en';

export enum Languages {
    nb = 'nb',
    en = 'en'
}

export const LANGUAGE_KEYS = Object.values(Languages);

const languages: Map<Languages, Language> = new Map([
    [Languages.nb, nb],
    [Languages.en, en]
]);

export const getLanguage = (key?: Languages): Language => languages.get(key ?? Languages.nb) ?? nb;

export type { Language } from './nb';
