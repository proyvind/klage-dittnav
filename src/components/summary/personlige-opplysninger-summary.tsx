import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { User, Address, displayAddress, displayPoststed } from '../../types/user';
import InformationPointBox from '../general/information-point-box';
import { PointsFlexListContainer } from '../../styled-components/main-styled-components';
import { foedselsnrFormat } from '../../utils/text-formatting';

const PERSONLIGE_OPPLYSNINGER_POINTS = [
    {
        displayName: 'For- og mellomnavn',
        content: (user: User) => <Normaltekst>{combineFirstMiddleName(user)}</Normaltekst>
    },
    { displayName: 'Etternavn', content: (user: User) => <Normaltekst>{user.navn.etternavn ?? ''}</Normaltekst> },
    {
        displayName: 'Fødselsnummer',
        content: (user: User) => (
            <Normaltekst>{foedselsnrFormat(user.folkeregisteridentifikator?.identifikasjonsnummer ?? '')}</Normaltekst>
        )
    },
    {
        displayName: 'Telefonnummer',
        content: (user: User) => <Normaltekst>{user.kontaktinformasjon?.telefonnummer ?? ''}</Normaltekst>
    },
    {
        displayName: 'Adresse',
        content: (user: User) => (user.adresse ? <AddressPointBox adress={user.adresse} /> : '')
    }
];

const combineFirstMiddleName = (user: User): string => {
    let name = user.navn.fornavn ?? '';
    name += user.navn.mellomnavn ? ' ' + user.navn.mellomnavn : '';
    return name;
};

const AddressPointBox = ({ adress }: { adress: Address }) => (
    <div>
        <Normaltekst>{displayAddress(adress)}</Normaltekst>
        <Normaltekst>{displayPoststed(adress)}</Normaltekst>
    </div>
);

interface Props {
    user: User;
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
                            info={point.content(props.user)}
                        />
                    );
                })}
            </PointsFlexListContainer>
        </>
    );
};

export default PersonligeOpplysningerSummary;
