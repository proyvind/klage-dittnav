import React, { useContext, useEffect, useState } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { ensureAuth } from './get-user';
import { AppContext } from '../app-context/app-context';
import { LoginButton } from '../styled-components/login-button';
import { NetworkError } from '../api/errors';
import LoadingPage from '../loading-page/loading-page';
import { login } from './login';
import { useTranslation } from '../language/use-translation';

interface Props {
    children: JSX.Element;
}

const UserLoader = (props: Props) => {
    const { user_loader } = useTranslation();
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
                    <Normaltekst>{user_loader.network_error}</Normaltekst>
                    <Normaltekst>{user_loader.error_message(error.message)}</Normaltekst>
                    <LoginButton onClick={login}>{user_loader.log_in}</LoginButton>
                </AlertStripeFeil>
            );
        }
        return (
            <AlertStripeFeil>
                <Normaltekst>{user_loader.other_error}</Normaltekst>
                <Normaltekst>{user_loader.error_message(error.message)}</Normaltekst>
                <LoginButton onClick={login}>{user_loader.log_in}</LoginButton>
            </AlertStripeFeil>
        );
    }

    if (user === null) {
        return <LoadingPage>{user_loader.loading_user}</LoadingPage>;
    }

    return props.children;
};

export default UserLoader;
