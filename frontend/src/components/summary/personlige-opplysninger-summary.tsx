import { BodyShort } from '@navikt/ds-react';
import React from 'react';
import { displayAddress, displayFnr, displayPoststed } from '../../functions/display';
import { isNotUndefined } from '../../functions/is-not-type-guards';
import { Language } from '../../language/language';
import { IAddress, IUser } from '../../redux-api/user/types';
import { SpaceBetweenFlexListContainer } from '../../styled-components/common';
import { InformationPointBox } from '../information-point-box/information-point-box';

interface Props {
  user: IUser;
  translations: Language['klageskjema' | 'ankeskjema'];
}

export const PersonligeOpplysningerSummary = ({ user, translations }: Props) => (
  <SpaceBetweenFlexListContainer>
    <InformationPointBox header={translations.summary.sections.person.given_name}>
      <BodyShort>{combineFirstMiddleName(user)}</BodyShort>
    </InformationPointBox>
    <InformationPointBox header={translations.summary.sections.person.surname}>
      <BodyShort>{user.navn.etternavn ?? ''}</BodyShort>
    </InformationPointBox>
    <InformationPointBox header={translations.summary.sections.person.nin}>
      <BodyShort>{displayFnr(user.folkeregisteridentifikator?.identifikasjonsnummer ?? '')}</BodyShort>
    </InformationPointBox>
    <InformationPointBox header={translations.summary.sections.person.phone}>
      <BodyShort>{user.kontaktinformasjon?.telefonnummer ?? ''}</BodyShort>
    </InformationPointBox>
    <InformationPointBox header={translations.summary.sections.person.address}>
      <AddressPointBox adress={user.adresse} />
    </InformationPointBox>
  </SpaceBetweenFlexListContainer>
);

const combineFirstMiddleName = (user: IUser): string => {
  const { fornavn, mellomnavn } = user.navn;
  return [fornavn, mellomnavn].filter(isNotUndefined).join(' ');
};

const AddressPointBox = ({ adress: address }: { adress?: IAddress }) => {
  if (!address) {
    return null;
  }

  return (
    <div>
      <BodyShort>{displayAddress(address)}</BodyShort>
      <BodyShort>{displayPoststed(address)}</BodyShort>
    </div>
  );
};
