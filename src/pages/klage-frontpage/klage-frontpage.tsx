import React from 'react';
import PageTitle from '../../components/klage-frontpage/pageTitle';
import WelcomeKlage from '../../components/klage-frontpage/welcomeKlage';
import KlageForm from '../../components/klage-form';
import styled from 'styled-components/macro';

const KlageContentContainer = styled.div`
    max-width: 25%;
    margin: 30px auto;
    text-align: center;
`;

const KlageFrontPage = () => {
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
