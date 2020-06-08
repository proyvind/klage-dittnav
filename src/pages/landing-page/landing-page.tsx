import queryString from 'query-string';
import React, { useState, useEffect } from 'react';
import { Vedtak } from '../../types/vedtak';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from '../../store/actions';
import { Store } from '../../store/reducer';
import NavFrontendSpinner from 'nav-frontend-spinner';
import IkkeValgtVedtakForm from './ikke-valgt-vedtak-form';
import ValgtVedtakForm from './valgt-vedtak-form';
import { getVedtak, postKlage } from '../../services/klageService';
import { Klage } from '../../types/klage';

const instanceOfVedtak = (element: any): boolean => {
    return (
        'tittel' in element &&
        'vedtaksdato' in element &&
        'tema' in element &&
        'enhet' in element &&
        'NAV_referanse' in element
    );
};

const elementAsVedtak = (element: any): Vedtak => {
    let chosenVedtak: Vedtak = {
        tittel: element?.tittel,
        vedtaksdato: element?.vedtaksdato,
        tema: element?.tema,
        enhet: element?.enhet,
        NAV_referanse: element?.NAV_referanse
    };
    return chosenVedtak;
};

const LandingPage = (props: any) => {
    const dispatch = useDispatch();
    const { loading, person } = useSelector((state: Store) => state);

    const [foundVedtak, setFoundVedtak] = useState<Vedtak[]>();
    const [chosenVedtak, setChosenVedtak] = useState<Vedtak>();
    const [activeStep, setActiveStep] = useState<number>(props.activeStep || 0);

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    useEffect(() => {
        const setVedtak = () => {
            let query = queryString.parse(props.location.search);
            if (instanceOfVedtak(query)) {
                setChosenVedtak(getChosenVedtak(query));
            }
        };

        if (props.location.search !== '') {
            setVedtak();
        } else {
            getData();
        }
    }, [props.location.search]);

    if (loading) {
        return <NavFrontendSpinner type={'XL'} />;
    }

    const getData = async () => {
        const FOUND_VEDTAK = await getVedtak();
        setFoundVedtak(FOUND_VEDTAK);
    };

    const getChosenVedtak = (query: any): Vedtak => {
        return elementAsVedtak(query);
    };

    const next = () => {
        setActiveStep(activeStep + 1);
    };

    const submitKlage = (klage: Klage) => {
        // Submit form as DRAFT
        return postKlage(klage);
    };

    if (!loading) {
        return (
            <div>
                {!chosenVedtak && (
                    <IkkeValgtVedtakForm
                        person={person}
                        foundVedtak={foundVedtak}
                        next={() => next()}
                        submitKlage={(klage: Klage) => submitKlage(klage)}
                    />
                )}
                {chosenVedtak && (
                    <ValgtVedtakForm
                        person={person}
                        vedtak={chosenVedtak}
                        submitKlage={(klage: Klage) => submitKlage(klage)}
                    />
                )}
            </div>
        );
    } else {
        return <NavFrontendSpinner />;
    }
};

export default LandingPage;
