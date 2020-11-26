import styled from 'styled-components/macro';
import { device } from './media-queries';

export const ContentContainer = styled.div`
    margin: 0 auto;
    min-width: 320px;

    @media ${device.mobileS} {
        max-width: 85%;
    }
    @media ${device.laptop} {
        max-width: 800px;
    }
`;
