import React, { useState, useEffect } from 'react';
import { Select, Input } from 'nav-frontend-skjema';
import { Vedtak } from '../../types/vedtak';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { MarginContainer, CenteredContainer } from '../../styled-components/main-styled-components';
import { Hovedknapp } from 'nav-frontend-knapper';
import { getTemaer } from '../../services/klageService';
import NavFrontendSpinner from 'nav-frontend-spinner';

const VedtakFormManual = (props: any) => {
    const mock_enheter = ['A', 'B', 'C'];

    const [activeVedtak, setActiveVedtak] = useState<Vedtak>(
        props.activeVedtak ?? {
            tema: '',
            vedtaksdato: new Date(),
            enhet: mock_enheter[0],
            NAV_referanse: ''
        }
    );

    const [temaer, setTemaer] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const updateVedtak = (name: string, value: any) => {
        setActiveVedtak({ ...activeVedtak, [name]: value });
    };

    useEffect(() => {
        getTemaer()
            .then(temaer => {
                setTemaer(temaer);
            })
            .catch(err => {});
        setIsLoading(false);
    }, [isLoading]);

    const submitVedtak = (event: any, activeVedtak: Vedtak) => {
        event.preventDefault();
        props.submitVedtak(activeVedtak);
    };

    if (!isLoading) {
        return (
            <form onSubmit={(event: any) => submitVedtak(event, activeVedtak)}>
                <Select
                    name="enhet"
                    value={activeVedtak.enhet}
                    label="NAV-enheten som har behandlet saken din:"
                    onChange={e => updateVedtak(e.target.name, e.target.value)}
                >
                    {mock_enheter.map((n: string) => (
                        <option value={n} key={n}>
                            Alternativ {n}
                        </option>
                    ))}
                </Select>

                <Select
                    name="tema"
                    value={activeVedtak.tema}
                    label="Tema:"
                    onChange={e => updateVedtak(e.target.name, e.target.value)}
                >
                    {Object.keys(temaer).map((key: string) => (
                        <option value={key} key={key}>
                            {key} - {temaer[key]}
                        </option>
                    ))}
                </Select>

                <MarginContainer>
                    <DayPickerInput
                        value={activeVedtak.vedtaksdato}
                        onDayChange={date => updateVedtak('vedtaksdato', date)}
                    />
                </MarginContainer>

                <MarginContainer>
                    <Input
                        name="NAV_referanse"
                        value={activeVedtak.NAV_referanse}
                        label="NAVs referanse:"
                        onChange={e => updateVedtak(e.target.name, e.target.value)}
                    />
                </MarginContainer>

                <MarginContainer>
                    <CenteredContainer>
                        <Hovedknapp>Gå videre</Hovedknapp>
                    </CenteredContainer>
                </MarginContainer>
            </form>
        );
    } else {
        return <NavFrontendSpinner />;
    }
};

export default VedtakFormManual;
