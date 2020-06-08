import React from 'react';
import Stegindikator from 'nav-frontend-stegindikator';
import { RouteType } from '../../utils/routes.config';

const Steps = (props: any) => {
    const activeRoutes: RouteType[] = props.activeRoutes;

    return (
        <Stegindikator
            key={Math.random()}
            steg={activeRoutes.map((route, i) => ({
                index: i,
                label: route.label,
                aktiv: props.activeStep === i,
                disabled: route.label === 'Oppsummering'
            }))}
            onChange={step => props.chooseStep(step)}
            visLabel
        />
    );
};

export default Steps;
