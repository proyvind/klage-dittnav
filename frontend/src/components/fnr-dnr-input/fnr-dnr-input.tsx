import { TextField } from '@navikt/ds-react';
import React from 'react';
import { useTranslation } from '@app/language/use-translation';
import { FormFieldsIds } from '../case/common/form-fields-ids';

interface Props {
  value: string;
  onChange: (value: string) => void;
  error: string | undefined;
}

export const FnrDnrInput = ({ value, onChange, error }: Props) => {
  const { common } = useTranslation();

  const onInternalBlur = ({ currentTarget }: React.FocusEvent<HTMLInputElement>) => {
    const cleanedValue = clean(currentTarget.value);

    if (cleanedValue !== currentTarget.value) {
      onChange(cleanedValue);
    }
  };

  return (
    <TextField
      id={FormFieldsIds.FNR_DNR_NPID}
      label={common.fnr_dnr_or_npid}
      value={value}
      onBlur={onInternalBlur}
      minLength={11}
      htmlSize={11}
      error={error}
      pattern="^[0-9]{11}$"
      inputMode="numeric"
      onChange={({ target }) => onChange(target.value)}
      onPaste={(event) => {
        event.preventDefault();
        const pasted = event.clipboardData.getData('text/plain');
        const cleaned = clean(pasted);
        onChange(cleaned);
      }}
    />
  );
};

const clean = (value: string) => value.replaceAll(/\D/gi, '');
