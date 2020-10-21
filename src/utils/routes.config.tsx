import BegrunnelsePage from '../pages/begrunnelse/begrunnelse-page';
import FormLandingPage from '../pages/form-landing-page/form-landing-page';
import OppsummeringSkjemaPage from '../pages/oppsummering-skjema-page/oppsummering-skjema-page';
import KvitteringPage from '../pages/kvittering/kvittering-page';
import NotFoundPage from '../pages/not-found/not-found-page';
import InngangKategorier from '../components/inngang/inngang-kategorier';
import InngangInnsending from '../components/inngang/inngang-innsendingsvalg';
import { TEMA_KEYS } from '../types/tema';
import { RouteProps } from 'react-router';
import { INNGANG_KATEGORIER } from '../data/kategorier';
import RootWithQuery from '../pages/root-with-query/root-with-query';

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
        component: KvitteringPage,
        exact: true
    },
    {
        path: `/klage`,
        component: FormLandingPage,
        exact: true
    },
    {
        path: `/oppsummering`,
        component: FormLandingPage,
        exact: true
    },
    ...TEMA_KEYS.map<RouteProps>(temaKey => ({
        path: `/${temaKey}`,
        render: () => InngangInnsending(temaKey),
        exact: true
    })),
    ...INNGANG_KATEGORIER.map<RouteProps>(kategori => ({
        path: `/${kategori.path}`,
        render: () => InngangKategorier(kategori),
        exact: true
    })),
    ...INNGANG_KATEGORIER.flatMap<RouteProps>(kategori =>
        kategori.kategorier.map<RouteProps>(tema => ({
            path: `/${kategori.path}/${tema.tema}`,
            render: () => InngangInnsending(tema.tema, tema.title, tema.digital),
            exact: true
        }))
    ),
    {
        path: `/`,
        component: RootWithQuery,
        exact: true
    },
    {
        path: `*`,
        component: NotFoundPage,
        exact: true
    }
];

export const routesConfig = routesPages;
