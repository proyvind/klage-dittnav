import { onLanguageSelect, setAvailableLanguages, setParams } from '@navikt/nav-dekoratoren-moduler';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LANGUAGE_KEYS } from '@app/language/language';
import { currentPath } from '@app/routes/current-path';

interface Props {
  children: JSX.Element;
}

export const LanguageComponent = (props: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    onLanguageSelect((language) => {
      if (typeof language.url === 'string') {
        navigate(language.url);

        document.documentElement.lang = language.locale;
      }
    });

    const path = currentPath(location);
    const currentLanguage = LANGUAGE_KEYS.find((l) => path.startsWith(`/${l}`));
    let languageIndependentPath = path;

    if (typeof currentLanguage === 'string') {
      setParams({ language: currentLanguage });
      languageIndependentPath = path.slice(currentLanguage.length + 1);
    }

    setAvailableLanguages(
      LANGUAGE_KEYS.map((l) => ({
        locale: l,
        url: `/${l}${languageIndependentPath}`,
        handleInApp: true,
      })),
    );
  }, [navigate, location]);

  return props.children;
};
