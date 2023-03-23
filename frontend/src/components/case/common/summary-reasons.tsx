import { BodyShort } from '@navikt/ds-react';
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from '@app/language/use-translation';
import { Reason } from '@app/redux-api/case/klage/types';

interface Props {
  checkboxesSelected: Reason[];
}

export const SummaryReasons = ({ checkboxesSelected }: Props) => {
  const { klageskjema } = useTranslation();
  const reasonTexts = klageskjema.begrunnelse.reasons.texts;

  if (checkboxesSelected.length === 0) {
    return <BodyShort>{klageskjema.begrunnelse.reasons.not_specified}</BodyShort>;
  }

  return (
    <ReasonList>
      {checkboxesSelected.map((c) => (
        <li key={c}>{reasonTexts[c]}</li>
      ))}
    </ReasonList>
  );
};

const ReasonList = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  margin: 0;
  padding-left: 16px;
`;
