import { Vedtak } from '../../types/vedtak';

export const okVedtak: Vedtak[] = [
    {
        title: 'Vedtak om avslag på sykepenger',
        vedtaksdato: new Date(),
        tema: 'SP',
        enhet: 'NAV Hallingdal'
    },
    {
        title: 'Enda et vedtak om avslag på sykepenger',
        vedtaksdato: new Date(2019, 1),
        tema: 'SP',
        enhet: 'NAV Ringerike'
    }
];
