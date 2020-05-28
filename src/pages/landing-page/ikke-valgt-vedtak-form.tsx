import React, { useState } from 'react';
import PersonligeOpplysningerPage from '../personlige-opplysninger/personlige-opplysninger-page';
import { Vedtak } from '../../types/vedtak';
import BegrunnelsePage from '../begrunnelse/begrunnelse-page';
import VedtaketPage from '../vedtaket/vedtaket-page';
import { RouteType, routesStepsIkkeValgtVedtak } from '../../utils/routes.config';
import { MarginContentContainer, CenteredContentContainer } from '../../styled-components/main-styled-components';
import Steps from '../../components/steps/steps';
import { Systemtittel } from 'nav-frontend-typografi';
import OppsummeringSkjemaPage from '../oppsummering-skjema-page/oppsummering-skjema-page';

const IkkeValgtVedtakForm = (props: any) => {
    const [activeStep, setActiveStep] = useState<number>(props.activeStep || 0);
    const [activeVedtak, setActiveVedtak] = useState<Vedtak | null>();
    const [activeBegrunnelse, setActiveBegrunnelse] = useState<string>();

    let activeRoutes: RouteType[] = routesStepsIkkeValgtVedtak;
    let activeRoute: RouteType = activeRoutes[activeStep];

    const next = () => {
        setActiveStep(activeStep + 1);
    };

    const setVedtak = (activeVedtak: Vedtak) => {
        console.log('submitted activeVedtak!', activeVedtak);
        setActiveVedtak(activeVedtak);
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
        console.log('Can post vedtak: ', activeVedtak);
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
                {activeStep === 0 && <PersonligeOpplysningerPage next={() => next()} />}
                {activeStep === 1 && (
                    <VedtaketPage
                        foundVedtak={props.foundVedtak}
                        submitVedtak={(activeVedtak: Vedtak) => setVedtak(activeVedtak)}
                    />
                )}
                {activeStep === 2 && (
                    <BegrunnelsePage
                        submitBegrunnelse={(activeBegrunnelse: string) => setBegrunnelse(activeBegrunnelse)}
                    />
                )}
                {activeStep === 3 && (
                    <OppsummeringSkjemaPage
                        person={props.person}
                        vedtak={activeVedtak}
                        begrunnelse={activeBegrunnelse}
                        submitForm={() => submitForm()}
                    />
                )}
            </MarginContentContainer>
        </>
    );
};

export default IkkeValgtVedtakForm;
