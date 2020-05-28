import BegrunnelsePage from '../pages/begrunnelse/begrunnelse-page';
import LandingPage from '../pages/landing-page/landing-page';
import ChosenVedtakSummaryPage from '../pages/chosen-vedtak-summary/chosen-vedtak-summary-page';
import OppsummeringSkjemaPage from '../pages/oppsummering-skjema-page/oppsummering-skjema-page';

export type RouteType = {
    step?: number;
    path: string;
    component?: any;
    label: string;
    redirect?: string;
    exact: boolean;
};

export const routesStepsValgtVedtak: RouteType[] = [
    {
        step: 0,
        path: `/vedtak-oppsummert`,
        component: ChosenVedtakSummaryPage,
        label: 'Oppsummering vedtak',
        exact: true
    },
    {
        step: 1,
        path: `/begrunnelse`,
        component: BegrunnelsePage,
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

export const routesStepsIkkeValgtVedtak: RouteType[] = [
    {
        step: 0,
        path: `/opplysninger`,
        component: LandingPage,
        label: 'Opplysninger',
        exact: true
    },
    {
        step: 1,
        path: `/vedtaket`,
        component: LandingPage,
        label: 'Vedtaket',
        exact: true
    },
    {
        step: 2,
        path: `/begrunnelse`,
        component: LandingPage,
        label: 'Begrunnelse',
        exact: true
    },
    {
        step: 3,
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
    }
];

export const routesConfig = routesPages;
