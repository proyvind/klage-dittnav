import React from 'react';
import { Ingress, Innholdstittel } from 'nav-frontend-typografi';
import styled from 'styled-components/macro';
import { CenteredContainer, SmallMarginTopContainer } from '../styled-components/common';
import { Klage } from '../klage/klage';

const TitleContainer = styled.div`
    background-color: #cce1f3;
    border-bottom: 4px solid #66a4dc;
    padding: 16px 0;
    width: 100vw;
    margin-left: calc(50% - 50vw);
    margin-top: -32px;
    margin-bottom: 10px;
`;

interface Props {
    klage: Klage;
}

const FormTitle = ({ klage }: Props) => (
    <TitleContainer>
        <CenteredContainer>
            <SmallMarginTopContainer>
                <Innholdstittel>Klage på vedtak</Innholdstittel>
                <SmallMarginTopContainer>
                    <Ingress>{klage.ytelse}</Ingress>
                </SmallMarginTopContainer>
            </SmallMarginTopContainer>
        </CenteredContainer>
    </TitleContainer>
);
export default FormTitle;
