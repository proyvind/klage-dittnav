import React from 'react';
import { MasterPaddingContainer, MainContainer } from '../../styled-components/main-styled-components';

interface Props {
    children: React.ReactChild | React.ReactChildren;
}

const Layout = ({ children }: Props) => (
    <MainContainer>
        <MasterPaddingContainer>{children}</MasterPaddingContainer>
    </MainContainer>
);

export default Layout;
