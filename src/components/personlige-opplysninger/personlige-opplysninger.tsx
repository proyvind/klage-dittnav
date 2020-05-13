import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import styled from 'styled-components';
import { Person, Adress } from '../../types/person';
import InformationPointBox from '../general/information-point-box';

const PERSONLIGE_OPPLYSNINGER_POINTS = [
    { displayName: 'Fornavn', content: (person: Person) => <Normaltekst>{person.firsName}</Normaltekst> },
    { displayName: 'Etternavn', content: (person: Person) => <Normaltekst>{person.lastName}</Normaltekst> },
    { displayName: 'Fødselsnummer', content: (person: Person) => <Normaltekst>{person.id}</Normaltekst> },
    { displayName: 'Telefonnummer', content: (person: Person) => <Normaltekst>{person.phoneNumber}</Normaltekst> },
    { displayName: 'Adresse', content: (person: Person) => <AdressPointBox adress={person.adress} /> }
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

const AdressPointBox = ({ adress }: { adress: Adress }) => (
    <div>
        <Normaltekst>{adress.street}</Normaltekst>
        <Normaltekst>{adress.postalCode + ' ' + adress.city}</Normaltekst>
    </div>
);

interface Props {
    person: Person;
}

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
