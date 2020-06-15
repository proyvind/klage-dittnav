import React, { useState } from 'react';
import { Select } from 'nav-frontend-skjema';
import InformationPointBox from '../general/information-point-box';
import { Vedtak } from '../../types/vedtak';
import { Hovedknapp } from 'nav-frontend-knapper';
import { MarginContainer, CenteredContainer } from '../../styled-components/main-styled-components';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst } from 'nav-frontend-typografi';

const VedtakFormAutomatic = (props: any) => {
    const [activeVedtak, setActiveVedtak] = useState<Vedtak>(
        props.activeVedtak?.tittel
            ? props.activeVedtak
            : props.availableVedtak
            ? props.availableVedtak[0]
            : new Vedtak()
    );

    const submitVedtak = (event: any, activeVedtak: Vedtak) => {
        event.preventDefault();
        props.submitVedtak(activeVedtak);
    };

    const existsOnlyOneVedtak = () => {
        return props.availableVedtak.length === 1;
    };

    return (
        <form onSubmit={(event: any) => submitVedtak(event, activeVedtak)}>
            {props.availableVedtak ? (
                existsOnlyOneVedtak() ? (
                    <InformationPointBox
                        header="Følgende sak er registert på deg:"
                        info={props.availableVedtak[0].tittel}
                    />
                ) : (
                    <Select
                        label="Velg sak:"
                        value={props.availableVedtak?.indexOf(activeVedtak)}
                        onChange={e => setActiveVedtak(props.availableVedtak[e.target.value])}
                    >
                        {props.availableVedtak.map((vedtak: any, index: number) => (
                            <option value={index} key={index}>
                                {vedtak.tittel}
                            </option>
                        ))}
                    </Select>
                )
            ) : (
                <Normaltekst>Ingen vedtak funnet</Normaltekst>
            )}

            <MarginContainer>
                <Lenke href="#" onClick={() => props.showManualForm()}>
                    Finner du ikke vedtaket du vil klage på? Send klage her
                </Lenke>
            </MarginContainer>

            <MarginContainer>
                <CenteredContainer>
                    <Hovedknapp>Gå videre</Hovedknapp>
                </CenteredContainer>
            </MarginContainer>
        </form>
    );
};

export default VedtakFormAutomatic;
