import styled from 'styled-components/macro';

export const FatRow = styled.div`
    margin-bottom: 48px;
`;

export const Row = styled.div`
    margin-bottom: 32px;
`;

export const SlimRow = styled.div`
    margin-bottom: 16px;
`;

export interface CustomMarginRowProps {
    margin?: number;
}

export const CustomMarginRow = styled.div<CustomMarginRowProps>`
    margin-bottom: ${({ margin = 0 }) => margin}px;
`;

export const InlineRow = styled(Row)`
    display: inline-block;
    width: 100%;
`;
