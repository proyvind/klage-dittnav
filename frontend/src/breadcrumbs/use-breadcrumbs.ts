import { onBreadcrumbClick, setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@app/language/use-language';
import { useTranslation } from '@app/language/use-translation';
import { currentPath } from '@app/routes/current-path';

export interface Breadcrumb {
  url: string;
  title: string;
  handleInApp?: boolean;
}

export const useBreadcrumbs = (breadcrumbs: Breadcrumb[] | null, currentTitle: string | null) => {
  const navigate = useNavigate();
  const { inngang } = useTranslation();
  const lang = useLanguage();

  useEffect(() => {
    if (breadcrumbs === null) {
      setBreadcrumbs([]);

      return;
    }

    onBreadcrumbClick(({ url }) => navigate(url));

    const hovedkategorierBreadcrumb: Breadcrumb = {
      title: inngang.hovedkategorier.title,
      url: `/${lang}/`,
      handleInApp: true,
    };

    if (currentTitle === null) {
      setBreadcrumbs([hovedkategorierBreadcrumb, ...breadcrumbs]);

      return;
    }

    const currentPageBreadcrumb: Breadcrumb = {
      title: currentTitle,
      url: currentPath(window.location),
      handleInApp: true,
    };
    setBreadcrumbs([hovedkategorierBreadcrumb, ...breadcrumbs, currentPageBreadcrumb]);
  }, [currentTitle, breadcrumbs, navigate, inngang.hovedkategorier.title, lang]);
};
