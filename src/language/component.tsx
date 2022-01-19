import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { setAvailableLanguages, onLanguageSelect, setParams } from '@navikt/nav-dekoratoren-moduler';
import { currentPath } from '../routes/current-path';
import { LANGUAGE_KEYS } from '../language/language';

interface Props {
    children: JSX.Element;
}

const LanguageComponenet = (props: Props) => {
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        onLanguageSelect(language => {
            if (typeof language.url === 'string') {
                history.push(language.url);
            }
        });
        const path = currentPath(location);
        const currentLanguage = LANGUAGE_KEYS.find(l => path.startsWith(`/${l}`));
        let languageIndependentPath = path;
        if (typeof currentLanguage === 'string') {
            setParams({ language: currentLanguage });
            languageIndependentPath = path.slice(currentLanguage.length + 1);
        }
        setAvailableLanguages(
            LANGUAGE_KEYS.map(l => ({
                locale: l,
                url: `/${l}${languageIndependentPath}`,
                handleInApp: true
            }))
        );
    }, [history, location]);

    return props.children;
};

export default LanguageComponenet;
