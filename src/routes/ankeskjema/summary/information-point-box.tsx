import React, { ReactNode } from 'react';
import styled from 'styled-components/macro';

interface Props {
    header: string;
    children: ReactNode;
}

const InformationPointBox = (props: Props) => (
    <InformationBoxContainer>
        <InformationBoxTitle>{props.header}</InformationBoxTitle>
        {props.children}
    </InformationBoxContainer>
);

const InformationBoxContainer = styled.section`
    margin-bottom: 24px;
    min-width: 50%;
`;

const InformationBoxTitle = styled.h3`
    margin-top: 0;
    margin-bottom: 8px;
    font-size: 1rem;
    font-weight: 600;
`;

export default InformationPointBox;
