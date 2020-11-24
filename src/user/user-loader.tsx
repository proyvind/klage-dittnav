import React, { useContext, useEffect, useState } from 'react';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Normaltekst } from 'nav-frontend-typografi';
import { ensureAuth } from './get-user';
import { CenteredContainer } from '../styled-components/common';
import { AppContext } from '../app-context/app-context';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { LoginButton } from '../styled-components/login-button';
import { NetworkError } from '../api/errors';

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
        return (
            <CenteredContainer>
                <NavFrontendSpinner type={'XL'} />
                <Normaltekst>Laster bruker...</Normaltekst>
            </CenteredContainer>
        );
    }

    return props.children;
};

export default UserLoader;
