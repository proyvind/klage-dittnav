import queryString from 'query-string';
import React, { useState, useEffect } from 'react';
import { Vedtak } from '../../types/vedtak';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from '../../store/actions';
import { Store } from '../../store/reducer';
import NavFrontendSpinner from 'nav-frontend-spinner';
import MainFormPage from './main-form-page';
import { instanceOfVedtak, elementAsVedtak } from '../../mock-api/get/vedtak';
import NotFoundPage from '../not-found/not-found-page';
import { isValidYtelse } from '../../utils/routes.config';

const FormLandingPage = (props: any) => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state: Store) => state);

    const [availableVedtak] = useState<Vedtak[]>([]);
    const [chosenVedtak, setChosenVedtak] = useState<Vedtak>();
    const chosenYtelse = props.match.params.ytelse ?? '';

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    useEffect(() => {
        if (props.location.search !== '') {
            let query = queryString.parse(props.location.search);
            query.ytelse = chosenYtelse;
            if (instanceOfVedtak(query)) {
                setChosenVedtak(elementAsVedtak(query));
            }
        }
    }, [props.location.search, chosenYtelse]);

    if (loading) {
        return <NavFrontendSpinner type={'XL'} />;
    }

    if (isValidYtelse(chosenYtelse)) {
        return <MainFormPage ytelse={chosenYtelse} availableVedtak={availableVedtak} chosenVedtak={chosenVedtak} />;
    }
    return <NotFoundPage />;
};

export default FormLandingPage;
