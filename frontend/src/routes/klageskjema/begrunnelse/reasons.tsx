import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import React from 'react';
import { AutosaveProgressIndicator } from '../../../components/autosave-progress/autosave-progress';
import { ErrorProps, Errors } from '../../../components/errors/errors';
import { useTranslation } from '../../../language/use-translation';
import { useUpdateKlageMutation } from '../../../redux-api/case/klage/api';
import { Reason } from '../../../redux-api/case/klage/types';

interface Props extends Pick<ErrorProps, 'logIn'> {
  id: string;
  checkedReasons: Reason[];
}

export const Reasons = ({ checkedReasons, id, logIn }: Props) => {
  const { klageskjema } = useTranslation();
  const { texts, title } = klageskjema.begrunnelse.reasons;
  const [updateKlage, status] = useUpdateKlageMutation();

  const onChange = (reasons: Reason[]) => updateKlage({ key: 'checkboxesSelected', value: reasons, id });

  return (
    <div>
      <CheckboxGroup legend={title} size="medium" onChange={onChange} value={checkedReasons}>
        <Checkbox value={Reason.AVSLAG_PAA_SOKNAD}>{texts[Reason.AVSLAG_PAA_SOKNAD]}</Checkbox>
        <Checkbox value={Reason.FOR_LITE_UTBETALT}>{texts[Reason.FOR_LITE_UTBETALT]}</Checkbox>
        <Checkbox value={Reason.UENIG_I_NOE_ANNET}>{texts[Reason.UENIG_I_NOE_ANNET]}</Checkbox>
        <Checkbox value={Reason.UENIG_I_VEDTAK_OM_TILBAKEBETALING}>
          {texts[Reason.UENIG_I_VEDTAK_OM_TILBAKEBETALING]}
        </Checkbox>
      </CheckboxGroup>
      <AutosaveProgressIndicator translations={klageskjema} {...status} />
      <Errors error={status.error} logIn={logIn} show={status.isError} />
    </div>
  );
};
