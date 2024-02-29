import { Select } from '@navikt/ds-react';
import React from 'react';
import { FormFieldsIds } from '@app/components/case/common/form-fields-ids';
import { useTranslation } from '@app/language/use-translation';
import { CaseType } from '@app/redux-api/case/types';
import { useKlageenheter } from '@app/simple-api-state/use-kodeverk';

interface Props {
  enhet: string | null;
  onChange: (enhet: string | null) => void;
  error: string | undefined;
  type: CaseType;
}

export const KaEnhet = ({ type, enhet, onChange, error }: Props) => {
  const { skjema } = useTranslation();
  const { data, isLoading } = useKlageenheter();

  const texts = skjema.begrunnelse.klageenhet;

  return (
    <Select
      id={FormFieldsIds.ENHETSNUMMER}
      label={texts.title[type]}
      disabled={isLoading}
      value={enhet ?? NONE}
      onChange={({ target }) => onChange(target.value === NONE ? null : target.value)}
      error={error}
    >
      <option value={NONE} disabled>
        {texts.none}
      </option>
      {data?.map((k) => (
        <option key={k.id} value={k.id}>
          {k.navn}
        </option>
      ))}
    </Select>
  );
};

const NONE = 'NONE';
