import styled from 'styled-components/macro';
import { Sidetittel, Innholdstittel } from 'nav-frontend-typografi';

export const PageTitle = styled(Sidetittel)`
    && {
        margin-top: 0;
        margin-bottom: 32px;
    }
`;

export const CenteredPageTitle = styled(PageTitle)`
    && {
        text-align: center;
    }
`;

export const CenteredPageSubTitle = styled(Innholdstittel)`
    && {
        margin-bottom: 32px;
        text-align: center;
    }
`;
