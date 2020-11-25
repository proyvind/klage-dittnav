import React from 'react';
import styled from 'styled-components/macro';
import { MainContainer } from '../styled-components/common';

interface BackgroundProps {
    backgroundColor: string;
}
interface Props extends BackgroundProps {
    children: React.ReactNode;
}

const MasterPaddingContainer = styled.div`
    padding-bottom: 64px;
`;

const Background = styled.div<BackgroundProps>`
    background-color: ${({ backgroundColor }) => backgroundColor};
`;

const Layout = ({ backgroundColor, children }: Props) => (
    <Background backgroundColor={backgroundColor}>
        <MainContainer>
            <MasterPaddingContainer>{children}</MasterPaddingContainer>
        </MainContainer>
    </Background>
);

export default Layout;
