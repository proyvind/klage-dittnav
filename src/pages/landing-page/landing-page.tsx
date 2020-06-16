import queryString from 'query-string';
import React, { useState, useEffect } from 'react';
import { Vedtak } from '../../types/vedtak';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from '../../store/actions';
import { Store } from '../../store/reducer';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { getVedtak, postKlage } from '../../services/klageService';
import { Klage } from '../../types/klage';
import MainForm from './main-form';
import { instanceOfVedtak, elementAsVedtak } from '../../mock-api/get/vedtak';

const LandingPage = (props: any) => {
    const dispatch = useDispatch();
    const { loading, person } = useSelector((state: Store) => state);

    const [availableVedtak, setAvailableVedtak] = useState<Vedtak[]>([]);
    const [chosenVedtak, setChosenVedtak] = useState<Vedtak>();

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    useEffect(() => {
        if (props.location.search !== '') {
            let query = queryString.parse(props.location.search);
            if (instanceOfVedtak(query)) {
                setChosenVedtak(getChosenVedtak(query));
            }
        } else {
            getData();
        }
    }, [props.location.search]);

    if (loading) {
        return <NavFrontendSpinner type={'XL'} />;
    }

    const getData = async () => {
        const FOUND_VEDTAK = await getVedtak();
        setAvailableVedtak(FOUND_VEDTAK);
    };

    const getChosenVedtak = (query: any): Vedtak => {
        return elementAsVedtak(query);
    };

    const submitKlage = (klage: Klage) => {
        // Submit form as DRAFT
        console.log('Skal sende inn ', klage);
        return postKlage(klage);
    };

    if (!loading) {
        return (
            <div>
                <MainForm
                    person={person}
                    availableVedtak={availableVedtak}
                    chosenVedtak={chosenVedtak}
                    submitKlage={(klage: Klage) => submitKlage(klage)}
                />
            </div>
        );
    } else {
        return <NavFrontendSpinner />;
    }
};

export default LandingPage;
