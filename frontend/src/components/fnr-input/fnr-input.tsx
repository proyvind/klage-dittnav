import { TextField, TextFieldProps } from '@navikt/ds-react';
import { fnr } from '@navikt/fnrvalidator';
import React from 'react';

interface Props extends TextFieldProps {
  onValidate: (isValid: boolean) => void;
}

export const FnrInput = ({ onValidate, onChange, ...props }: Props) => {
  const onChangeWithValidation = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valid = event.currentTarget.validity.valid && fnr(event.currentTarget.value).status === 'valid';

    onValidate(valid);

    if (typeof onChange === 'function') {
      onChange(event);
    }
  };

  return <TextField {...props} onChange={onChangeWithValidation} />;
};
