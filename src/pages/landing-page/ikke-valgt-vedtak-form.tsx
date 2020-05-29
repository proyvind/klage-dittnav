import React, { useState, useEffect } from 'react';
import PersonligeOpplysningerPage from '../personlige-opplysninger/personlige-opplysninger-page';
import { Vedtak } from '../../types/vedtak';
import BegrunnelsePage from '../begrunnelse/begrunnelse-page';
import VedtaketPage from '../vedtaket/vedtaket-page';
import { RouteType, routesStepsIkkeValgtVedtak } from '../../utils/routes.config';
import { MarginContentContainer, CenteredContentContainer } from '../../styled-components/main-styled-components';
import Steps from '../../components/steps/steps';
import { Systemtittel } from 'nav-frontend-typografi';
import OppsummeringSkjemaPage from '../oppsummering-skjema-page/oppsummering-skjema-page';
import { Klage, KlageStatus } from '../../types/klage';
import { Bruker } from '../../types/bruker';

const IkkeValgtVedtakForm = (props: any) => {
    const [activeStep, setActiveStep] = useState<number>(props.activeStep || 0);
    const [activeVedtak, setActiveVedtak] = useState<Vedtak>(new Vedtak());
    // const [activeKlage, setActiveKlage] = useState<Klage>();
    const [activeBegrunnelse, setActiveBegrunnelse] = useState<string>('');
    const [formSubmit, setFormSubmit] = useState<boolean>(false);

    let activeRoutes: RouteType[] = routesStepsIkkeValgtVedtak;
    let activeRoute: RouteType = activeRoutes[activeStep];

    useEffect(() => {
        // If form valid
        submitForm();
    }, [formSubmit]);

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
        setFormSubmit(true);
        setActiveStep(activeStep + 1);
    };

    const submitForm = () => {
        // Submit form as DRAFT
        console.log('submit');
        console.log('Can post person details: ', props.person);
        console.log('Can post vedtak: ', activeVedtak);
        console.log('Can post begrunnelse: ', activeBegrunnelse);
        let klage = constructKlage(props.person, activeVedtak, activeBegrunnelse, KlageStatus.DRAFT);
    };

    const constructKlage = (person: Bruker, vedtak: Vedtak, begrunnelse: string, status: KlageStatus): Klage => {
        const klage: Klage = {
            foedselsnummer: person.foedselsnummer,
            fritekst: begrunnelse,
            status: status,
            tema: vedtak.tema,
            enhetId: vedtak.enhet,
            vedtaksdato: vedtak.vedtaksdato,
            referanse: vedtak.NAV_referanse
            // vedlegg?:
        };
        console.log('klage: created: ', klage);
        return klage;
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
