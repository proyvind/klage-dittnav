import { BodyShort } from '@navikt/ds-react';
import React from 'react';
import { displayFnr } from '../../functions/display';
import { useTranslation } from '../../language/use-translation';
import { SpaceBetweenFlexListContainer } from '../../styled-components/common';
import { InformationPointBox } from '../information-point-box/information-point-box';

interface Props {
  fornavn?: string;
  etternavn?: string;
  f_or_d_number?: string;
}

export const PersonligeOpplysningerSummary = ({ fornavn, etternavn, f_or_d_number }: Props) => {
  const { common } = useTranslation();

  return (
    <SpaceBetweenFlexListContainer>
      <InformationPointBox header={common.fornavn}>
        <BodyShort>{fornavn}</BodyShort>
      </InformationPointBox>
      <InformationPointBox header={common.etternavn}>
        <BodyShort>{etternavn}</BodyShort>
      </InformationPointBox>
      <InformationPointBox header={common.f_or_d_number}>
        <BodyShort>{displayFnr(f_or_d_number)}</BodyShort>
      </InformationPointBox>
    </SpaceBetweenFlexListContainer>
  );
};
