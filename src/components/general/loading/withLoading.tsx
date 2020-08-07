import React from 'react';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { CenteredContainer } from '../../../styled-components/main-styled-components';

const WithLoading = (props: any) => {
    return props.loading ? (
        <CenteredContainer>
            <NavFrontendSpinner type={'XL'} />
        </CenteredContainer>
    ) : (
        props.children
    );
};

export default WithLoading;
