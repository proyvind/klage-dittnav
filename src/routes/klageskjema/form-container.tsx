import React from 'react';
import KvitteringPage from './kvittering/kvittering-page';
import Oppsummering from './oppsummering';
import { Margin32Container, MarginContainer } from '../../styled-components/common';
import Begrunnelse from './begrunnelse/begrunnelse';
import Steps from './steps';
import { Klage } from '../../klage/klage';
import LogoutWarning from '../../logout-warning/logout-warning';
import FormTitle from '../form-title';
import Layout from '../layout';

interface Props {
    activeStep: number;
    klage: Klage;
    render: typeof Begrunnelse | typeof Oppsummering | typeof KvitteringPage;
}

const FormContainer = (props: Props) => (
    <Layout backgroundColor="#fff">
        <FormTitle klage={props.klage} />
        <LogoutWarning />
        <Margin32Container>
            <Steps klageStatus={props.klage.status} activeStep={props.activeStep} />
        </Margin32Container>
        <MarginContainer>
            <props.render klage={props.klage} />
        </MarginContainer>
    </Layout>
);

export default FormContainer;
