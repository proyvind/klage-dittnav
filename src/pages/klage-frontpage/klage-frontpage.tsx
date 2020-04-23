import React, {useEffect} from 'react';
import PageTitle from '../../components/klage-frontpage/pageTitle';
import WelcomeKlage from '../../components/klage-frontpage/welcomeKlage';
import KlageForm from '../../components/klage-form';
import styled from 'styled-components/macro';
import {checkAuth} from "../../store/actions";
import {useDispatch, useSelector} from "react-redux";
import {Store} from "../../store/reducer";

const KlageContentContainer = styled.div`
    max-width: 600px;
    margin: 30px auto;
`;

const KlageFrontPage = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state: Store) => state);

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    if (loading) {
        // Just an example :)
        return <h1>Loading</h1>;
    }

    return (
        <>
            <PageTitle />
            <KlageContentContainer>
                <WelcomeKlage />
                <KlageForm />
            </KlageContentContainer>
        </>
    );
};

export default KlageFrontPage;
