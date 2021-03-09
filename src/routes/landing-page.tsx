import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import InngangInnsendingDigital from './inngang/inngang-innsendingsvalg-digital';
import { getUser } from '../user/get-user';
import { TemaKey } from '../tema/tema';
import { AppContext } from '../app-context/app-context';
import LoadingPage from '../loading-page/loading-page';
import { useTranslation } from '../language/use-translation';

const LandingPage = (
    temaKey: TemaKey,
    titleKey: string | null,
    ytelse: string | null,
    saksnummer: string | null = null
) => {
    const { user, setUser } = useContext(AppContext);
    const { landing_page } = useTranslation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user === null) {
            getUser()
                .then(setUser)
                .finally(() => setLoading(false));
        }
    }, [titleKey, user, setUser]);

    if (loading) {
        return <LoadingPage>{landing_page.checking_user}</LoadingPage>;
    }

    if (user === null) {
        return (
            <InngangInnsendingDigital
                temaKey={temaKey}
                ytelse={ytelse}
                titleKey={titleKey}
                internalSaksnummer={saksnummer}
            />
        );
    }

    const query = queryString.stringify(
        {
            tema: temaKey,
            tittel: titleKey,
            ytelse,
            saksnummer
        },
        {
            skipNull: true,
            sort: false,
            skipEmptyString: true
        }
    );
    return <Redirect to={`/ny?${query}`} />;
};

export default LandingPage;
