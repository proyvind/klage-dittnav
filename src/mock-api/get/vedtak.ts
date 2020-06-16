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

export const instanceOfVedtak = (element: any): boolean => {
    return (
        'tittel' in element &&
        'vedtaksdato' in element &&
        'tema' in element &&
        'enhet' in element &&
        'NAV_referanse' in element
    );
};

export const elementAsVedtak = (element: any): Vedtak => {
    let chosenVedtak: Vedtak = {
        tittel: element?.tittel,
        vedtaksdato: new Date(element?.vedtaksdato) ?? new Date(),
        tema: element?.tema,
        enhet: element?.enhet,
        NAV_referanse: element?.NAV_referanse
    };
    return chosenVedtak;
};
