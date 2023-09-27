import { Select } from '@navikt/ds-react';
import React, { useCallback, useMemo } from 'react';
import { useTranslation } from '@app/language/use-translation';
import { useUpdateAnkeMutation } from '@app/redux-api/case/anke/api';
import { useKlageenheterForAnke } from '@app/simple-api-state/use-kodeverk';
import { FormFieldsIds } from '../../../case/common/form-fields-ids';
import { validateKlageenhetAnke } from '../../../case/common/validators';

interface Props {
  caseId: string;
  enhet: string | null;
  onError: (id: FormFieldsIds, error?: string) => void;
  error: string | undefined;
}

export const KaEnhet = ({ caseId, enhet, onError, error }: Props) => {
  const { ankeskjema, error_messages } = useTranslation();
  const [update] = useUpdateAnkeMutation();
  const { data, isLoading } = useKlageenheterForAnke();

  const validator = useMemo(() => validateKlageenhetAnke(error_messages), [error_messages]);

  const onChange = useCallback(
    (v: string) => {
      const e = validator(v);
      onError(FormFieldsIds.KLAGEENHET_ANKE, e);
      const value = e === undefined ? v : null;
      update({ key: 'enhetsnummer', value, id: caseId });
    },
    [caseId, onError, update, validator],
  );

  const NoneSelected = () =>
    enhet === null ? (
      <option value={NONE} disabled>
        {ankeskjema.begrunnelse.klageenhet.not_specified}
      </option>
    ) : null;

  return (
    <Select
      id={FormFieldsIds.KLAGEENHET_ANKE}
      label={ankeskjema.begrunnelse.klageenhet.title}
      disabled={isLoading}
      value={enhet ?? NONE}
      onChange={({ target }) => onChange(target.value)}
      error={error}
    >
      <NoneSelected />
      {data?.map((k) => (
        <option key={k.id} value={k.id}>
          {k.navn}
        </option>
      ))}
    </Select>
  );
};

const NONE = 'NONE';
