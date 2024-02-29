import { BodyShort } from '@navikt/ds-react';
import React from 'react';
import { displayFnr } from '@app/functions/display';
import { useTranslation } from '@app/language/use-translation';
import { SpaceBetweenFlexListContainer } from '@app/styled-components/common';
import { InformationPointBox } from '../../../information-point-box/information-point-box';

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
      <InformationPointBox header={common.fnr_dnr_or_npid}>
        <BodyShort>{displayFnr(f_or_d_number)}</BodyShort>
      </InformationPointBox>
    </SpaceBetweenFlexListContainer>
  );
};
