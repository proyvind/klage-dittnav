import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import React from 'react';
import { useTranslation } from '@app/language/use-translation';
import { CaseType, Reason } from '@app/redux-api/case/types';

interface Props {
  checkedReasons: Reason[];
  error?: React.ReactNode;
  onChange: (checkedReasons: Reason[]) => void;
}

export const Reasons = ({ checkedReasons, error, onChange }: Props) => {
  const { skjema } = useTranslation();
  const { texts, title } = skjema.begrunnelse.reasons;

  return (
    <CheckboxGroup
      legend={title[CaseType.KLAGE]}
      size="medium"
      onChange={onChange}
      value={checkedReasons}
      error={error}
    >
      <Checkbox value={Reason.AVSLAG_PAA_SOKNAD}>{texts[Reason.AVSLAG_PAA_SOKNAD]}</Checkbox>
      <Checkbox value={Reason.FOR_LITE_UTBETALT}>{texts[Reason.FOR_LITE_UTBETALT]}</Checkbox>
      <Checkbox value={Reason.UENIG_I_NOE_ANNET}>{texts[Reason.UENIG_I_NOE_ANNET]}</Checkbox>
      <Checkbox value={Reason.UENIG_I_VEDTAK_OM_TILBAKEBETALING}>
        {texts[Reason.UENIG_I_VEDTAK_OM_TILBAKEBETALING]}
      </Checkbox>
    </CheckboxGroup>
  );
};
