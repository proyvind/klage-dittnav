import React from 'react';
import PageTitle from '../../components/klage-frontpage/pageTitle';
import WelcomeKlage from '../../components/klage-frontpage/welcomeKlage';
import KlageForm from '../../components/klage-form';
import styled from 'styled-components/macro';
import { getKlager } from '../../services/klageService';

const KlageContentContainer = styled.div`
    max-width: 300px;
    margin: 30px auto;
    text-align: center;
`;

const KlageFrontPage = () => {
    const KLAGER = getKlager();
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
