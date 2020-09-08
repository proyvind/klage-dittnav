import styled from 'styled-components';

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

export const MainContainer = styled.div`
    margin: 0 auto;
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

export const CenteredContentContainer = styled(ContentContainer)`
    text-align: center;
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

export const Margin32TopContainer = styled(MarginTopContainer)`
    margin-top: 32px;
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

export const Margin80TopContainer = styled(MarginTopContainer)`
    margin-top: 80px;
`;

export const Margin80Container = styled(MarginContainer)`
    margin-top: 80px;
    margin-bottom: 80px;
`;

export const PaddingContainer = styled.div`
    padding-top: 32px;
    padding-bottom: 32px;
`;

export const MasterPaddingContainer = styled(PaddingContainer)`
    padding-bottom: 64px;
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
    > *:last-child {
        margin-right: 0;
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

export const ButtonFlexContainer = styled(FlexContainer)`
    justify-content: flex-start;
    > a,
    > button {
        margin-bottom: 24px;
        margin-right: 10px;
    }
    > a:last-child,
    > button:last-child {
        margin-right: 0;
    }
`;
