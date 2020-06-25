import queryString from 'query-string';
import React, { useState, useEffect } from 'react';
import { Vedtak } from '../../types/vedtak';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from '../../store/actions';
import { Store } from '../../store/reducer';
import NavFrontendSpinner from 'nav-frontend-spinner';
import MainFormPage from './main-form-page';
import { instanceOfVedtak, elementAsVedtak } from '../../mock-api/get/vedtak';

const FormLandingPage = (props: any) => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state: Store) => state);

    const [availableVedtak] = useState<Vedtak[]>([]);
    const [chosenVedtak, setChosenVedtak] = useState<Vedtak>();

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    const getChosenVedtak = (query: any): Vedtak => {
        return elementAsVedtak(query);
    };

    useEffect(() => {
        if (props.location.search !== '') {
            let query = queryString.parse(props.location.search);
            if (instanceOfVedtak(query)) {
                setChosenVedtak(getChosenVedtak(query));
            }
        }
    }, [props.location.search]);

    if (loading) {
        return <NavFrontendSpinner type={'XL'} />;
    }

    const getChosenYtelse = () => {
        return props.match.params.ytelse;
    };

    return (
        <div>
            <MainFormPage ytelse={getChosenYtelse()} availableVedtak={availableVedtak} chosenVedtak={chosenVedtak} />
        </div>
    );
};

export default FormLandingPage;
