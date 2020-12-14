import styled from 'styled-components/macro';
import { Systemtittel } from 'nav-frontend-typografi';

export const SectionTitle = styled(Systemtittel)`
    && {
        margin-top: 0;
        margin-bottom: 32px;
    }
`;

export const CenteredSectionTitle = styled(SectionTitle)`
    && {
        text-align: center;
    }
`;
