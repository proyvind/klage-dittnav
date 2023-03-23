import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import React from 'react';
import { useTranslation } from '@app/language/use-translation';
import { Reason } from '@app/redux-api/case/klage/types';

interface Props {
  checkedReasons: Reason[];
  error?: React.ReactNode;
  onChange: (checkedReasons: Reason[]) => void;
}

export const Reasons = ({ checkedReasons, error, onChange }: Props) => {
  const { klageskjema } = useTranslation();
  const { texts, title } = klageskjema.begrunnelse.reasons;

  return (
    <CheckboxGroup legend={title} size="medium" onChange={onChange} value={checkedReasons} error={error}>
      <Checkbox value={Reason.AVSLAG_PAA_SOKNAD}>{texts[Reason.AVSLAG_PAA_SOKNAD]}</Checkbox>
      <Checkbox value={Reason.FOR_LITE_UTBETALT}>{texts[Reason.FOR_LITE_UTBETALT]}</Checkbox>
      <Checkbox value={Reason.UENIG_I_NOE_ANNET}>{texts[Reason.UENIG_I_NOE_ANNET]}</Checkbox>
      <Checkbox value={Reason.UENIG_I_VEDTAK_OM_TILBAKEBETALING}>
        {texts[Reason.UENIG_I_VEDTAK_OM_TILBAKEBETALING]}
      </Checkbox>
    </CheckboxGroup>
  );
};
