import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { Bruker, Adresse, displayAddress, displayPoststed } from '../../types/bruker';
import InformationPointBox from '../general/information-point-box';
import { PointsFlexListContainer } from '../../styled-components/main-styled-components';

const PERSONLIGE_OPPLYSNINGER_POINTS = [
    { displayName: 'Fornavn', content: (person: Bruker) => <Normaltekst>{person.navn.fornavn ?? ''}</Normaltekst> },
    { displayName: 'Etternavn', content: (person: Bruker) => <Normaltekst>{person.navn.etternavn ?? ''}</Normaltekst> },
    {
        displayName: 'Fødselsnummer',
        content: (person: Bruker) => (
            <Normaltekst>{person.folkeregisteridentifikator?.identifikasjonsnummer ?? ''}</Normaltekst>
        )
    },
    {
        displayName: 'Telefonnummer',
        content: (person: Bruker) => <Normaltekst>{person.kontaktinformasjon?.telefonnummer ?? ''}</Normaltekst>
    },
    { displayName: 'Adresse', content: (person: Bruker) => <AdressPointBox adress={person.adresse} /> }
];

const AdressPointBox = ({ adress }: { adress: Adresse }) => (
    <div>
        <Normaltekst>{displayAddress(adress)}</Normaltekst>
        <Normaltekst>{displayPoststed(adress)}</Normaltekst>
    </div>
);

interface Props {
    person: Bruker;
}

const PersonligeOpplysningerSummary = (props: Props) => {
    return (
        <>
            <PointsFlexListContainer>
                {PERSONLIGE_OPPLYSNINGER_POINTS.map(point => {
                    return (
                        <InformationPointBox
                            key={point.displayName}
                            header={point.displayName}
                            info={point.content(props.person)}
                        />
                    );
                })}
            </PointsFlexListContainer>
        </>
    );
};

export default PersonligeOpplysningerSummary;
