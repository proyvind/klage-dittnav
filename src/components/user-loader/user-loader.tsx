import React, { useContext, useEffect } from 'react';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Normaltekst } from 'nav-frontend-typografi';
import { checkAuth } from '../../services/check-auth';
import { CenteredContainer } from '../../styled-components/main-styled-components';
import { AppContext } from '../app-context/app-context';

interface Props {
    children: JSX.Element;
}

const UserLoader = (props: Props) => {
    const { user, setUser } = useContext(AppContext);

    useEffect(() => {
        if (user === null) {
            checkAuth(setUser, true);
        }
    }, [user, setUser]);

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
