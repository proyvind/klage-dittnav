import React, { useState, useEffect } from 'react';
import { Select, Input } from 'nav-frontend-skjema';
import { Vedtak } from '../../types/vedtak';
import { MarginContainer, CenteredContainer } from '../../styled-components/main-styled-components';
import { Hovedknapp } from 'nav-frontend-knapper';
import { getTemaer } from '../../services/klageService';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Datovelger } from 'nav-datovelger';
import { constructKlage } from '../../types/klage';
import { postNewKlage } from '../../store/actions';
import { useDispatch } from 'react-redux';

const VedtakFormManual = (props: any) => {
    const mock_enheter = ['A', 'B', 'C'];
    const dispatch = useDispatch();

    const [activeVedtak, setActiveVedtak] = useState<Vedtak>(
        props.activeVedtak ?? {
            tema: '',
            vedtaksdato: new Date().toISOString().substring(0, 10),
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
        dispatch(postNewKlage(constructKlage(activeVedtak)));
        props.next();
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
