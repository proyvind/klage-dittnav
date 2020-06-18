import BegrunnelsePage from '../pages/begrunnelse/begrunnelse-page';
import LandingPage from '../pages/landing-page/landing-page';
import OppsummeringSkjemaPage from '../pages/oppsummering-skjema-page/oppsummering-skjema-page';
import DummyRedirectPage from '../pages/dummy-redirect/dummy-redirect-page';
import KvitteringPage from '../pages/kvittering/kvittering-page';

export type RouteType = {
    step?: number;
    path: string;
    component?: any;
    label: string;
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
        path: `/vedtaket`,
        component: LandingPage,
        label: 'Vedtak',
        exact: true
    },
    {
        step: 1,
        path: `/begrunnelse`,
        component: LandingPage,
        label: 'Begrunnelse',
        exact: true
    },
    {
        step: 2,
        path: `/oppsummering`,
        component: OppsummeringSkjemaPage,
        label: 'Oppsummering',
        exact: true
    }
];

export const routesPages: RouteType[] = [
    {
        path: `/`,
        component: LandingPage,
        label: '',
        exact: true
    },
    {
        path: `/redirect`,
        component: DummyRedirectPage,
        label: '',
        exact: true
    },
    {
        path: `/kvittering`,
        component: KvitteringPage,
        label: '',
        exact: true
    }
];

export const routesConfig = routesPages;
