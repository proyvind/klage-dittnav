import React, { useState, useEffect } from 'react';
import { Select, Input } from 'nav-frontend-skjema';
import { Vedtak } from '../../types/vedtak';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { MarginContentContainer, CenteredContentContainer } from '../../styled-components/main-styled-components';
import { Hovedknapp } from 'nav-frontend-knapper';
import { getTemaer } from '../../services/klageService';
import NavFrontendSpinner from 'nav-frontend-spinner';

const VedtakFormManual = (props: any) => {
    const [activeVedtak, setActiveVedtak] = useState<Vedtak>({} as Vedtak);
    const [temaer, setTemaer] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getData();
    }, []);

    const updateVedtak = (name: string, value: any) => {
        setActiveVedtak({ ...activeVedtak, [name]: value });
    };

    const submitVedtak = (event: any, activeVedtak: Vedtak) => {
        event.preventDefault();
        props.submitVedtak(activeVedtak);
    };

    const getData = async () => {
        let TEMAER = await getTemaer();
        setTemaer(TEMAER);
        setIsLoading(false);
    };

    if (!isLoading) {
        return (
            <form onSubmit={(event: any) => submitVedtak(event, activeVedtak)}>
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

                <Select name="tema" label="Tema:" onChange={e => updateVedtak(e.target.name, e.target.value)}>
                    {temaer.map((tema: string, index: number) => (
                        <option value={tema} key={index}>
                            {tema}
                        </option>
                    ))}
                </Select>

                <MarginContentContainer>
                    <DayPickerInput onDayChange={date => updateVedtak('vedtaksdato', date)} />
                </MarginContentContainer>

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
    } else {
        return <NavFrontendSpinner />;
    }
};

export default VedtakFormManual;
