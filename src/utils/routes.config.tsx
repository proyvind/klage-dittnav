import BegrunnelsePage from '../pages/begrunnelse/begrunnelse-page';
import FormLandingPage from '../pages/form-landing-page/form-landing-page';
import OppsummeringSkjemaPage from '../pages/oppsummering-skjema-page/oppsummering-skjema-page';
import KvitteringPage from '../pages/kvittering/kvittering-page';
import NotFoundPage from '../pages/not-found/not-found-page';
import KlageEllerAnkeYtelse from '../components/klage-eller-anke/klage-eller-anke-ytelse';
import KlageEllerAnkeInnsending from '../components/klage-eller-anke/klage-eller-anke-innsending';
import TemaFromQueryOrFrontpage from '../pages/root-only-tema/root-only-tema';
import { TEMA_KEYS } from '../types/tema';
import { RouteProps } from 'react-router';
import { KLAGE_ELLER_ANKE_TEMAER } from '../data/klage-eller-anke-temaer';

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
        render: () => KlageEllerAnkeInnsending(temaKey),
        exact: true
    })),
    ...KLAGE_ELLER_ANKE_TEMAER.map<RouteProps>(kategori => ({
        path: `/${kategori.path}`,
        render: () => KlageEllerAnkeYtelse(kategori),
        exact: true
    })),
    ...KLAGE_ELLER_ANKE_TEMAER.flatMap<RouteProps>(kategori =>
        kategori.underkategorier.map<RouteProps>(tema => ({
            path: `/${kategori.path}/${tema.tema}`,
            render: () => KlageEllerAnkeInnsending(tema.tema),
            exact: true
        }))
    ),
    {
        path: `/`,
        component: TemaFromQueryOrFrontpage,
        exact: true
    },
    {
        path: `*`,
        component: NotFoundPage,
        exact: true
    }
];

export const routesConfig = routesPages;
