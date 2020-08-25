import React, { useState, useEffect } from 'react';
import { Vedtak } from '../../types/vedtak';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from '../../store/actions';
import { Store } from '../../store/reducer';
import WithLoading from '../../components/general/loading/withLoading';
import { logInfo } from '../../utils/logger/frontendLogger';
import { validVedtakQuery, elementAsVedtak } from '../../mock-api/get/vedtak';
import MainFormPage from '../../pages/form-landing-page/main-form-page';

const FormLanding = (props: any) => {
    const dispatch = useDispatch();
    const { loading, chosenYtelse } = useSelector((state: Store) => state);

    const [chosenVedtak, setChosenVedtak] = useState<Vedtak>();

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    useEffect(() => {
        if (validVedtakQuery(props.query)) {
            setChosenVedtak(elementAsVedtak(props.query));
        }
    }, [dispatch, props.query]);

    logInfo('Form landing page visited.', { chosenYtelse: chosenYtelse, referrer: document.referrer });

    return (
        <WithLoading loading={loading}>
            <MainFormPage ytelse={chosenYtelse} chosenVedtak={chosenVedtak} />
        </WithLoading>
    );
};

export default FormLanding;
