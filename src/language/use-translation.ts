import { getLanguage, Language } from './language';
import { useLanguage } from './use-language';

export const useTranslation = (): Language => {
    const lang = useLanguage();
    return getLanguage(lang);
};
