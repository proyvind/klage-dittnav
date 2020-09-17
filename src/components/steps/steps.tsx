import React from 'react';
import Stegindikator from 'nav-frontend-stegindikator';
import { FormStep } from '../../utils/routes.config';

interface Props {
    activeRoutes: FormStep[];
    activeStep: number;
    chooseStep: (step: number) => void;
}

const Steps = (props: Props) => {
    const activeRoutes = props.activeRoutes;

    return (
        <Stegindikator
            key={Math.random()}
            steg={activeRoutes.map((route, i) => ({
                index: i,
                label: route.label,
                aktiv: props.activeStep === i
            }))}
            autoResponsiv
            kompakt
        />
    );
};

export default Steps;
