import { TextField, TextFieldProps } from '@navikt/ds-react';
import React from 'react';

interface UserSaksnummerProps extends Omit<TextFieldProps, 'onChange' | 'value'> {
  onChange: (saksnummer: string) => void;
  value?: string | null;
}

export const UserSaksnummer = ({ onChange, value, ...props }: UserSaksnummerProps) => (
  <TextField {...props} value={value ?? ''} onChange={({ target }) => onChange(target.value)} />
);
