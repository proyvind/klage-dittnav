import React, { useState, useEffect } from 'react';
import { Vedtak } from '../../types/vedtak';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth, getExistingKlage, setKlageId } from '../../store/actions';
import { Store } from '../../store/reducer';
import WithLoading from '../../components/general/loading/withLoading';
import { logInfo } from '../../utils/logger/frontendLogger';
import { validVedtakQuery, elementAsVedtak } from '../../mock-api/get/vedtak';
import MainFormPage from '../../pages/form-landing-page/main-form-page';
import Error from '../../components/error/error';

const FormLanding = (props: any) => {
    const dispatch = useDispatch();
    const { loading, chosenTema, chosenYtelse, getKlageError, klageId, activeKlage } = useSelector(
        (state: Store) => state
    );

    const [chosenVedtak, setChosenVedtak] = useState<Vedtak>();
    const [temaNotSet, setTemaNotSet] = useState<boolean>(false);

    useEffect(() => {
        if (validVedtakQuery(props.query)) {
            dispatch(checkAuth(props.location.search));
            if (props.query.klageid && klageId === '') {
                dispatch(setKlageId(props.query.klageid as string));
            } else {
                setChosenVedtak(elementAsVedtak(props.query));
            }
        } else {
            setTemaNotSet(chosenTema === '');
        }
    }, [dispatch, props.location.search, props.query, klageId, chosenTema]);

    useEffect(() => {
        if (klageId !== '' && activeKlage.tema === '') {
            dispatch(getExistingKlage(parseInt(klageId)));
        }
    }, [dispatch, klageId, activeKlage]);

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
    } else if (getKlageError) {
        logInfo('Form landing page visited, get klage failed.', { referrer: document.referrer });
        return (
            <Error
                error={{
                    code: 400,
                    text: 'Klagen du ba om kan ikke hentes. Prøv på nytt fra lenken på Ditt NAV.'
                }}
            />
        );
    } else {
        return (
            <WithLoading loading={loading}>
                <MainFormPage path={props.path} ytelse={chosenYtelse} chosenVedtak={chosenVedtak} />
            </WithLoading>
        );
    }
};

export default FormLanding;
