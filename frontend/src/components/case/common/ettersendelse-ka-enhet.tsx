import { Radio, RadioGroup } from '@navikt/ds-react';
import React from 'react';
import { styled } from 'styled-components';
import { useTranslation } from '@app/language/use-translation';
import { CaseType } from '@app/redux-api/case/types';
import { KaEnhet } from './ka-enhet';

interface Props {
  caseIsAtKA: boolean | null;
  enhet: string | null;
  onEnhetChange: (enhet: string | null) => void;
  onIsAtKaChange: (caseIsAtKA: boolean) => void;
  error: string | undefined;
  enhetError: string | undefined;
  type: CaseType;
}

export const EttersendelseKaEnhet = ({
  enhet,
  caseIsAtKA,
  onEnhetChange,
  onIsAtKaChange,
  error,
  enhetError,
  type,
}: Props) => {
  const { skjema, common } = useTranslation();

  return (
    <>
      <RadioGroup
        legend={skjema.begrunnelse.klageenhet.radio_title}
        onChange={(v) => onIsAtKaChange(v === YES)}
        value={toValue(caseIsAtKA)}
        error={error}
      >
        <HorizontalOptions>
          <Radio value={YES}>{common.yes}</Radio>
          <Radio value={NO}>{common.no}</Radio>
        </HorizontalOptions>
      </RadioGroup>
      {caseIsAtKA === true ? <KaEnhet type={type} enhet={enhet} error={enhetError} onChange={onEnhetChange} /> : null}
    </>
  );
};

const YES = 'true';
const NO = 'false';

const toValue = (value: boolean | null) => {
  if (value === null) {
    return undefined;
  }

  return value ? YES : NO;
};

const HorizontalOptions = styled.div`
  display: flex;
  gap: 16px;
`;
