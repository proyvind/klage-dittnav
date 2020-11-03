import NavFrontendSpinner from 'nav-frontend-spinner';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import InngangInnsendingDigital from '../../components/inngang/inngang-innsendingsvalg-digital';
import { checkAuth } from '../../store/actions';
import { Store } from '../../store/reducer';
import { CenteredContainer } from '../../styled-components/main-styled-components';
import { Tema, TemaKey } from '../../types/tema';

const LandingPage = (temaKey: TemaKey, saksnummer: string | null = null) => {
    const { loading, person } = useSelector((state: Store) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkAuth(false));
    }, [dispatch]);

    if (loading) {
        return (
            <CenteredContainer>
                <NavFrontendSpinner type={'XL'} />
            </CenteredContainer>
        );
    }

    if (person === null) {
        return InngangInnsendingDigital(temaKey, Tema[temaKey], saksnummer);
    }

    const saksnummerQuery = saksnummer === null ? '' : `&saksnummer=${saksnummer}`;
    return <Redirect to={`/begrunnelse?tema=${temaKey}${saksnummerQuery}`} />;
};

export default LandingPage;
