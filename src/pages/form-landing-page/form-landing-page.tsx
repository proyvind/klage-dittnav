import queryString from 'query-string';
import React, { useState, useEffect } from 'react';
import { Vedtak } from '../../types/vedtak';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth, setValgtYtelse } from '../../store/actions';
import { Store } from '../../store/reducer';
import MainFormPage from './main-form-page';
import { elementAsVedtak, validVedtakQuery } from '../../mock-api/get/vedtak';
import WithLoading from '../../components/general/loading/withLoading';
import { Tema } from '../../types/tema';
import { logInfo } from '../../utils/logger/frontendLogger';

const FormLandingPage = (props: any) => {
    const dispatch = useDispatch();
    const { loading, chosenYtelse } = useSelector((state: Store) => state);

    const [chosenVedtak, setChosenVedtak] = useState<Vedtak>();

    useEffect(() => {
        dispatch(checkAuth(props.location.search));
    }, [dispatch, props.location.search]);

    useEffect(() => {
        if (props.location.search !== '') {
            let query = queryString.parse(props.location.search);

            if (query.ytelse && !Array.isArray(query.ytelse)) {
                dispatch(setValgtYtelse(query.ytelse));
            } else if (query.tema && !Array.isArray(query.tema)) {
                query.ytelse = Tema[query.tema] ?? Tema['UKJ'];
                if (query.ytelse && !Array.isArray(query.ytelse)) {
                    dispatch(setValgtYtelse(query.ytelse));
                }
            }

            if (validVedtakQuery(query)) {
                setChosenVedtak(elementAsVedtak(query));
            }
        }
    }, [dispatch, props.location.search, chosenYtelse]);

    logInfo('Form landing page visited.', { chosenYtelse: chosenYtelse, referrer: document.referrer });

    return (
        <WithLoading loading={loading}>
            <MainFormPage ytelse={chosenYtelse} chosenVedtak={chosenVedtak} />
        </WithLoading>
    );
};

export default FormLandingPage;
