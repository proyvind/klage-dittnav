import React from 'react';
import { Sidetittel, Ingress } from 'nav-frontend-typografi';
import styled from 'styled-components/macro';

const TitleContainer = styled.div`
    text-align: center;
    max-width: 40%;
    margin: 20px auto;
`;

const TITLE = 'Klage';
const DESCRIPTION =
    'Du finner søknader og skjemaer, mulighet for ettersendelse av dokumentasjon og klageskjema når du velger emne nedenfor.';

const PageTitle = () => (
    <TitleContainer>
        <Sidetittel>{TITLE}</Sidetittel>
            <Ingress>{DESCRIPTION}</Ingress>
    </TitleContainer>
);
export default PageTitle;
