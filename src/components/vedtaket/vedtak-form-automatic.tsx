import React, { useState } from 'react';
import { Select } from 'nav-frontend-skjema';
import InformationPointBox from '../general/information-point-box';
import { Vedtak } from '../../types/vedtak';
import { Hovedknapp } from 'nav-frontend-knapper';
import { MarginContentContainer, CenteredContentContainer } from '../../styled-components/main-styled-components';
import { formatDate } from '../../utils/date-util';
import Lenke from 'nav-frontend-lenker';

const VedtakFormAutomatic = (props: any) => {
    const [activeVedtak, setActiveVedtak] = useState<Vedtak>(props.FOUND_VEDTAK[0] || null);
    const [activeIssue, setActiveIssue] = useState<number>(1);

    const submitVedtak = (event: any) => {
        console.log(activeIssue);
        event.preventDefault();
        // TODO
    };

    return (
        <form onSubmit={submitVedtak}>
            <Select label="Vedtak:" onChange={e => setActiveVedtak(props.FOUND_VEDTAK[e.target.value])}>
                {props.FOUND_VEDTAK.map((vedtak: any, index: number) => (
                    <option value={index} key={index}>
                        {vedtak.title}
                    </option>
                ))}
            </Select>

            {/* TODO: Separate page? */}
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

            <Select label="Hva gjelder klagen?" onChange={e => setActiveIssue(+e.target.value)}>
                {[1, 2, 3, 4, 5].map((n: number) => (
                    <option value={n} key={n}>
                        Alternativ {n}
                    </option>
                ))}
            </Select>

            <MarginContentContainer>
                <CenteredContentContainer>
                    <Hovedknapp>Gå videre</Hovedknapp>
                </CenteredContentContainer>
            </MarginContentContainer>
        </form>
    );
};

export default VedtakFormAutomatic;
