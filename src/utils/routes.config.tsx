import VedtaketPage from '../pages/vedtaket/vedtaket-page';
import PersonligeOpplysningerPage from '../pages/personlige-opplysninger/personlige-opplysninger-page';
import BegrunnelsePage from '../pages/begrunnelse/begrunnelse-page';

export type RouteType = {
    step: number;
    path: string;
    component: any;
    label: string;
    exact: boolean;
};

export const routesConfig: RouteType[] = [
    {
        step: 0,
        path: `/`,
        component: PersonligeOpplysningerPage,
        label: 'Opplysninger',
        exact: true
    },
    {
        step: 1,
        path: `/vedtaket`,
        component: VedtaketPage,
        label: 'Vedtaket',
        exact: true
    },
    {
        step: 2,
        path: `/begrunnelse`,
        component: BegrunnelsePage,
        label: 'Begrunnelse',
        exact: true
    }
];
