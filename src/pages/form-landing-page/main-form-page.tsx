import React, { useState } from 'react';
import { Vedtak } from '../../types/vedtak';
import BegrunnelsePage from '../begrunnelse/begrunnelse-page';
import VedtaketPage from '../vedtaket/vedtaket-page';
import { routesStepsIkkeValgtVedtak, routesStepsValgtVedtak, FormStep } from '../../utils/routes.config';
import { MarginContainer, ContentContainer } from '../../styled-components/main-styled-components';
import Steps from '../../components/steps/steps';
import OppsummeringSkjemaPage from '../oppsummering-skjema-page/oppsummering-skjema-page';

interface Props {
    availableVedtak: Vedtak[];
    chosenVedtak?: Vedtak;
    ytelse: string;
}

const MainFormPage = (props: Props) => {
    const [activeStep, setActiveStep] = useState<number>(0);
    const [activeVedtak, setActiveVedtak] = useState<Vedtak>(new Vedtak());
    const [optToFillOutManually, setOptToFillOutManually] = useState<boolean>(false);

    let activeRoutes: FormStep[] = props.chosenVedtak ? routesStepsValgtVedtak : routesStepsIkkeValgtVedtak;
    let activeRoute: FormStep = activeRoutes[activeStep];

    window.onbeforeunload = function () {
        return 'Your work will be lost.';
    };

    const chooseStep = (step: number) => {
        setActiveStep(step);
    };

    const next = () => {
        setActiveStep(activeStep + 1);
    };

    const previous = () => {
        setActiveStep(activeStep - 1);
    };

    const setVedtak = (activeVedtak: Vedtak) => {
        setActiveVedtak(activeVedtak);
        next();
    };

    return (
        <ContentContainer>
            <MarginContainer>
                <Steps activeRoutes={activeRoutes} activeStep={activeStep} chooseStep={chooseStep} />
            </MarginContainer>
            <MarginContainer>
                {activeRoute.label === 'Vedtak' && (
                    <VedtaketPage
                        ytelse={props.ytelse}
                        availableVedtak={props.availableVedtak}
                        activeVedtak={activeVedtak}
                        submitVedtak={(activeVedtak: Vedtak) => setVedtak(activeVedtak)}
                        optToFillOutManually={optToFillOutManually}
                        setOptToFillOutManually={(b: boolean) => setOptToFillOutManually(b)}
                        next={() => next()}
                    />
                )}
                {activeRoute.label === 'Begrunnelse' && (
                    <BegrunnelsePage
                        ytelse={props.ytelse}
                        chosenVedtak={props.chosenVedtak}
                        next={() => next()}
                        previous={() => previous()}
                    />
                )}
                {activeRoute.label === 'Oppsummering' && <OppsummeringSkjemaPage previous={() => previous()} />}
            </MarginContainer>
        </ContentContainer>
    );
};

export default MainFormPage;
