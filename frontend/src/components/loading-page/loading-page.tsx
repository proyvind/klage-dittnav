import { BodyLong, Loader } from '@navikt/ds-react';
import React from 'react';
import { styled } from 'styled-components';

interface Props {
  children?: string;
}

export const LoadingPage = ({ children }: Props) => (
  <LoadingContainer>
    <Loader size="3xlarge" />
    {children === undefined ? null : <BodyLong>{children}</BodyLong>}
  </LoadingContainer>
);

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding-top: 64px;
  padding-bottom: 64px;
`;
