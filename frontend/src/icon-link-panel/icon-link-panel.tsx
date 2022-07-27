import { LinkPanel, LinkPanelProps } from '@navikt/ds-react';
import React from 'react';
import styled from 'styled-components';
import { device } from '../styled-components/media-queries';

type Props<T extends React.ElementType> = {
  icon: JSX.Element;
  as?: T;
} & React.ComponentProps<T> &
  LinkPanelProps;

export const IconLinkPanel = <T extends React.ElementType>({ icon, children, ...props }: Props<T>) => (
  <LinkPanel {...props}>
    <StyledContainer>
      <StyledIcon>{icon}</StyledIcon>
      <StyledText>{children}</StyledText>
    </StyledContainer>
  </LinkPanel>
);

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${device.mobileL} {
    flex-direction: row;
  }
`;

const StyledIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 8px;
  margin-right: 24px;

  svg {
    width: 60px;
    height: 80px;
  }
`;

const StyledText = styled.div`
  height: 100%;
`;
