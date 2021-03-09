import React from 'react';
import Stegindikator from 'nav-frontend-stegindikator';
import { StegindikatorStegProps } from 'nav-frontend-stegindikator/lib/stegindikator-steg';
import { KlageStatus } from '../../klage/klage';
import { Row } from '../../styled-components/row';
import { useTranslation } from '../../language/use-translation';

interface Props {
    klageStatus: KlageStatus;
    activeStep: number;
}

const Steps = ({ klageStatus, activeStep }: Props) => {
    const { klageskjema } = useTranslation();
    const klageIsDone = klageStatus === KlageStatus.DONE;
    const { steps } = klageskjema.common;

    const formSteps: StegindikatorStegProps[] = [
        {
            index: 0,
            label: steps[0],
            aktiv: true,
            ferdig: klageIsDone,
            disabled: klageIsDone
        },
        {
            index: 1,
            label: steps[1],
            aktiv: true,
            ferdig: klageIsDone,
            disabled: false
        },
        {
            index: 2,
            label: steps[2],
            aktiv: true,
            ferdig: false,
            disabled: !klageIsDone
        }
    ];

    return (
        <Row>
            <Stegindikator steg={formSteps} aktivtSteg={activeStep} autoResponsiv kompakt />
        </Row>
    );
};

const propsAreEqual = (prevProps: Props, nextProps: Props): boolean =>
    prevProps.activeStep === nextProps.activeStep && prevProps.klageStatus === nextProps.klageStatus;

export default React.memo(Steps, propsAreEqual);
