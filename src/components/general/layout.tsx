import React from 'react';
import PageTitle from './pageTitle';
import { MasterPaddingContainer, MainContainer } from '../../styled-components/main-styled-components';
import { useSelector } from 'react-redux';
import { Store } from '../../store/reducer';

interface Props {
    children: React.ReactChild | React.ReactChildren;
}

const Layout = ({ children }: Props) => {
    const { chosenYtelse } = useSelector((state: Store) => state);
    const title = chosenYtelse !== '' ? `Klage på vedtak for ${chosenYtelse?.toLowerCase()}` : `Klage på vedtak`;

    return (
        <>
            <PageTitle title={title} />

            <MainContainer>
                <MasterPaddingContainer>{children}</MasterPaddingContainer>
            </MainContainer>
        </>
    );
};

export default Layout;
