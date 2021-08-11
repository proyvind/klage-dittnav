import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { getQueryValue } from '../query/get-query-value';
import { AppContext } from '../app-context/app-context';
import LoadingPage from '../loading-page/loading-page';
import { useLanguage } from '../language/use-language';
import { useTranslation } from '../language/use-translation';
import { resumeOrCreateAnke } from '../api/anke/api';

const CreateAnke = () => {
    const { search } = useLocation();
    const language = useLanguage();
    const { anke_create } = useTranslation();
    const { anke, setAnke } = useContext(AppContext);
    const [error, setError] = useState<string | null>(null);
    const [readyToRedirect, setReadyToRedirect] = useState<boolean>(false);

    useEffect(() => {
        const query = queryString.parse(search);
        const ankeInternalSaksnummer = getQueryValue(query.saksnummer);

        if (ankeInternalSaksnummer === null) {
            setError(anke_create.create_error);
            return;
        }

        resumeOrCreateAnke({ language, ankeInternalSaksnummer })
            .then(a => {
                setAnke(a);
                setReadyToRedirect(true);
            })
            .catch(() => setError(anke_create.create_error));
    }, [search, anke, setAnke, anke_create, language]);

    if (error !== null) {
        return <AlertStripeFeil>{error}</AlertStripeFeil>;
    }

    if (anke === null) {
        return <LoadingPage>{anke_create.creating}</LoadingPage>;
    }

    if (readyToRedirect) {
        return <Redirect to={`/${language}/anke/${anke.ankeInternalSaksnummer}/begrunnelse`} />;
    }
    return null;
};

export default CreateAnke;
