import React from 'react';
import KvitteringPage from './kvittering/kvittering-page';
import Oppsummering from './summary/summary';
import Begrunnelse from './begrunnelse/begrunnelse';
import Steps, { stepLabels } from './steps';
import { Klage } from '../../klage/klage';
import LogoutWarning from '../../logout-warning/logout-warning';
import FormTitle from '../form-title';
import { FormMainContainer } from '../../styled-components/main-container';
import { ContentContainer } from '../../styled-components/content-container';
import { usePageInit } from '../../page-init/page-init';
import { useBreadcrumbs } from '../../breadcrumbs/use-breadcrumbs';

interface Props {
    activeStep: number;
    klage: Klage;
    render: typeof Begrunnelse | typeof Oppsummering | typeof KvitteringPage;
}

const FormContainer = (props: Props) => {
    usePageInit(`${stepLabels[props.activeStep]} \u2013 klage`);
    useBreadcrumbs(null, null);

    return (
        <FormMainContainer>
            <FormTitle klage={props.klage} />
            <ContentContainer>
                <LogoutWarning />
                <Steps klageStatus={props.klage.status} activeStep={props.activeStep} />
                <props.render klage={props.klage} />
            </ContentContainer>
        </FormMainContainer>
    );
};

export default FormContainer;
