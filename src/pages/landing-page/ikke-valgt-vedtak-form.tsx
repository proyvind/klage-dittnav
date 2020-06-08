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
import { constructKlage } from '../../types/klage';
import { addVedleggToKlage } from '../../services/fileService';

const IkkeValgtVedtakForm = (props: any) => {
    const [activeStep, setActiveStep] = useState<number>(props.activeStep || 0);
    const [activeVedtak, setActiveVedtak] = useState<Vedtak>(new Vedtak());
    const [activeBegrunnelse, setActiveBegrunnelse] = useState<string>('');
    const [activeVedlegg, setActiveVedlegg] = useState<File[]>([]);

    let activeRoutes: RouteType[] = routesStepsIkkeValgtVedtak;
    let activeRoute: RouteType = activeRoutes[activeStep];

    const next = () => {
        setActiveStep(activeStep + 1);
    };

    const chooseStep = (step: number) => {
        setActiveStep(step);
    };

    const setVedtak = (activeVedtak: Vedtak) => {
        setActiveVedtak(activeVedtak);
        setActiveStep(activeStep + 1);
    };

    const submitDraft = () => {
        // Submit form as DRAFT
        let klage = constructKlage(props.person, activeVedtak, activeBegrunnelse, true);
        return props.submitKlage(klage);
    };

    const submitBegrunnelse = async (begrunnelse: string) => {
        setActiveBegrunnelse(begrunnelse);
        submitDraft().then((res: any) => {
            return res;
        });
        setActiveStep(activeStep + 1);
    };

    const submitVedlegg = (id: number, vedlegg: File[]) => {
        setActiveVedlegg(vedlegg);
        addVedleggToKlage(id, activeVedlegg).then((res: any) => {
            setActiveStep(activeStep + 1);
        });
        setActiveStep(activeStep + 1);
    };

    const submitForm = () => {
        let klage = constructKlage(props.person, activeVedtak, activeBegrunnelse, false);
        props.submitKlage(klage);
    };

    return (
        <>
            <MarginContentContainer>
                <Steps activeRoutes={activeRoutes} activeStep={activeStep} chooseStep={chooseStep} />
            </MarginContentContainer>
            <MarginContentContainer>
                <CenteredContentContainer>
                    <MarginContentContainer>
                        <Systemtittel>{activeRoute.label}</Systemtittel>
                    </MarginContentContainer>
                </CenteredContentContainer>
                {activeStep === 0 && <PersonligeOpplysningerPage next={() => next()} />}
                {activeStep === 1 && (
                    <VedtaketPage
                        foundVedtak={props.foundVedtak}
                        activeVedtak={activeVedtak}
                        submitVedtak={(activeVedtak: Vedtak) => setVedtak(activeVedtak)}
                    />
                )}
                {activeStep === 2 && (
                    <BegrunnelsePage
                        activeBegrunnelse={activeBegrunnelse}
                        submitBegrunnelse={(activeBegrunnelse: string) => submitBegrunnelse(activeBegrunnelse)}
                        submitVedlegg={(id: number, vedlegg: File[]) => submitVedlegg(id, vedlegg)}
                    />
                )}
                {activeStep === 3 && (
                    <OppsummeringSkjemaPage
                        person={props.person}
                        vedtak={activeVedtak}
                        vedlegg={activeVedlegg}
                        begrunnelse={activeBegrunnelse}
                        submitForm={() => submitForm()}
                    />
                )}
            </MarginContentContainer>
        </>
    );
};

export default IkkeValgtVedtakForm;
