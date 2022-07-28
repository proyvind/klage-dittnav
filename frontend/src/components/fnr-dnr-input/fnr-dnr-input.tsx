import { TextField } from '@navikt/ds-react';
import { dnr, fnr } from '@navikt/fnrvalidator';
import React from 'react';
import { useTranslation } from '../../language/use-translation';
import { FormFieldsIds } from '../case/common/form-fields-ids';

interface Props {
  value: string;
  onBlur: (value: string) => void;
  onChange: (value: string) => void;
  onError: (id: FormFieldsIds, error?: string) => void;
  error: string | undefined;
}

export const FnrDnrInput = ({ value, onChange, onBlur, onError, error }: Props) => {
  const { common, error_messages } = useTranslation();

  const onInternalBlur = ({ currentTarget }: React.FocusEvent<HTMLInputElement>) => {
    const cleanedValue = clean(currentTarget.value);

    if (cleanedValue !== currentTarget.value) {
      onChange(cleanedValue);
    }

    onBlur(cleanedValue);

    const valid = fnr(cleanedValue).status === 'valid' || dnr(cleanedValue).status === 'valid';

    const e = valid ? undefined : error_messages.skjema.f_or_d_number;
    onError(FormFieldsIds.FNR_DNR, e);
  };

  return (
    <TextField
      id={FormFieldsIds.FNR_DNR}
      label={common.f_or_d_number}
      value={value}
      onBlur={onInternalBlur}
      minLength={11}
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
