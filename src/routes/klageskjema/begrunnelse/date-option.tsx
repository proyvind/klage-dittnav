import { RadioPanelProps } from 'nav-frontend-skjema';

export enum DateOption {
    SISTE_VEDTAK = 'sisteVedtak',
    TIDLIGERE_VEDTAK = 'tidligereVedtak',
    INGEN = ''
}

export const datoValg: RadioPanelProps[] = [
    {
        label: 'Jeg klager på siste vedtak',
        value: DateOption.SISTE_VEDTAK,
        id: DateOption.SISTE_VEDTAK
    },
    {
        label: 'Jeg klager på et tidligere vedtak',
        value: DateOption.TIDLIGERE_VEDTAK,
        id: DateOption.TIDLIGERE_VEDTAK
    }
];
