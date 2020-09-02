import React, { useState, useEffect } from 'react';
import { Vedtak } from '../../types/vedtak';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from '../../store/actions';
import { Store } from '../../store/reducer';
import WithLoading from '../../components/general/loading/withLoading';
import { logInfo } from '../../utils/logger/frontendLogger';
import { validVedtakQuery, elementAsVedtak } from '../../mock-api/get/vedtak';
import MainFormPage from '../../pages/form-landing-page/main-form-page';
import Error from '../../components/error/error';

const FormLanding = (props: any) => {
    const dispatch = useDispatch();
    const { loading, chosenYtelse } = useSelector((state: Store) => state);

    const [chosenVedtak, setChosenVedtak] = useState<Vedtak>();
    const [temaNotSet, setTemaNotSet] = useState<boolean>(false);

    useEffect(() => {
        if (validVedtakQuery(props.query)) {
            dispatch(checkAuth(props.location.search));
            setChosenVedtak(elementAsVedtak(props.query));
        } else {
            setTemaNotSet(true);
        }
    }, [dispatch, props.location.search, props.query]);

    logInfo('Form landing page visited.', { chosenYtelse: chosenYtelse, referrer: document.referrer });

    if (temaNotSet) {
        logInfo('Form landing page visited with no tema.', { referrer: document.referrer });
        return (
            <Error
                error={{
                    code: 400,
                    text:
                        'Ytelse du ønsker å klage på er ikke spesifisert. Dersom du navigerer til denne siden via en lenke på Ditt NAV vil ytelse bli satt riktig.'
                }}
            />
        );
    } else {
        return (
            <WithLoading loading={loading}>
                <MainFormPage ytelse={chosenYtelse} chosenVedtak={chosenVedtak} />
            </WithLoading>
        );
    }
};

export default FormLanding;
