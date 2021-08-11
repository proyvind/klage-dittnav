import React from 'react';
import Stegindikator from 'nav-frontend-stegindikator';
import { StegindikatorStegProps } from 'nav-frontend-stegindikator/lib/stegindikator-steg';
import { Row } from '../../styled-components/row';
import { useTranslation } from '../../language/use-translation';
import { AnkeStatus } from '../../store/anke/types/anke';

interface Props {
    ankeStatus: AnkeStatus;
    activeStep: number;
}

const Steps = ({ ankeStatus, activeStep }: Props) => {
    const { ankeskjema } = useTranslation();
    const isDone = ankeStatus === AnkeStatus.DONE;
    const { steps } = ankeskjema.common;

    const formSteps: StegindikatorStegProps[] = [
        {
            index: 0,
            label: steps[0],
            aktiv: true,
            ferdig: isDone,
            disabled: isDone
        },
        {
            index: 1,
            label: steps[1],
            aktiv: true,
            ferdig: isDone,
            disabled: false
        },
        {
            index: 2,
            label: steps[2],
            aktiv: true,
            ferdig: false,
            disabled: !isDone
        }
    ];

    return (
        <Row>
            <Stegindikator steg={formSteps} aktivtSteg={activeStep} autoResponsiv kompakt />
        </Row>
    );
};

const propsAreEqual = (prevProps: Props, nextProps: Props): boolean =>
    prevProps.activeStep === nextProps.activeStep && prevProps.ankeStatus === nextProps.ankeStatus;

export default React.memo(Steps, propsAreEqual);
