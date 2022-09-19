import { Select } from '@navikt/ds-react';
import React, { useMemo } from 'react';
import { useTranslation } from '../../../../language/use-translation';
import { useKlageenheterForAnke } from '../../../../simple-api-state/use-kodeverk';
import { FormFieldsIds } from '../../../case/common/form-fields-ids';
import { validateKlageenhet } from '../../../case/common/validators';

interface Props {
  enhet: string | null;
  onChange: (enhet: string | null) => void;
  onError: (id: FormFieldsIds, error?: string) => void;
  error: string | undefined;
}

export const KaEnhet = ({ enhet, onChange, onError, error }: Props) => {
  const { error_messages, ankeskjema } = useTranslation();
  const { data, isLoading } = useKlageenheterForAnke();

  const validator = useMemo(() => validateKlageenhet(error_messages), [error_messages]);

  const onInternalChange: React.ChangeEventHandler<HTMLSelectElement> = ({ target }) => {
    const e = validator(target.value);
    onError(FormFieldsIds.KLAGEENHET, e);
    onChange(e === undefined ? target.value : null);
  };

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
      onChange={onInternalChange}
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
