import BegrunnelsePage from '../pages/begrunnelse/begrunnelse-page';
import FormLandingPage from '../pages/form-landing-page/form-landing-page';
import OppsummeringSkjemaPage from '../pages/oppsummering-skjema-page/oppsummering-skjema-page';
import DummyRedirectPage from '../pages/dummy-redirect/dummy-redirect-page';
import KvitteringPage from '../pages/kvittering/kvittering-page';
import SkjemaInngang from '../pages/skjema-inngang/skjema-inngang';
import NotFoundPage from '../pages/not-found/not-found-page';

export type RouteType = {
    step?: number;
    path: string;
    component?: any;
    redirect?: string;
    exact: boolean;
};

export type FormStep = {
    step?: number;
    path: string;
    component?: any;
    label: string;
    redirect?: string;
    exact: boolean;
};

export const routesStepsValgtVedtak: FormStep[] = [
    {
        step: 0,
        path: `/begrunnelse`,
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

export const routesStepsIkkeValgtVedtak: FormStep[] = [
    {
        step: 0,
        path: `/begrunnelse`,
        component: FormLandingPage,
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
        component: SkjemaInngang,
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
        path: `*`,
        component: NotFoundPage,
        exact: true
    }
];

export const routesConfig = routesPages;
