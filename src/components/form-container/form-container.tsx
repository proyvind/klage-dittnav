import React from 'react';
import KvitteringPage from '../../pages/kvittering/kvittering-page';
import Oppsummering from '../../pages/oppsummering/oppsummering';
import { MarginContainer } from '../../styled-components/main-styled-components';
import { Klage } from '../../types/klage';
import Begrunnelse from '../begrunnelse/begrunnelse';
import Steps from '../steps/steps';

interface Props {
    activeStep: number;
    klage: Klage;
    render: typeof Begrunnelse | typeof Oppsummering | typeof KvitteringPage;
}

const FormContainer = (props: Props) => (
    <>
        <MarginContainer>
            <Steps klageStatus={props.klage.status} activeStep={props.activeStep} />
        </MarginContainer>
        <MarginContainer>
            <props.render klage={props.klage} />
        </MarginContainer>
    </>
);

export default FormContainer;
