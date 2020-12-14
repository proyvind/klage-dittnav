import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { User, Address, displayAddress, displayPoststed } from '../../../user/user';
import InformationPointBox from './information-point-box';
import { SpaceBetweenFlexListContainer } from '../../../styled-components/common';
import { foedselsnrFormat } from './text-formatting';
import { useTranslation } from '../../../language/use-translation';

const combineFirstMiddleName = (user: User): string => {
    let name = user.navn.fornavn ?? '';
    name += user.navn.mellomnavn ? ' ' + user.navn.mellomnavn : '';
    return name;
};

export const getFullName = (user: User): string => {
    let name = user.navn.fornavn ?? '';
    name += user.navn.mellomnavn ? ' ' + user.navn.mellomnavn : '';
    name += user.navn.etternavn ? ' ' + user.navn.etternavn : '';
    return name;
};

const AddressPointBox = ({ adress: address }: { adress?: Address }) => {
    if (!address) {
        return null;
    }
    return (
        <div>
            <Normaltekst>{displayAddress(address)}</Normaltekst>
            <Normaltekst>{displayPoststed(address)}</Normaltekst>
        </div>
    );
};

interface Props {
    user: User;
}

const PersonligeOpplysningerSummary = ({ user }: Props) => {
    const { klageskjema } = useTranslation();

    return (
        <SpaceBetweenFlexListContainer>
            <InformationPointBox header={klageskjema.summary.sections.person.given_name}>
                <Normaltekst>{combineFirstMiddleName(user)}</Normaltekst>
            </InformationPointBox>
            <InformationPointBox header={klageskjema.summary.sections.person.surname}>
                <Normaltekst>{user.navn.etternavn ?? ''}</Normaltekst>
            </InformationPointBox>
            <InformationPointBox header={klageskjema.summary.sections.person.nin}>
                <Normaltekst>
                    {foedselsnrFormat(user.folkeregisteridentifikator?.identifikasjonsnummer ?? '')}
                </Normaltekst>
            </InformationPointBox>
            <InformationPointBox header={klageskjema.summary.sections.person.phone}>
                <Normaltekst>{user.kontaktinformasjon?.telefonnummer ?? ''}</Normaltekst>
            </InformationPointBox>
            <InformationPointBox header={klageskjema.summary.sections.person.address}>
                <AddressPointBox adress={user.adresse} />
            </InformationPointBox>
        </SpaceBetweenFlexListContainer>
    );
};

export default PersonligeOpplysningerSummary;
