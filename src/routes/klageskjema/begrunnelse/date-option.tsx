import { RadioPanelProps } from 'nav-frontend-skjema';
import { VedtakType } from '../../../klage/klage';

export const datoValg: RadioPanelProps[] = [
    {
        label: 'Jeg klager på siste vedtak',
        value: VedtakType.LATEST,
        id: VedtakType.LATEST
    },
    {
        label: 'Jeg klager på et tidligere vedtak',
        value: VedtakType.EARLIER,
        id: VedtakType.EARLIER
    }
];
