import React from 'react';
import Stegindikator from 'nav-frontend-stegindikator';
import { StegindikatorStegProps } from 'nav-frontend-stegindikator/lib/stegindikator-steg';
import { KlageStatus } from '../../types/klage';

interface Props {
    klageStatus: KlageStatus;
    activeStep: number;
}

const Steps = ({ klageStatus, activeStep }: Props) => {
    const klageIsDone = klageStatus === KlageStatus.DONE;

    const formSteps: StegindikatorStegProps[] = [
        {
            index: 0,
            label: 'Begrunnelse',
            aktiv: true,
            ferdig: klageIsDone,
            disabled: klageIsDone
        },
        {
            index: 1,
            label: 'Oppsummering',
            aktiv: true,
            ferdig: klageIsDone,
            disabled: false
        },
        {
            index: 2,
            label: 'Kvittering',
            aktiv: true,
            ferdig: false,
            disabled: !klageIsDone
        }
    ];

    return <Stegindikator steg={formSteps} aktivtSteg={activeStep} autoResponsiv kompakt />;
};

const propsAreEqual = (prevProps: Props, nextProps: Props): boolean =>
    prevProps.activeStep === nextProps.activeStep && prevProps.klageStatus === nextProps.klageStatus;

export default React.memo(Steps, propsAreEqual);
