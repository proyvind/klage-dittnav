import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { setBreadcrumbs, onBreadcrumbClick } from '@navikt/nav-dekoratoren-moduler';
import { currentPath } from '../routes/current-path';
import { useTranslation } from '../language/use-translation';
import { useLanguage } from '../language/use-language';

export interface Breadcrumb {
    url: string;
    title: string;
    handleInApp?: boolean;
}

export const useBreadcrumbs = (breadcrumbs: Breadcrumb[] | null, currentTitle: string | null) => {
    const history = useHistory();
    const { inngang } = useTranslation();
    const lang = useLanguage();

    useEffect(() => {
        if (breadcrumbs === null) {
            setBreadcrumbs([]);
            return;
        }
        onBreadcrumbClick(({ url }) => history.push(url));

        const hovedkategorierBreadcrumb: Breadcrumb = {
            title: inngang.hovedkategorier.title,
            url: `/${lang}/`,
            handleInApp: true
        };

        if (currentTitle === null) {
            setBreadcrumbs([hovedkategorierBreadcrumb, ...breadcrumbs]);
            return;
        }
        const currentPageBreadcrumb: Breadcrumb = {
            title: currentTitle,
            url: currentPath(window.location),
            handleInApp: true
        };
        setBreadcrumbs([hovedkategorierBreadcrumb, ...breadcrumbs, currentPageBreadcrumb]);
    }, [currentTitle, breadcrumbs, history, inngang.hovedkategorier.title, lang]);
};
