import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import styled from 'styled-components';
import { Bruker, Adresse } from '../../types/bruker';
import InformationPointBox from '../general/information-point-box';

const PERSONLIGE_OPPLYSNINGER_POINTS = [
    { displayName: 'Fornavn', content: (person: Bruker) => <Normaltekst>{person.navn.fornavn}</Normaltekst> },
    { displayName: 'Etternavn', content: (person: Bruker) => <Normaltekst>{person.navn.etternavn}</Normaltekst> },
    { displayName: 'Fødselsnummer', content: (person: Bruker) => <Normaltekst>{person.id}</Normaltekst> },
    { displayName: 'Telefonnummer', content: (person: Bruker) => <Normaltekst>{person.kontaktinformasjon?.telefonnummer}</Normaltekst> },
    { displayName: 'Adresse', content: (person: Bruker) => <AdressPointBox adress={person.adresse} /> }
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

const AdressPointBox = ({ adress }: { adress: Adresse }) => (
    <div>
        <Normaltekst>{adress.adressenavn} {adress.husnummer}{adress.husbokstav}</Normaltekst>
        <Normaltekst>{adress.postnummer} {adress.poststed}</Normaltekst>
    </div>
);

interface Props {
    person: Bruker;
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
