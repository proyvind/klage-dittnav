import React, { useContext, useEffect, useState } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { ensureAuth } from './get-user';
import { AppContext } from '../app-context/app-context';
import { LoginButton } from '../styled-components/login-button';
import { NetworkError } from '../api/errors';
import LoadingPage from '../loading-page/loading-page';

interface Props {
    children: JSX.Element;
}

const UserLoader = (props: Props) => {
    const { user, setUser } = useContext(AppContext);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (user === null) {
            ensureAuth().then(setUser).catch(setError);
        }
    }, [user, setUser]);

    if (error !== null) {
        if (error instanceof NetworkError) {
            return (
                <AlertStripeFeil>
                    <Normaltekst>{`Kunne ikke laste brukeren, fordi nettleseren din ikke kan nå NAV. Har du fortsatt internett?`}</Normaltekst>
                    <Normaltekst>{`Feilmelding: "${error.message}"`}</Normaltekst>
                    <LoginButton>Logg inn</LoginButton>
                </AlertStripeFeil>
            );
        }
        return (
            <AlertStripeFeil>
                <Normaltekst>{`Kunne ikke laste brukeren, vennligst prøv igjen senere.`}</Normaltekst>
                <Normaltekst>{`Feilmelding: "${error.message}"`}</Normaltekst>
                <LoginButton>Logg inn</LoginButton>
            </AlertStripeFeil>
        );
    }

    if (user === null) {
        return <LoadingPage>Laster bruker...</LoadingPage>;
    }

    return props.children;
};

export default UserLoader;
