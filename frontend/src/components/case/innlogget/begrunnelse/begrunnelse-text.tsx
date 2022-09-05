import { Textarea, TextareaProps } from '@navikt/ds-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { isApiError, isError } from '../../../../functions/is-api-error';
import { useOnUnmount } from '../../../../hooks/use-on-unmount';
import { Language } from '../../../../language/nb';
import { useTranslation } from '../../../../language/use-translation';
import { useUpdateAnkeMutation } from '../../../../redux-api/case/anke/api';
import { useUpdateKlageMutation } from '../../../../redux-api/case/klage/api';
import { AutosaveProgressIndicator } from '../../../autosave-progress/autosave-progress';
import { FormFieldsIds } from '../../../case/common/form-fields-ids';
import { validateFritekst } from '../../../case/common/validators';

interface Props extends Omit<TextareaProps, 'label' | 'onError'> {
  initialFritekst: string;
  useUpdateFritekst: typeof useUpdateKlageMutation | typeof useUpdateAnkeMutation;
  caseId: string;
  translations: Language['klageskjema' | 'ankeskjema'];
  onError: (id: FormFieldsIds, error?: string) => void;
  error: string | undefined;
}

export const BegrunnelseTextDigital = ({
  caseId,
  description,
  error,
  initialFritekst,
  onError,
  placeholder,
  translations,
  useUpdateFritekst,
}: Props) => {
  const { common, error_messages } = useTranslation();
  const [fritekst, setFritekst] = useState<string>(initialFritekst);
  const [updateFritekst, status] = useUpdateFritekst();

  const update = useCallback(() => {
    if (initialFritekst !== fritekst) {
      updateFritekst({ key: 'fritekst', value: fritekst, id: caseId })
        .unwrap()
        .catch((e) => {
          if (isError(e) && e.status === 401) {
            onError(FormFieldsIds.FRITEKST, common.logged_out);

            return;
          }

          if (isApiError(e)) {
            onError(FormFieldsIds.FRITEKST, error_messages[e.data.detail]);

            return;
          }

          onError(FormFieldsIds.FRITEKST, common.generic_error);
        });
    }
  }, [
    initialFritekst,
    fritekst,
    updateFritekst,
    caseId,
    onError,
    common.generic_error,
    common.logged_out,
    error_messages,
  ]);

  useEffect(() => {
    if (status.isError) {
      return;
    }

    const timeout = setTimeout(update, 1000);

    return () => clearTimeout(timeout);
  }, [update, status.isError]);

  useOnUnmount(update);

  const validator = useMemo(() => validateFritekst(error_messages), [error_messages]);

  const onBlur = ({ target }: React.FocusEvent<HTMLTextAreaElement>) =>
    onError(FormFieldsIds.FRITEKST, validator(target.value));

  const onChange = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => setFritekst(target.value);

  return (
    <div>
      <Textarea
        description={description}
        error={error}
        id={FormFieldsIds.FRITEKST}
        label={translations.begrunnelse.begrunnelse_text.title}
        maxLength={0}
        minLength={1}
        minRows={10}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        value={fritekst}
      />
      <AutosaveProgressIndicator translations={translations} {...status} />
    </div>
  );
};