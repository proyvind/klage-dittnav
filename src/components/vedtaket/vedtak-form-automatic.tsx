import React, { useState } from 'react';
import { Select } from 'nav-frontend-skjema';
import InformationPointBox from '../general/information-point-box';
import { Vedtak } from '../../types/vedtak';
import { Hovedknapp } from 'nav-frontend-knapper';
import { MarginContentContainer, CenteredContentContainer } from '../../styled-components/main-styled-components';
import { formatDate } from '../../utils/date-util';
import Lenke from 'nav-frontend-lenker';

const VedtakFormAutomatic = (props: any) => {
    const [activeVedtak, setActiveVedtak] = useState<Vedtak>(
        props.activeVedtak?.tittel ? props.activeVedtak : props.foundVedtak ? props.foundVedtak[0] : new Vedtak()
    );

    const submitVedtak = (event: any, activeVedtak: Vedtak) => {
        event.preventDefault();
        props.submitVedtak(activeVedtak);
    };

    return (
        <form onSubmit={(event: any) => submitVedtak(event, activeVedtak)}>
            <Select
                label="Vedtak:"
                value={props.foundVedtak?.indexOf(activeVedtak)}
                onChange={e => setActiveVedtak(props.foundVedtak[e.target.value])}
            >
                {props.foundVedtak.map((vedtak: any, index: number) => (
                    <option value={index} key={index}>
                        {vedtak.tittel}
                    </option>
                ))}
            </Select>

            <MarginContentContainer>
                <Lenke href="#" onClick={() => props.showManualForm()}>
                    Finner du ikke vedtaket du vil klage på? Send klage her
                </Lenke>
            </MarginContentContainer>

            <MarginContentContainer>
                <InformationPointBox
                    header="NAV-enheten som har behandlet saken"
                    info={activeVedtak?.enhet || 'Velg vedtak over'}
                />
            </MarginContentContainer>

            <MarginContentContainer>
                <InformationPointBox header="NAV-referanse" info={activeVedtak?.NAV_referanse || 'Velg vedtak over'} />
            </MarginContentContainer>

            <MarginContentContainer>
                <InformationPointBox
                    header="Vedteksdato"
                    info={formatDate(activeVedtak?.vedtaksdato) || 'Velg vedtak over'}
                />
            </MarginContentContainer>

            <MarginContentContainer>
                <CenteredContentContainer>
                    <Hovedknapp>Gå videre</Hovedknapp>
                </CenteredContentContainer>
            </MarginContentContainer>
        </form>
    );
};

export default VedtakFormAutomatic;
