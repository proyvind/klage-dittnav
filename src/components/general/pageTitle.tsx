import React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import styled from 'styled-components/macro';
import { ContentContainer } from '../../styled-components/main-styled-components';

const TitleContainer = styled.div`
    background-color: #c1b5d0;
    padding: 10px 0;
`;

const PageTitle = (props: { title: string }) => (
    <TitleContainer>
        <ContentContainer>
            <Sidetittel>{props.title}</Sidetittel>
        </ContentContainer>
    </TitleContainer>
);
export default PageTitle;
