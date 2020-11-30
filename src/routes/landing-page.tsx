import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import InngangInnsendingDigital from './inngang/inngang-innsendingsvalg-digital';
import { getUser } from '../user/get-user';
import { TemaKey } from '../tema/tema';
import { AppContext } from '../app-context/app-context';
import LoadingPage from '../loading-page/loading-page';

const LandingPage = (temaKey: TemaKey, title: string, saksnummer: string | null = null) => {
    const { user, setUser } = useContext(AppContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user === null) {
            getUser()
                .then(setUser)
                .finally(() => setLoading(false));
        }
    }, [user, setUser]);

    if (loading) {
        return <LoadingPage>Sjekker bruker...</LoadingPage>;
    }

    if (user === null) {
        return <InngangInnsendingDigital temaKey={temaKey} title={title} saksnummer={saksnummer} />;
    }

    const query = queryString.stringify(
        {
            tema: temaKey,
            saksnummer,
            tittel: title
        },
        {
            skipNull: true
        }
    );
    return <Redirect to={`/ny?${query}`} />;
};

export default LandingPage;
