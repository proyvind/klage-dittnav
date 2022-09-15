import { Select } from '@navikt/ds-react';
import React from 'react';
import { useTranslation } from '../../language/use-translation';
import { useKlageenheterForAnke } from '../../simple-api-state/use-kodeverk';
import { FormFieldsIds } from '../case/common/form-fields-ids';

interface Props {
  enhet: string | undefined;
  onChange: (enhet: string | undefined) => void;
  error: string | undefined;
}

export const KaEnhet = ({ enhet, onChange, error }: Props) => {
  const { ettersendelse } = useTranslation();
  const { data, isLoading } = useKlageenheterForAnke();

  const onInternalChange: React.ChangeEventHandler<HTMLSelectElement> = ({ target }) => {
    onChange(target.value === NONE ? undefined : target.value);
  };

  return (
    <Select
      id={FormFieldsIds.KLAGEENHET}
      label={ettersendelse.enhet.title}
      disabled={isLoading}
      value={enhet ?? undefined}
      onChange={onInternalChange}
      error={error}
    >
      <option value={NONE}>{ettersendelse.enhet.none}</option>
      {data?.map((k) => (
        <option key={k.id} value={k.id}>
          {k.navn}
        </option>
      ))}
    </Select>
  );
};

const NONE = 'NONE';
