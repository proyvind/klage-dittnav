import { nn } from '@app/language/nn';
import { en } from './en';
import { Translations, nb } from './nb';
import { Languages } from './types';

export const LANGUAGES = Object.values(Languages);

const languages: Map<Languages, Translations> = new Map([
  [Languages.nb, nb],
  [Languages.en, en],
  [Languages.nn, nn],
]);

export const getLanguage = (key?: Languages): Translations => languages.get(key ?? Languages.nb) ?? nb;

export type { Translations as Language } from './nb';
