import React from 'react';
import BegrunnelsePage from '../pages/begrunnelse/begrunnelse-page';
import OppsummeringSkjemaPage from '../pages/oppsummering-skjema-page/oppsummering-skjema-page';
import KvitteringPage from '../pages/kvittering/kvittering-page';
import NotFoundPage from '../pages/not-found/not-found-page';
import InngangKategorier from '../components/inngang/inngang-kategorier';
import InngangInnsendingDigital from '../components/inngang/inngang-innsendingsvalg-digital';
import { RouteProps } from 'react-router';
import { INNGANG_KATEGORIER, Kategori } from '../data/kategorier';
import RootWithQuery from '../pages/root-with-query/root-with-query';
import InngangInnsendingPost from '../components/inngang/inngang-innsendingsvalg-post';
import FormLanding from '../components/form-landing/form-landing';
import { loggedInRedirect } from '../pages/loggedin-redirect/loggedin-redirect';
import { LOGGED_IN_PATH } from './login';

export interface FormStep extends RouteProps {
    path: string;
    step?: number;
    label: string;
    redirect?: string;
}

export const formSteps: FormStep[] = [
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

interface Route extends RouteProps {
    path: string;
}

export const routesConfig: Route[] = [
    {
        path: LOGGED_IN_PATH,
        render: loggedInRedirect
    },
    {
        path: `/kvittering`,
        component: KvitteringPage
    },
    {
        path: `/begrunnelse`,
        component: FormLanding
    },
    {
        path: `/oppsummering`,
        component: FormLanding
    },
    ...INNGANG_KATEGORIER.map<Route>(inngangkategori => ({
        path: `/${inngangkategori.path}`,
        render: () => <InngangKategorier inngangkategori={inngangkategori} />
    })),
    ...INNGANG_KATEGORIER.flatMap<Route>(inngangkategori =>
        inngangkategori.kategorier.map<Route>(kategori => ({
            path: `/${inngangkategori.path}/${kategori.path}`,
            render: () => getInngangInnsendingComponent(kategori)
        }))
    ),
    {
        path: '/',
        component: RootWithQuery
    },
    {
        path: '',
        component: NotFoundPage
    }
];

function getInngangInnsendingComponent({ digital, title, temaKey }: Kategori) {
    if (digital) {
        return <InngangInnsendingDigital temaKey={temaKey} title={title} />;
    }
    return <InngangInnsendingPost temaKey={temaKey} title={title} />;
}
