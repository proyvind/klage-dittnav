import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import NavFrontendSpinner from 'nav-frontend-spinner';
import InngangInnsendingDigital from '../../components/inngang/inngang-innsendingsvalg-digital';
import { checkAuth } from '../../services/check-auth';
import { CenteredContainer } from '../../styled-components/main-styled-components';
import { TemaKey } from '../../types/tema';
import { Normaltekst } from 'nav-frontend-typografi';
import { AppContext } from '../../components/app-context/app-context';

const LandingPage = (temaKey: TemaKey, title: string, saksnummer: string | null = null) => {
    const { user, setUser } = useContext(AppContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user === null) {
            checkAuth(setUser, false).then(() => setLoading(false));
        }
    }, [user, setUser]);

    if (loading) {
        return (
            <CenteredContainer>
                <NavFrontendSpinner type={'XL'} />
                <Normaltekst>Sjekker bruker...</Normaltekst>
            </CenteredContainer>
        );
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
