import styled from 'styled-components';

export interface CustomMarginRowProps {
  margin?: number;
}

export const CustomMarginRow = styled.div<CustomMarginRowProps>`
  margin-bottom: ${({ margin = 0 }) => margin}px;
`;

export const InlineRow = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  column-gap: 32px;
`;
