import { useParams } from 'react-router-dom';
import { Languages } from './language';

interface Match {
    lang?: Languages;
}

export const useLanguage = (): Languages => {
    const { lang } = useParams<Match>();
    if (typeof lang === 'string') {
        return lang as Languages;
    }
    return lang ?? Languages.nb;
};
