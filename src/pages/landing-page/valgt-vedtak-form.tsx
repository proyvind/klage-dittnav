import React, { useState } from 'react';
import BegrunnelsePage from '../begrunnelse/begrunnelse-page';
import VedtakSummaryPage from '../vedtak-summary/vedtak-summary-page';
import { MarginContentContainer, CenteredContentContainer } from '../../styled-components/main-styled-components';
import { Systemtittel } from 'nav-frontend-typografi';
import { RouteType, routesStepsValgtVedtak } from '../../utils/routes.config';
import Steps from '../../components/steps/steps';
import OppsummeringSkjemaPage from '../oppsummering-skjema-page/oppsummering-skjema-page';
import { constructKlage } from '../../types/klage';
import { postKlage } from '../../services/klageService';

const ValgtVedtakForm = (props: any) => {
    const [activeStep, setActiveStep] = useState<number>(0);
    const [activeBegrunnelse, setActiveBegrunnelse] = useState<string>('');

    let activeRoutes: RouteType[] = routesStepsValgtVedtak;
    let activeRoute: RouteType = activeRoutes[activeStep];

    const next = () => {
        setActiveStep(activeStep + 1);
    };

    const setBegrunnelse = async (begrunnelse: string) => {
        console.log('submitted begrunnelse!', begrunnelse);
        setActiveBegrunnelse(begrunnelse);
        await submitDraft();
        setActiveStep(activeStep + 1);
    };

    const submitDraft = () => {
        // Submit form as DRAFT
        let klage = constructKlage(props.person, props.vedtak, activeBegrunnelse, true);
        postKlage(klage).then(e => {
            console.log('e: ', e);
        });
    };

    const submitForm = () => {
        let klage = constructKlage(props.person, props.vedtak, activeBegrunnelse, false);
        postKlage(klage).then(e => {
            console.log('e: ', e);
        });
    };

    return (
        <>
            <MarginContentContainer>
                <Steps activeRoutes={activeRoutes} activeStep={activeStep} />
            </MarginContentContainer>
            <MarginContentContainer>
                <CenteredContentContainer>
                    <MarginContentContainer>
                        <Systemtittel>{activeRoute.label}</Systemtittel>
                    </MarginContentContainer>
                </CenteredContentContainer>
                {activeStep === 0 && (
                    <VedtakSummaryPage person={props.person} vedtak={props.vedtak} next={() => next()} />
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
