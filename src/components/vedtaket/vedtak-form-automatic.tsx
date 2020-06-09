import React, { useState } from 'react';
import { Select } from 'nav-frontend-skjema';
import InformationPointBox from '../general/information-point-box';
import { Vedtak } from '../../types/vedtak';
import { Hovedknapp } from 'nav-frontend-knapper';
import { MarginContentContainer, CenteredContentContainer } from '../../styled-components/main-styled-components';
import { formatDate } from '../../utils/date-util';
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

    return (
        <form onSubmit={(event: any) => submitVedtak(event, activeVedtak)}>
            {props.availableVedtak ? (
                <Select
                    label="Vedtak:"
                    value={props.availableVedtak?.indexOf(activeVedtak)}
                    onChange={e => setActiveVedtak(props.availableVedtak[e.target.value])}
                >
                    {props.availableVedtak.map((vedtak: any, index: number) => (
                        <option value={index} key={index}>
                            {vedtak.tittel}
                        </option>
                    ))}
                </Select>
            ) : (
                <Normaltekst>Ingen vedtak funnet</Normaltekst>
            )}

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
