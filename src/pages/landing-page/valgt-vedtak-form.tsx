import React, { useState } from 'react';
import { Bruker } from '../../types/bruker';
import { Vedtak } from '../../types/vedtak';
import BegrunnelsePage from '../begrunnelse/begrunnelse-page';
import ChosenVedtakSummaryPage from '../chosen-vedtak-summary/chosen-vedtak-summary-page';
import { MarginContentContainer, CenteredContentContainer } from '../../styled-components/main-styled-components';
import { Systemtittel } from 'nav-frontend-typografi';
import { RouteType, routesStepsValgtVedtak } from '../../utils/routes.config';
import Steps from '../../components/steps/steps';
import OppsummeringSkjemaPage from '../oppsummering-skjema-page/oppsummering-skjema-page';

interface Props {
    person: Bruker;
    vedtak: Vedtak;
}
const ValgtVedtakForm = (props: Props) => {
    const [activeStep, setActiveStep] = useState<number>(0);
    const [activeBegrunnelse, setActiveBegrunnelse] = useState<string>();

    let activeRoutes: RouteType[] = routesStepsValgtVedtak;
    let activeRoute: RouteType = activeRoutes[activeStep];

    const next = () => {
        setActiveStep(activeStep + 1);
    };

    const setBegrunnelse = (begrunnelse: string) => {
        console.log('submitted begrunnelse!', begrunnelse);
        setActiveBegrunnelse(begrunnelse);
        setActiveStep(activeStep + 1);
    };

    const submitForm = () => {
        // TODO
        console.log('submit');
        console.log('Can post person details: ', props.person);
        console.log('Can post vedtak: ', props.vedtak);
        console.log('Can post begrunnelse: ', activeBegrunnelse);
    };

    return (
        <>
            <MarginContentContainer>
                <Steps activeRoutes={activeRoutes} activeStep={activeStep} />
            </MarginContentContainer>
            <MarginContentContainer>
                <CenteredContentContainer>
                    <Systemtittel>{activeRoute.label}</Systemtittel>
                </CenteredContentContainer>
                {activeStep === 0 && (
                    <ChosenVedtakSummaryPage person={props.person} vedtak={props.vedtak} next={() => next()} />
                )}
                {activeStep === 1 && (
                    <BegrunnelsePage
                        submitBegrunnelse={(activeBegrunnelse: string) => setBegrunnelse(activeBegrunnelse)}
                    />
                )}
                {activeStep === 2 && (
                    <OppsummeringSkjemaPage
                        person={props.person}
                        vedtak={props.vedtak}
                        begrunnelse={activeBegrunnelse}
                        submitForm={() => submitForm()}
                    />
                )}
            </MarginContentContainer>
        </>
    );
};

export default ValgtVedtakForm;
