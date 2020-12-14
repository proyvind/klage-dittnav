import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { setBreadcrumbs, onBreadcrumbClick } from '@navikt/nav-dekoratoren-moduler';
import { title } from '../routes/inngang/inngang-hovedkategorier';
import { currentPath } from '../routes/current-path';

export interface Breadcrumb {
    url: string;
    title: string;
    handleInApp?: boolean;
}

const hovedkategorierBreadcrumb: Breadcrumb = {
    title,
    url: '/',
    handleInApp: true
};

export const useBreadcrumbs = (breadcrumbs: Breadcrumb[] | null, currentTitle: string | null) => {
    const history = useHistory();
    useEffect(() => {
        if (breadcrumbs === null) {
            setBreadcrumbs([]);
            return;
        }
        onBreadcrumbClick(({ url }) => history.push(url));
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
    }, [currentTitle, breadcrumbs, history]);
};
