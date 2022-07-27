import styled from 'styled-components';
import { device } from './media-queries';

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin: 0 auto;
  min-width: 320px;

  @media ${device.mobileS} {
    max-width: 92%;
  }
  @media ${device.laptop} {
    max-width: 800px;
  }
`;
