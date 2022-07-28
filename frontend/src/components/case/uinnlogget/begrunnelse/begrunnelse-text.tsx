import { Textarea, TextareaProps } from '@navikt/ds-react';
import React, { useMemo } from 'react';
import { Language } from '../../../../language/nb';
import { useTranslation } from '../../../../language/use-translation';
import { FormFieldsIds } from '../../../case/common/form-fields-ids';
import { validateFritekst } from '../../../case/common/validators';

interface Props extends Omit<TextareaProps, 'label' | 'onError'> {
  translations: Language['klageskjema' | 'ankeskjema'];
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  onError: (id: FormFieldsIds, error?: string) => void;
  error: string | undefined;
}

export const BegrunnelseText = ({ error, onError, translations, ...props }: Props) => {
  const { error_messages } = useTranslation();

  const validator = useMemo(() => validateFritekst(error_messages), [error_messages]);

  const onBlur = ({ target }: React.FocusEvent<HTMLTextAreaElement>) =>
    onError(FormFieldsIds.FRITEKST, validator(target.value));

  return (
    <Textarea
      {...props}
      onBlur={onBlur}
      error={error}
      id={FormFieldsIds.FRITEKST}
      label={translations.begrunnelse.begrunnelse_text.title}
      maxLength={0}
      minLength={1}
      minRows={10}
    />
  );
};
