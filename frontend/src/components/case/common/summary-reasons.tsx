import { BodyShort } from '@navikt/ds-react';
import React from 'react';
import { styled } from 'styled-components';
import { useTranslation } from '@app/language/use-translation';
import { Reason } from '@app/redux-api/case/types';

interface Props {
  checkboxesSelected: Reason[];
}

export const SummaryReasons = ({ checkboxesSelected }: Props) => {
  const { skjema, common } = useTranslation();
  const reasonTexts = skjema.begrunnelse.reasons.texts;

  if (checkboxesSelected.length === 0) {
    return <BodyShort>{common.not_specified}</BodyShort>;
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
  padding-top: 8px;
  padding-left: 24px;
`;
