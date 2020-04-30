import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Stegindikator from 'nav-frontend-stegindikator';
import { routesConfig, RouteType } from '../../utils/routes.config';

const Steps = () => {
    const history = useHistory();
    const location = useLocation();
    const activeRoute = routesConfig.find(route => route.path === location.pathname) as RouteType;

    return activeRoute ? (
        <Stegindikator
            key={Math.random()}
            steg={routesConfig.map((route, i) => ({
                index: i,
                label: route.label,
                aktiv: activeRoute.step === i
            }))}
            visLabel
            onChange={index => {
                history.push(routesConfig[index].path);
            }}
        />
    ) : null;
};

export default Steps;
