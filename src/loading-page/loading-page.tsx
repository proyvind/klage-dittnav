import React from 'react';
import styled from 'styled-components/macro';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Normaltekst } from 'nav-frontend-typografi';
import { CenteredContainer } from '../styled-components/common';

interface Props {
    children: string;
}

const LoadingContainer = styled(CenteredContainer)`
    padding-top: 64px;
    padding-bottom: 64px;
`;

const LoadingPage = ({ children }: Props) => (
    <LoadingContainer>
        <NavFrontendSpinner type={'XL'} />
        <Normaltekst>{children}</Normaltekst>
    </LoadingContainer>
);

export default LoadingPage;
