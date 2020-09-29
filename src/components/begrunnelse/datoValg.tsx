import { RadioPanelProps } from 'nav-frontend-skjema';

export enum DatoValg {
    SISTE_VEDTAK = 'sisteVedtak',
    TIDLIGERE_VEDTAK = 'tidligereVedtak',
    INGEN = ''
}

export const datoValg: RadioPanelProps[] = [
    {
        label: 'Jeg klager på siste vedtak',
        value: DatoValg.SISTE_VEDTAK,
        id: DatoValg.SISTE_VEDTAK
    },
    {
        label: 'Jeg klager på et tidligere vedtak',
        value: DatoValg.TIDLIGERE_VEDTAK,
        id: DatoValg.TIDLIGERE_VEDTAK
    }
];
