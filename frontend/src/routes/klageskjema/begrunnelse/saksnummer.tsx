import { BodyShort, Label, TextField } from '@navikt/ds-react';
import React, { useState } from 'react';
import { AutosaveProgressIndicator } from '../../../components/autosave-progress/autosave-progress';
import { ErrorProps, Errors } from '../../../components/errors/errors';
import { useTranslation } from '../../../language/use-translation';
import { useUpdateKlageMutation } from '../../../redux-api/case/klage/api';

interface Props extends Omit<UserSaksnummerProps, 'title'> {
  internalSaksnummer: string | null;
}

export const Saksnummer = ({ internalSaksnummer, ...rest }: Props) => {
  const { klageskjema } = useTranslation();
  const { title, internalTitle } = klageskjema.begrunnelse.saksnummer;

  if (internalSaksnummer !== null) {
    return (
      <div>
        <Label>{internalTitle}</Label>
        <BodyShort>{internalSaksnummer}</BodyShort>
      </div>
    );
  }

  return <UserSaksnummer title={title} {...rest} />;
};

interface UserSaksnummerProps extends Pick<ErrorProps, 'logIn'> {
  title: string;
  initialSaksnummer: string | null;
  id: string;
}

const UserSaksnummer = ({ title, initialSaksnummer, logIn, id }: UserSaksnummerProps) => {
  const { klageskjema } = useTranslation();
  const [saksnummer, setSaksnummer] = useState(initialSaksnummer ?? '');

  const [updateKlage, status] = useUpdateKlageMutation();

  const onBlur = () => {
    if (initialSaksnummer !== saksnummer) {
      updateKlage({ key: 'userSaksnummer', value: saksnummer, id });
    }
  };

  return (
    <div>
      <TextField
        label={title}
        value={saksnummer}
        onChange={({ target }) => setSaksnummer(target.value)}
        onBlur={onBlur}
      />
      <AutosaveProgressIndicator translations={klageskjema} {...status} />
      <Errors error={status.error} logIn={logIn} show={status.isError} />
    </div>
  );
};
