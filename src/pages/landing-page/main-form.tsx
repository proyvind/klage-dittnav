import React, { useState } from 'react';
import { Vedtak } from '../../types/vedtak';
import BegrunnelsePage from '../begrunnelse/begrunnelse-page';
import VedtaketPage from '../vedtaket/vedtaket-page';
import { routesStepsIkkeValgtVedtak, routesStepsValgtVedtak, FormStep } from '../../utils/routes.config';
import { MarginContainer, ContentContainer, CenteredContainer } from '../../styled-components/main-styled-components';
import Steps from '../../components/steps/steps';
import { Systemtittel } from 'nav-frontend-typografi';
import OppsummeringSkjemaPage from '../oppsummering-skjema-page/oppsummering-skjema-page';

interface Props {
    availableVedtak: Vedtak[];
    chosenVedtak?: Vedtak;
}

const MainForm = (props: Props) => {
    const [activeStep, setActiveStep] = useState<number>(0);
    const [activeVedtak, setActiveVedtak] = useState<Vedtak>(new Vedtak());
    const [optToFillOutManually, setOptToFillOutManually] = useState<boolean>(false);

    let activeRoutes: FormStep[] = props.chosenVedtak ? routesStepsValgtVedtak : routesStepsIkkeValgtVedtak;
    let activeRoute: FormStep = activeRoutes[activeStep];

    const chooseStep = (step: number) => {
        setActiveStep(step);
    };

    const next = () => {
        setActiveStep(activeStep + 1);
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
                <CenteredContainer>
                    <MarginContainer>
                        <Systemtittel>{activeRoute.label}</Systemtittel>
                    </MarginContainer>
                </CenteredContainer>
                {activeRoute.label === 'Vedtak' && (
                    <VedtaketPage
                        availableVedtak={props.availableVedtak}
                        activeVedtak={activeVedtak}
                        submitVedtak={(activeVedtak: Vedtak) => setVedtak(activeVedtak)}
                        optToFillOutManually={optToFillOutManually}
                        setOptToFillOutManually={(b: boolean) => setOptToFillOutManually(b)}
                    />
                )}
                {activeRoute.label === 'Begrunnelse' && (
                    <BegrunnelsePage activeVedtak={props.chosenVedtak} next={() => next()} />
                )}
                {activeRoute.label === 'Oppsummering' && <OppsummeringSkjemaPage />}
            </MarginContainer>
        </ContentContainer>
    );
};

export default MainForm;
