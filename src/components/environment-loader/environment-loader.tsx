import React, { useEffect, useState } from 'react';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Normaltekst } from 'nav-frontend-typografi';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { CenteredContainer } from '../../styled-components/main-styled-components';
import { environment } from '../../utils/environment';

interface Props {
    children: JSX.Element;
}

const EnvironmentLoader = (props: Props) => {
    const [isInitialized, setIsInitialized] = useState<boolean>(environment.isInitialized());
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!isInitialized) {
            environment
                .init()
                .then(env => setIsInitialized(env.isInitialized()))
                .catch(setError);
        }
    }, [isInitialized, setIsInitialized, setError]);

    if (error !== null) {
        return <AlertStripeFeil>{error.message}</AlertStripeFeil>;
    }

    if (isInitialized) {
        return props.children;
    }

    return (
        <CenteredContainer>
            <NavFrontendSpinner type={'XL'} />
            <Normaltekst>Laster konfigurasjon...</Normaltekst>
        </CenteredContainer>
    );
};

export default EnvironmentLoader;
