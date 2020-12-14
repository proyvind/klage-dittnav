import styled from 'styled-components/macro';
import { Normaltekst } from 'nav-frontend-typografi';
import { device } from './media-queries';

export const CenteredContainer = styled.div`
    text-align: center;
`;

export const MarginTopContainer = styled.div`
    margin-top: 16px;
    width: 100%;
    display: inline-block;
`;

export const MarginContainer = styled.div`
    margin-top: 16px;
    margin-bottom: 16px;
    width: 100%;
`;

export const SpaceBetweenFlexListContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-flow: row wrap;
`;

export const WrapNormaltekst = styled(Normaltekst)`
    white-space: pre-line;
    word-break: break-all;
`;

export const IconContainer = styled.div`
    margin-right: 0;
    margin-bottom: 2rem;

    @media ${device.mobileL} {
        margin-right: 2rem;
        margin-bottom: 0;
    }
`;

export const LenkePanelContentWithImage = styled.div`
    padding: 0.5rem 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;

    svg {
        display: block;
        width: 60px;
        height: 80px;
    }

    @media ${device.tablet} {
        padding: 2rem 2.5rem 2rem 2rem;
    }

    @media ${device.mobileL} {
        padding: 0.5rem 2rem;
        justify-content: initial;
        flex-wrap: nowrap;
    }
`;
