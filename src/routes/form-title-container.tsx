import React from 'react';
import styled from 'styled-components/macro';
import { Sidetittel, Undertittel } from 'nav-frontend-typografi';

const TitleContainer = styled.div`
    background-color: #cce1f3;
    border-bottom: 4px solid #66a4dc;
    padding: 16px 8px;
    width: 100%;
    margin-bottom: 32px;
    text-align: center;
`;

const Title = styled(Sidetittel)`
    && {
        margin: 8px 0;
    }
`;

interface Props {
    tittel: string;
    undertittel: string;
}

const FormTitleContainer = ({ tittel, undertittel }: Props) => (
    <TitleContainer>
        <Title>{tittel}</Title>
        <Undertittel>{undertittel}</Undertittel>
    </TitleContainer>
);

export default FormTitleContainer;
