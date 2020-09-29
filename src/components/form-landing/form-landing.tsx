import React, { useState, useEffect } from 'react';
import { Vedtak } from '../../types/vedtak';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth, getExistingKlage } from '../../store/actions';
import { Store } from '../../store/reducer';
import WithLoading from '../../components/general/loading/withLoading';
import { logInfo } from '../../utils/logger/frontendLogger';
import { queryToVedtak } from '../../mock-api/get/vedtak';
import MainFormPage from '../../pages/form-landing-page/main-form-page';
import Error from '../../components/error/error';
import queryString from 'query-string';
import * as H from 'history';

interface Props {
    query: queryString.ParsedQuery<string>;
    location: H.Location;
    path: string;
}

const FormLanding = (props: Props) => {
    const dispatch = useDispatch();
    const { loading, chosenTema, chosenYtelse, getKlageError, klageId, activeKlage } = useSelector(
        (state: Store) => state
    );

    const [chosenVedtak, setChosenVedtak] = useState<Vedtak>();
    const [temaNotSet, setTemaNotSet] = useState<boolean>(false);

    useEffect(() => {
        dispatch(checkAuth(props.location.search));
        if (typeof klageId !== 'undefined' && klageId.length !== 0 && typeof activeKlage === 'undefined') {
            dispatch(getExistingKlage(klageId));
        }

        const vedtak = queryToVedtak(props.query);
        if (vedtak !== null) {
            setChosenVedtak(vedtak);
        }

        setTemaNotSet(chosenTema === null);
    }, [dispatch, props.location.search, props.query, chosenTema, klageId, activeKlage]);

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
