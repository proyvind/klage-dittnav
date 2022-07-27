import { BodyLong, Loader } from '@navikt/ds-react';
import React from 'react';
import styled from 'styled-components';
import { CenteredContainer } from '../styled-components/common';

interface Props {
  children: string;
}

const LoadingContainer = styled(CenteredContainer)`
  padding-top: 64px;
  padding-bottom: 64px;
`;

export const LoadingPage = ({ children }: Props) => (
  <LoadingContainer>
    <Loader size="3xlarge" />
    <BodyLong>{children}</BodyLong>
  </LoadingContainer>
);
