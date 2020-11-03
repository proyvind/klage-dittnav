import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth, clearStorageContent, setStorageContent } from '../../store/actions';
import { Store } from '../../store/reducer';
import { logError, logInfo } from '../../utils/logger/frontendLogger';
import MainFormPage from '../../pages/main-form-page/main-form-page';
import Error from '../../components/error/error';
import { getResumeState } from '../../utils/get-resume-state';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { CenteredContainer } from '../../styled-components/main-styled-components';
import { useLocation } from 'react-router-dom';
import { NewKlage } from '../../types/klage';
import { getKlage, postKlage } from '../../services/klageService';
import { AxiosError } from 'axios';

const FormLanding = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { loading, getKlageError, klage } = useSelector((state: Store) => state);

    const [isLoadingDraft, setIsLoadingDraft] = useState<boolean>(true);

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    useEffect(() => {
        const { klageId, tema, ytelse, saksnummer } = getResumeState(
            location.search,
            sessionStorage,
            location.pathname
        );
        setStorageContent(klageId, tema, ytelse, saksnummer);

        if (klage !== null) {
            setIsLoadingDraft(false);
            return;
        }

        if (klageId !== null) {
            getKlage(klageId)
                .then(klage => {
                    dispatch({ type: 'KLAGE_GET_SUCCESS', value: klage });
                    setStorageContent(klageId, klage.tema, klage.ytelse, klage.saksnummer);
                })
                .catch((err: AxiosError) => {
                    logError(err, 'Get existing klage failed');
                    if (err?.response?.status !== 401) {
                        clearStorageContent();
                    }
                    dispatch({ type: 'KLAGE_GET_ERROR' });
                })
                .finally(() => setIsLoadingDraft(false));
        } else if (ytelse !== null && tema !== null) {
            const newKlage: NewKlage = {
                ytelse,
                tema,
                saksnummer,
                vedtak: '',
                fritekst: ''
            };
            postKlage(newKlage)
                .then(klage => {
                    dispatch({ type: 'KLAGE_POST_SUCCESS', value: klage });
                    setStorageContent(klage.id.toString(), klage.tema, klage.ytelse, klage.saksnummer);
                })
                .catch((err: AxiosError) => {
                    logError(err, 'Post new klage failed');
                })
                .finally(() => setIsLoadingDraft(false));
        }
    }, [dispatch, location.search, location.pathname, klage]);

    logInfo('Form landing page visited.');

    if (loading || isLoadingDraft) {
        return (
            <CenteredContainer>
                <NavFrontendSpinner type={'XL'} />
            </CenteredContainer>
        );
    }

    if (getKlageError) {
        logInfo('Form landing page visited, get klage failed.');
        return (
            <Error
                error={{
                    code: 400,
                    text: 'Klagen du ba om kan ikke hentes. Prøv på nytt fra lenken på Ditt NAV.'
                }}
            />
        );
    }

    return <MainFormPage path={location.pathname} />;
};

export default FormLanding;
