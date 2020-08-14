import queryString from 'query-string';
import React, { useState, useEffect } from 'react';
import { Vedtak } from '../../types/vedtak';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth, setValgtYtelse } from '../../store/actions';
import { Store } from '../../store/reducer';
import MainFormPage from './main-form-page';
import { elementAsVedtak, validVedtakQuery } from '../../mock-api/get/vedtak';
import NotFoundPage from '../not-found/not-found-page';
import { isValidYtelse } from '../../utils/routes.config';
import WithLoading from '../../components/general/loading/withLoading';

const FormLandingPage = (props: any) => {
    const dispatch = useDispatch();
    const { loading, chosenYtelse } = useSelector((state: Store) => state);

    const [availableVedtak] = useState<Vedtak[]>([]);
    const [chosenVedtak, setChosenVedtak] = useState<Vedtak>();

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    useEffect(() => {
        if (props.location.search !== '') {
            let query = queryString.parse(props.location.search);

            if (query.ytelse && !Array.isArray(query.ytelse)) {
                dispatch(setValgtYtelse(query.ytelse));
            }

            if (validVedtakQuery(query)) {
                setChosenVedtak(elementAsVedtak(query));
            }
        }
    }, [dispatch, props.location.search, chosenYtelse]);

    if (isValidYtelse(chosenYtelse)) {
        return (
            <WithLoading loading={loading}>
                <MainFormPage ytelse={chosenYtelse} availableVedtak={availableVedtak} chosenVedtak={chosenVedtak} />
            </WithLoading>
        );
    }
    return <NotFoundPage />;
};

export default FormLandingPage;
