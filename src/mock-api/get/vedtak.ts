import { Vedtak } from '../../types/vedtak';

export const okVedtak: Vedtak[] = [
    {
        tittel: 'Vedtak om avslag på sykepenger',
        vedtaksdato: new Date(),
        tema: 'SP',
        enhet: 'NAV Hallingdal',
        NAV_referanse: 'Herr Kylling'
    },
    {
        tittel: 'Enda et vedtak om avslag på sykepenger',
        vedtaksdato: new Date(2019, 1),
        tema: 'SP',
        enhet: 'NAV Ringerike',
        NAV_referanse: 'Byggmester Bob'
    }
];
