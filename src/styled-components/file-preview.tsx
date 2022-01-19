import styled from 'styled-components/macro';
import FileFC from 'forhandsvisningsfil';
import { device } from './media-queries';

export const FlexWithSpacingContainer = styled.div` 
    display: flex;
    flex-flow: row wrap;

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

export const FlexCenteredOnMobile = styled(FlexWithSpacingContainer)`
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
        padding-top: 5px;
        padding-left: 5px;
        padding-right: 5px;
        padding-bottom: 1px;

        svg {
            > path {
                stroke: #ba3a26;
            }
        }
    }
`;
