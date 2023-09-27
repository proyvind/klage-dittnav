import { Heading } from '@navikt/ds-react';
import React from 'react';
import { styled } from 'styled-components';

const TitleContainer = styled.div`
  background-color: #cce1f3;
  border-bottom: 4px solid #66a4dc;
  padding: 16px 8px;
  width: 100%;
  margin-bottom: 32px;
  text-align: center;
`;

interface Props {
  tittel: string;
  undertittel: string;
}

export const FormTitleContainer = ({ tittel, undertittel }: Props) => (
  <TitleContainer>
    <Heading spacing level="1" size="medium">
      {tittel}
    </Heading>
    <Heading spacing level="2" size="small">
      {undertittel}
    </Heading>
  </TitleContainer>
);
