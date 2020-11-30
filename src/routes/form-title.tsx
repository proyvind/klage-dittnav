import React from 'react';
import styled from 'styled-components/macro';
import { Ingress, Innholdstittel } from 'nav-frontend-typografi';
import { Klage } from '../klage/klage';
import { device } from '../styled-components/media-queries';

const TitleContainer = styled.div`
    background-color: #cce1f3;
    border-bottom: 4px solid #66a4dc;
    padding: 16px 0;
    width: 100%;
    margin-bottom: 32px;
    text-align: center;

    @media ${device.mobileL} {
        padding-top: 24px;
    }
`;

const Title = styled(Innholdstittel)`
    && {
        margin-bottom: 0;

        @media ${device.mobileL} {
            margin-bottom: 8px;
        }
    }
`;

interface Props {
    klage: Klage;
}

const FormTitle = ({ klage }: Props) => (
    <TitleContainer>
        <Title>Klage på vedtak</Title>
        <Ingress>{klage.ytelse}</Ingress>
    </TitleContainer>
);
export default FormTitle;
