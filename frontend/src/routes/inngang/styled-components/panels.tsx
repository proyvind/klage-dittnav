import { Heading, Panel } from '@navikt/ds-react';
import styled from 'styled-components';

export const PanelContainer = styled(Panel)`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  margin: 0 auto;
  gap: 16px;
`;

export const InngangPanel = styled(Panel)`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  background-color: #fff;
`;

export const LinkContainer = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const CenteredHeading = styled(Heading)`
  text-align: center;
`;
