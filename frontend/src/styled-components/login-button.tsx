import { Button, ButtonProps } from '@navikt/ds-react';
import React from 'react';
import styled from 'styled-components';

export const LoginButton = (props: ButtonProps) => <StyledButton {...props} variant="primary" />;

const StyledButton = styled(Button)`
  margin-top: 16px;
`;
