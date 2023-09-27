import React, { useMemo } from 'react';
import { ISODate } from '@app/domain/date/date';
import { useTranslation } from '@app/language/use-translation';
import { DatePicker } from '../../../date-picker/date-picker';
import { FormFieldsIds } from '../form-fields-ids';
import { validateRequiredVedtakDate, validateVedtakDate } from '../validators';

interface Props {
  title: string;
  value: ISODate | null;
  onChange: (value: string | null) => void;
  onError: (id: FormFieldsIds, error?: string) => void;
  error: string | undefined;
  required?: boolean;
}

export const VedtakDatePost = ({ title, value, onChange, onError, error, required = false }: Props) => {
  const { error_messages } = useTranslation();

  const id = required ? FormFieldsIds.VEDTAK_DATE_REQUIRED : FormFieldsIds.VEDTAK_DATE;

  const validator = useMemo(
    () => (required ? validateRequiredVedtakDate : validateVedtakDate)(error_messages),
    [error_messages, required],
  );

  const onInternalChange = (date: string | null) => {
    const e = validator(date);
    onChange(date);
    onError(id, e);
  };

  return <DatePicker id={id} onChange={onInternalChange} error={error} value={value} label={title} size="medium" />;
};
