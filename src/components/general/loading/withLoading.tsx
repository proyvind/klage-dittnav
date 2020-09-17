import React from 'react';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { CenteredContainer } from '../../../styled-components/main-styled-components';

interface Props {
    children: React.ReactElement;
    loading: boolean;
}

const WithLoading = (props: Props) => {
    return props.loading ? (
        <CenteredContainer>
            <NavFrontendSpinner type={'XL'} />
        </CenteredContainer>
    ) : (
        props.children
    );
};

export default WithLoading;
