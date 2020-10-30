import FileFC from 'forhandsvisningsfil';
import { Normaltekst, Undertekst } from 'nav-frontend-typografi';
import styled from 'styled-components/macro';

const size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px'
};

export const device = {
    mobileS: `(min-width: ${size.mobileS})`,
    mobileM: `(min-width: ${size.mobileM})`,
    mobileL: `(min-width: ${size.mobileL})`,
    tablet: `(min-width: ${size.tablet})`,
    laptop: `(min-width: ${size.laptop})`,
    laptopL: `(min-width: ${size.laptopL})`,
    desktop: `(min-width: ${size.desktop})`,
    desktopL: `(min-width: ${size.desktop})`
};

export const matchMediaQueries = {
    mobileS: window.matchMedia(`(max-width: ${size.mobileM})`),
    mobileM: window.matchMedia(`(max-width: ${size.mobileL})`),
    mobileL: window.matchMedia(`(max-width: ${size.tablet})`),
    tablet: window.matchMedia(`(max-width: ${size.laptop})`),
    laptop: window.matchMedia(`(max-width: ${size.laptopL})`),
    laptopL: window.matchMedia(`(max-width: ${size.desktop})`),
    desktop: window.matchMedia(`(max-width: ${size.desktop})`)
};

export const MainContainer = styled.main`
    margin: 0 auto;
    min-width: 320px;
    padding-bottom: 64px;
    padding-top: 32px;
    text-align: left;

    @media ${device.mobileS} {
        max-width: 85%;
    }
    @media ${device.laptop} {
        max-width: 800px;
    }
`;

export const ContentContainer = styled.div`
    margin: 0 auto;
`;

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

export const Margin32Container = styled(MarginContainer)`
    margin-top: 32px;
    margin-bottom: 32px;
`;

export const Margin40TopContainer = styled(MarginTopContainer)`
    margin-top: 40px;
    width: 100%;
    display: inline-block;
`;

export const Margin40Container = styled(MarginContainer)`
    margin-top: 40px;
    margin-bottom: 40px;
`;

export const Margin48TopContainer = styled(MarginTopContainer)`
    margin-top: 48px;
`;

export const Margin48Container = styled(MarginContainer)`
    margin-top: 48px;
    margin-bottom: 48px;
`;

export const InlineMargin48Container = styled(Margin48Container)`
    display: inline-block;
    position: initial;
`;

export const PaddingContainer = styled.div`
    padding-top: 32px;
    padding-bottom: 32px;
`;

export const ContainedContent = styled.div`
    * {
        max-width: 100%;
    }
`;

export const FlexContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
`;

export const FlexColumnContainer = styled.div`
    display: flex;
    flex-flow: column wrap;
`;

export const FlexColumnWithSpacingContainer = styled(FlexColumnContainer)`
    > * {
        margin-bottom: 10px;
    }
`;

export const FlexWithSpacingContainer = styled(FlexContainer)`
    > * {
        margin-right: 10px;
    }

    @media ${device.mobileS} {
        > *:last-child {
            margin-right: 10px;
        }
    }
    @media ${device.mobileL} {
        > *:last-child {
            margin-right: 0;
        }
    }
`;

export const CenterOnMobile = styled(FlexWithSpacingContainer)`
    @media ${device.mobileS} {
        justify-content: center;
    }
    @media ${device.mobileL} {
        justify-content: flex-start;
    }
`;

export const FileFlexItem = styled(FileFC)`
    margin-right: 25px;
    margin-bottom: 25px;

    @media ${device.mobileS} {
        &:last-child {
            margin-right: 25px;
        }
    }
    @media ${device.mobileL} {
        &:last-child {
            margin-right: 0px;
        }
    }

    .deleteLink {
        svg {
            width: 20px;
            > path {
                stroke: #ba3a26;
            }
        }
    }
`;

export const FlexCenteredContainer = styled(FlexContainer)`
    justify-content: center;
`;

export const PointsFlexListContainer = styled(FlexContainer)`
    justify-content: space-between;
    > div {
        flex-basis: 40%;
        flex-grow: 1;
        margin-bottom: 24px;
    }
`;

export const NoMarginParagraph = styled.p`
    margin: 0;
`;

export const NoMarginUndertekst = styled(Undertekst)`
    margin: 0;
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
