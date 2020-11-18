import React from 'react';
import KvitteringPage from './kvittering/kvittering-page';
import Oppsummering from './oppsummering';
import { MarginContainer } from '../../styled-components/common';
import Begrunnelse from './begrunnelse/begrunnelse';
import Steps from './steps';
import { Klage } from '../../klage/klage';
import LogoutWarning from '../../logout-warning/logout-warning';

interface Props {
    activeStep: number;
    klage: Klage;
    render: typeof Begrunnelse | typeof Oppsummering | typeof KvitteringPage;
}

const FormContainer = (props: Props) => (
    <>
        <LogoutWarning />
        <MarginContainer>
            <Steps klageStatus={props.klage.status} activeStep={props.activeStep} />
        </MarginContainer>
        <MarginContainer>
            <props.render klage={props.klage} />
        </MarginContainer>
    </>
);

export default FormContainer;
