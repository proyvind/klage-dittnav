import { Vedtak } from '../../types/vedtak';

export const validVedtakQuery = (element: any): boolean => {
    return 'referanse' in element && 'tema' in element;
};

export const elementAsVedtak = (element: any): Vedtak => {
    return {
        vedtaksdato: '',
        ytelse: element?.ytelse,
        tema: element.tema ? element.tema : 'UKJ',
        enhet: element?.enhet,
        referanse: element?.referanse
    };
};
