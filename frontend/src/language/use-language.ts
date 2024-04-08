import { useParams } from 'react-router';
import { LANGUAGES } from '@app/language/language';
import { Languages } from './types';

export const useLanguage = (): Languages => {
  const { lang } = useParams();

  return isLanguage(lang) ? lang : Languages.nb;
};

const isLanguage = (language: string | undefined): language is Languages => LANGUAGES.some((l) => l === language);
