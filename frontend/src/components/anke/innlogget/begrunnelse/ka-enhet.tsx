import { Select } from '@navikt/ds-react';
import React, { useCallback, useMemo } from 'react';
import { useTranslation } from '../../../../language/use-translation';
import { useUpdateAnkeMutation } from '../../../../redux-api/case/anke/api';
import { useKlageenheterForAnke } from '../../../../simple-api-state/use-kodeverk';
import { FormFieldsIds } from '../../../case/common/form-fields-ids';
import { validateKlageenhet } from '../../../case/common/validators';

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

  const validator = useMemo(() => validateKlageenhet(error_messages), [error_messages]);

  const onChange = useCallback(
    (v: string) => {
      const e = validator(v);
      onError(FormFieldsIds.KLAGEENHET, e);
      const value = e === undefined ? v : null;
      update({ key: 'enhetsnummer', value, id: caseId });
    },
    [caseId, onError, update, validator]
  );

  const NoneSelected = () =>
    enhet === null ? (
      <option value={NONE} disabled selected>
        {ankeskjema.begrunnelse.klageenhet.not_specified}
      </option>
    ) : null;

  return (
    <Select
      id={FormFieldsIds.KLAGEENHET}
      label={ankeskjema.begrunnelse.klageenhet.title}
      disabled={isLoading}
      value={enhet ?? undefined}
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
