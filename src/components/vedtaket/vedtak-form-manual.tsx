import React, { useState } from 'react';
import { Select, Input } from 'nav-frontend-skjema';
import { Vedtak } from '../../types/vedtak';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { MarginContentContainer, CenteredContentContainer } from '../../styled-components/main-styled-components';
import { Hovedknapp } from 'nav-frontend-knapper';

const VedtakFormManual = () => {
    const [activeVedtak, setActiveVedtak] = useState<Vedtak>({} as Vedtak);
    const [activeIssue, setActiveIssue] = useState<number>(1);

    const updateVedtak = (name: string, value: any) => {
        setActiveVedtak({ ...activeVedtak, [name]: value });
    };

    const submitVedtak = (event: any) => {
        console.log(activeIssue);
        event.preventDefault();
        // TODO
    };

    return (
        <form onSubmit={submitVedtak}>
            <Select
                name="enhet"
                label="NAV-enheten som har behandlet saken din:"
                onChange={e => updateVedtak(e.target.name, e.target.value)}
            >
                {['A', 'B', 'C'].map((n: string) => (
                    <option value={n} key={n}>
                        Alternativ {n}
                    </option>
                ))}
            </Select>

            <MarginContentContainer>
                <DayPickerInput onDayChange={date => updateVedtak('vedtaksdato', date)} />
            </MarginContentContainer>

            <Select label="Hva gjelder klagen?" onChange={e => setActiveIssue(+e.target.value)}>
                {[1, 2, 3, 4, 5].map((n: number) => (
                    <option value={n} key={n}>
                        Alternativ {n}
                    </option>
                ))}
            </Select>

            <MarginContentContainer>
                <Input
                    name="NAV_referanse"
                    label="NAVs referanse:"
                    onChange={e => updateVedtak(e.target.name, e.target.value)}
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

export default VedtakFormManual;
