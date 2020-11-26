import React from 'react';
import KvitteringPage from './kvittering/kvittering-page';
import Oppsummering from './oppsummering';
import Begrunnelse from './begrunnelse/begrunnelse';
import Steps from './steps';
import { Klage } from '../../klage/klage';
import LogoutWarning from '../../logout-warning/logout-warning';
import FormTitle from '../form-title';
import { FormMainContainer } from '../../styled-components/main-container';
import { ContentContainer } from '../../styled-components/content-container';

interface Props {
    activeStep: number;
    klage: Klage;
    render: typeof Begrunnelse | typeof Oppsummering | typeof KvitteringPage;
}

const FormContainer = (props: Props) => (
    <FormMainContainer>
        <FormTitle klage={props.klage} />
        <ContentContainer>
            <LogoutWarning />
            <Steps klageStatus={props.klage.status} activeStep={props.activeStep} />
            <props.render klage={props.klage} />
        </ContentContainer>
    </FormMainContainer>
);

export default FormContainer;
