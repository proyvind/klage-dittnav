import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import styled from 'styled-components';

const PERSONLIGE_OPPLYSNINGER_POINTS = [
    { displayName: 'Fornavn' },
    { displayName: 'Etternavn' },
    { displayName: 'Fødselsnummer' },
    { displayName: 'Telefonnummer' },
    { displayName: 'Adresse' }
];
const FlexRowContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    > div {
        flex-basis: 40%;
        margin-bottom: 20px;
    }
`;

const InformationPointBox = (header: string, info: string) => (
    <div>
        <Element>{header}</Element>
        <Normaltekst>{info}</Normaltekst>
    </div>
);

const PersonligeOpplysninger = () => (
    <FlexRowContainer>
        {PERSONLIGE_OPPLYSNINGER_POINTS.map(point => {
            return InformationPointBox(point.displayName, 'info');
        })}
    </FlexRowContainer>
);

export default PersonligeOpplysninger;
