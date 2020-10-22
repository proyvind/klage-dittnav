import BegrunnelsePage from '../pages/begrunnelse/begrunnelse-page';
import FormLandingPage from '../pages/form-landing-page/form-landing-page';
import OppsummeringSkjemaPage from '../pages/oppsummering-skjema-page/oppsummering-skjema-page';
import KvitteringPage from '../pages/kvittering/kvittering-page';
import NotFoundPage from '../pages/not-found/not-found-page';
import InngangKategorier from '../components/inngang/inngang-kategorier';
import InngangInnsendingDigital from '../components/inngang/inngang-innsendingsvalg-digital';
import { TEMA_KEYS } from '../types/tema';
import { RouteProps } from 'react-router';
import { INNGANG_KATEGORIER, Kategori } from '../data/kategorier';
import RootWithQuery from '../pages/root-with-query/root-with-query';
import InngangInnsendingPost from '../components/inngang/inngang-innsendingsvalg-post';

export interface FormStep extends RouteProps {
    path: string;
    step?: number;
    label: string;
    redirect?: string;
}

export const formSteps: FormStep[] = [
    {
        step: 0,
        path: `/klage`,
        component: BegrunnelsePage,
        label: 'Begrunnelse',
        exact: true
    },
    {
        step: 1,
        path: `/oppsummering`,
        component: OppsummeringSkjemaPage,
        label: 'Oppsummering',
        exact: true
    }
];

export const routesPages: RouteProps[] = [
    {
        path: `/kvittering`,
        component: KvitteringPage
    },
    {
        path: `/klage`,
        component: FormLandingPage
    },
    {
        path: `/oppsummering`,
        component: FormLandingPage
    },
    ...TEMA_KEYS.map<RouteProps>(temaKey => ({
        path: `/${temaKey}`,
        render: () => InngangInnsendingPost(temaKey)
    })),
    ...INNGANG_KATEGORIER.map<RouteProps>(inngangkategori => ({
        path: `/${inngangkategori.path}`,
        render: () => InngangKategorier(inngangkategori)
    })),
    ...INNGANG_KATEGORIER.flatMap<RouteProps>(inngangkategori =>
        inngangkategori.kategorier.map<RouteProps>(kategori => ({
            path: `/${inngangkategori.path}/${kategori.path}`,
            render: () => getInngangInnsendingComponent(kategori)
        }))
    ),
    {
        path: `/`,
        component: RootWithQuery
    },
    {
        component: NotFoundPage
    }
];

function getInngangInnsendingComponent({ digital, title, temaKey }: Kategori) {
    if (digital) {
        return InngangInnsendingDigital(temaKey, title);
    }
    return InngangInnsendingPost(temaKey, title);
}

export const routesConfig = routesPages;
