import BegrunnelsePage from '../pages/begrunnelse/begrunnelse-page';
import FormLandingPage from '../pages/form-landing-page/form-landing-page';
import OppsummeringSkjemaPage from '../pages/oppsummering-skjema-page/oppsummering-skjema-page';
import DummyRedirectPage from '../pages/dummy-redirect/dummy-redirect-page';
import KvitteringPage from '../pages/kvittering/kvittering-page';
import NotFoundPage from '../pages/not-found/not-found-page';
import { JSXElementConstructor } from 'react';
import KlageEllerAnkeYtelse from '../components/klage-eller-anke/klage-eller-anke-ytelse';
import KlageEllerAnkeTema from '../components/klage-eller-anke/klage-eller-anke-tema';
import KlageEllerAnkeInnsending from '../components/klage-eller-anke/klage-eller-anke-innsending';

export type RouteType = {
    step?: number;
    path: string;
    component: JSXElementConstructor<any>;
    redirect?: string;
    exact: boolean;
};

export type FormStep = {
    step?: number;
    path: string;
    component: JSXElementConstructor<any>;
    label: string;
    redirect?: string;
    exact: boolean;
};

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

export const routesPages: RouteType[] = [
    {
        path: `/`,
        component: KlageEllerAnkeTema,
        exact: true
    },
    {
        path: `/redirect`,
        component: DummyRedirectPage,
        exact: true
    },
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
    {
        path: `/:kategori`,
        component: KlageEllerAnkeYtelse,
        exact: true
    },
    {
        path: `/:kategori/:tema`,
        component: KlageEllerAnkeInnsending,
        exact: true
    },
    {
        path: `*`,
        component: NotFoundPage,
        exact: true
    }
];

export const routesConfig = routesPages;
