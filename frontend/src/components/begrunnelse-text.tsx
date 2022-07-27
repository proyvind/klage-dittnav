import { Textarea } from '@navikt/ds-react';
import React, { useCallback, useEffect, useState } from 'react';
import { useOnUnmount } from '../hooks/use-on-unmount';
import { Language } from '../language/nb';
import { useUpdateAnkeMutation } from '../redux-api/case/anke/api';
import { useUpdateKlageMutation } from '../redux-api/case/klage/api';
import { AutosaveProgressIndicator } from './autosave-progress/autosave-progress';
import { ErrorProps, Errors } from './errors/errors';

interface Props extends Pick<ErrorProps, 'logIn'> {
  initialFritekst: string;
  useUpdateFritekst: typeof useUpdateKlageMutation | typeof useUpdateAnkeMutation;
  showErrors: boolean;
  id: string;
  placeholder: string;
  description: string;
  errorText: string;
  translations: Language['klageskjema' | 'ankeskjema'];
}

export const BegrunnelseText = ({
  id,
  initialFritekst,
  showErrors,
  placeholder,
  description,
  errorText,
  translations,
  useUpdateFritekst,
  logIn,
}: Props) => {
  const [fritekst, setFritekst] = useState<string>(initialFritekst);
  const [isValid, setIsValid] = useState<boolean>(fritekst.length !== 0);
  const [updateFritekst, status] = useUpdateFritekst();
  const [showError, setShowError] = useState<boolean>(false);

  const update = useCallback(() => {
    if (initialFritekst !== fritekst) {
      updateFritekst({ key: 'fritekst', value: fritekst, id })
        .unwrap()
        .then(() => setShowError(false))
        .catch(() => setShowError(true));
    }
  }, [fritekst, id, initialFritekst, updateFritekst]);

  useEffect(() => {
    if (status.isError) {
      return;
    }

    const timeout = setTimeout(update, 1000);

    return () => clearTimeout(timeout);
  }, [update, status.isError]);

  useOnUnmount(update);

  return (
    <div>
      <Textarea
        label={translations.begrunnelse.begrunnelse_text.title}
        value={fritekst}
        description={description}
        placeholder={placeholder}
        maxLength={0}
        minLength={1}
        minRows={10}
        onChange={({ target }) => {
          setFritekst(target.value);
          setIsValid(target.value.length !== 0);
        }}
        error={getError(showErrors, isValid, errorText)}
      />
      <AutosaveProgressIndicator translations={translations} {...status} />
      <Errors logIn={logIn} error={status.error} retry={update} show={showError} />
    </div>
  );
};

const getError = (showErrors: boolean, isValid: boolean, message: string) => {
  if (showErrors && !isValid) {
    return message;
  }

  return null;
};
