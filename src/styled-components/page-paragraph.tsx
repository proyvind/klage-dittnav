import styled from 'styled-components/macro';
import { Normaltekst } from 'nav-frontend-typografi';

export const PageParagraph = styled(Normaltekst)`
    display: inline-block;
    width: 100%;
    margin-bottom: 32px;
`;

export const CenteredPageParagraph = styled(PageParagraph)`
    text-align: center;
`;
