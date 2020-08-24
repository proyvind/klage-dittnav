import { Vedtak } from '../../types/vedtak';

export const validVedtakQuery = (element: any): boolean => {
    return 'tema' in element;
};

export const elementAsVedtak = (element: any): Vedtak => {
    return {
        vedtak: '',
        tema: element.tema ? element.tema : 'UKJ',
        ytelse: element?.ytelse,
        saksnummer: element?.saksnummer ?? ''
    };
};
