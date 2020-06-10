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

export const ContentContainer = styled.div`
    margin: 0 auto;
    @media ${device.mobileS} {
        max-width: 80%;
    }
    @media ${device.tablet} {
        max-width: 600px;
    }
`;

export const CenteredContentContainer = styled(ContentContainer)`
    text-align: center;
`;

export const CenteredContainer = styled.div`
    text-align: center;
`;

export const MarginContainer = styled.div`
    margin-top: 30px;
    margin-bottom: 30px;
`;

export const ContainedContent = styled.div`
    * {
        max-width: 100%;
    }
`;
