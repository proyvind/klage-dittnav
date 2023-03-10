import { TextField, TextFieldProps } from '@navikt/ds-react';
import React from 'react';

interface UserSaksnummerProps extends Omit<TextFieldProps, 'onChange' | 'value'> {
  onChange: (saksnummer: string) => void;
  userSaksnummer?: string | null;
}

export const UserSaksnummer = ({ onChange, userSaksnummer, ...props }: UserSaksnummerProps) => (
  <TextField {...props} value={userSaksnummer ?? ''} onChange={({ target }) => onChange(target.value)} htmlSize={24} />
);
