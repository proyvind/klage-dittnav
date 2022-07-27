import { BodyLong } from '@navikt/ds-react';
import styled from 'styled-components';

export const CenteredContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

export const MarginTopContainer = styled.div`
  margin-top: 16px;
  width: 100%;
  display: inline-block;
`;

export const SpaceBetweenFlexListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

export const WrapBodyLong = styled(BodyLong)`
  white-space: pre-line;
  word-break: break-all;
`;
