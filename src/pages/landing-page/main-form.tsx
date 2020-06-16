import React, { useState } from 'react';
import { Vedtak } from '../../types/vedtak';
import BegrunnelsePage from '../begrunnelse/begrunnelse-page';
import VedtaketPage from '../vedtaket/vedtaket-page';
import { routesStepsIkkeValgtVedtak, routesStepsValgtVedtak, FormStep } from '../../utils/routes.config';
import { MarginContainer, ContentContainer, CenteredContainer } from '../../styled-components/main-styled-components';
import Steps from '../../components/steps/steps';
import { Systemtittel } from 'nav-frontend-typografi';
import OppsummeringSkjemaPage from '../oppsummering-skjema-page/oppsummering-skjema-page';
import { constructKlage, Klage } from '../../types/klage';
import { Bruker } from '../../types/bruker';

interface Props {
    person: Bruker;
    availableVedtak: Vedtak[];
    chosenVedtak?: Vedtak;
    submitKlage(klage: Klage): any;
}

const MainForm = (props: Props) => {
    const [activeStep, setActiveStep] = useState<number>(0);
    const [activeVedtak, setActiveVedtak] = useState<Vedtak>(new Vedtak());
    const [activeBegrunnelse, setActiveBegrunnelse] = useState<string>('');
    // eslint-disable-next-line
    const [activeVedlegg, setActiveVedlegg] = useState<File[]>([]);
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

    const submitDraft = () => {
        // Submit form as DRAFT
        let klage = constructKlage(activeVedtak, activeBegrunnelse);
        return props.submitKlage(klage);
    };

    const submitBegrunnelse = async (begrunnelse: string) => {
        setActiveBegrunnelse(begrunnelse);
        submitDraft().then((res: any) => {
            return res;
        });
        next();
    };

    const submitForm = () => {
        let klage = constructKlage(activeVedtak, activeBegrunnelse);
        props.submitKlage(klage);
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
                    <BegrunnelsePage
                        activeBegrunnelse={activeBegrunnelse}
                        activeVedlegg={activeVedlegg}
                        activeVedtak={props.chosenVedtak}
                        submitBegrunnelse={(activeBegrunnelse: string) => submitBegrunnelse(activeBegrunnelse)}
                        next={() => next()}
                    />
                )}
                {activeRoute.label === 'Oppsummering' && (
                    <OppsummeringSkjemaPage
                        person={props.person}
                        vedtak={props.chosenVedtak ?? activeVedtak}
                        vedlegg={activeVedlegg}
                        begrunnelse={activeBegrunnelse}
                        submitForm={() => submitForm()}
                    />
                )}
            </MarginContainer>
        </ContentContainer>
    );
};

export default MainForm;
