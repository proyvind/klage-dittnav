import React, { ReactNode } from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import styled from 'styled-components';
import { Person } from '../../types/person';

const PERSONLIGE_OPPLYSNINGER_POINTS = [
    { displayName: 'Fornavn', content: (person: Person) => <Normaltekst>{person.firsName}</Normaltekst> },
    { displayName: 'Etternavn', content: (person: Person) => <Normaltekst>{person.lastName}</Normaltekst> },
    { displayName: 'Fødselsnummer', content: (person: Person) => <Normaltekst>{person.id}</Normaltekst> },
    { displayName: 'Telefonnummer', content: (person: Person) => <Normaltekst>{person.phoneNumber}</Normaltekst> },
    { displayName: 'Adresse', content: (person: Person) => <Normaltekst>TODO</Normaltekst> }
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

interface Props {
    person: Person;
}

const InformationPointBox = (props: { header: string; info: ReactNode }) => (
    <div>
        <Element>{props.header}</Element>
        {props.info}
    </div>
);

const PersonligeOpplysninger = (props: Props) => (
    <FlexRowContainer>
        {PERSONLIGE_OPPLYSNINGER_POINTS.map(point => {
            return (
                <InformationPointBox
                    key={point.displayName}
                    header={point.displayName}
                    info={point.content(props.person)}
                />
            );
        })}
    </FlexRowContainer>
);

export default PersonligeOpplysninger;
