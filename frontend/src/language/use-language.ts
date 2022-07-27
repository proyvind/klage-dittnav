import { useParams } from 'react-router-dom';
import { Languages } from './types';

export const useLanguage = (): Languages => {
  const { lang } = useParams();

  if (typeof lang === 'string') {
    return lang as Languages;
  }

  return lang ?? Languages.nb;
};
