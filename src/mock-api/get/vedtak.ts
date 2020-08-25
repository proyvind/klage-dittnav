import { Vedtak } from '../../types/vedtak';
import { Tema } from '../../types/tema';

export const validVedtakQuery = (element: any): boolean => {
    return 'tema' in element;
};

export const elementAsVedtak = (element: any): Vedtak => {
    return {
        vedtak: '',
        tema: element.tema ?? 'UKJ',
        ytelse: element?.ytelse ?? Tema[element.tema ?? 'UKJ'],
        saksnummer: element?.saksnummer ?? ''
    };
};
