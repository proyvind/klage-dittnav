import React, { useState } from 'react';
import { Vedtak } from '../../types/vedtak';
import { MarginContainer, CenteredContainer } from '../../styled-components/main-styled-components';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Datovelger } from 'nav-datovelger';
import { klageSkjemaBasertPaaVedtak } from '../../types/klage';
import { postNewKlage } from '../../store/actions';
import { useDispatch } from 'react-redux';
import { Element, Normaltekst } from 'nav-frontend-typografi';

const VedtakFormManual = (props: any) => {
    const MOCK_ENHET = { FOP: 'NAV Familie og pensjon' };
    const dispatch = useDispatch();

    const erFamilieOgPensjonEnhet = (): boolean => {
        // TODO: Litt midlertidlig losning
        return ['foreldrepenger', 'engangsstonad', 'svangerskapspenger'].indexOf(props.ytelse) > -1;
    };

    const [activeVedtak, setActiveVedtak] = useState<Vedtak>({
        tema: erFamilieOgPensjonEnhet() ? 'FOR' : '',
        vedtaksdato: '',
        enhet: erFamilieOgPensjonEnhet() ? 'FOP' : '',
        NAV_referanse: ''
    });

    const updateVedtak = (name: string, value: any) => {
        setActiveVedtak({ ...activeVedtak, [name]: value });
    };

    const submitVedtak = (event: any, activeVedtak: Vedtak) => {
        event.preventDefault();
        dispatch(postNewKlage(klageSkjemaBasertPaaVedtak(activeVedtak)));
        props.next();
    };

    return (
        <form onSubmit={(event: any) => submitVedtak(event, activeVedtak)}>
            <MarginContainer>
                <Element>NAV-enheten som har behandlet saken</Element>
                <Normaltekst>{MOCK_ENHET[activeVedtak.enhet] ?? '-'}</Normaltekst>
            </MarginContainer>

            <MarginContainer>
                <Element>Vedtaksdato</Element>
                <Datovelger
                    onChange={(date: any) => updateVedtak('vedtaksdato', date)}
                    valgtDato={activeVedtak.vedtaksdato}
                    visÅrVelger={true}
                    avgrensninger={{
                        maksDato: new Date().toISOString().substring(0, 10)
                    }}
                />
            </MarginContainer>

            <MarginContainer>
                <CenteredContainer>
                    <Hovedknapp>Gå videre</Hovedknapp>
                </CenteredContainer>
            </MarginContainer>
        </form>
    );
};

export default VedtakFormManual;
