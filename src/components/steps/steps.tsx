import React from 'react';
import Stegindikator from 'nav-frontend-stegindikator';
import { FormStep } from '../../utils/routes.config';

const Steps = (props: any) => {
    const activeRoutes: FormStep[] = props.activeRoutes;

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
