import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import styled from 'styled-components/macro';
import { CenteredMainContainer } from '../../styled-components/main-styled-components';

const TitleContainer = styled.div`
    background-color: #c1b5d0;
    padding: 10px 0;
`;

const PageTitle = (props: { title: string }) => (
    <TitleContainer>
        <CenteredMainContainer>
            <Undertittel>{props.title}</Undertittel>
        </CenteredMainContainer>
    </TitleContainer>
);
export default PageTitle;
