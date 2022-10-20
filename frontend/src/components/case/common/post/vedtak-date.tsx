import { Datepicker, DatepickerChange } from '@navikt/ds-datepicker';
import '@navikt/ds-datepicker/lib/index.css';
import React, { useMemo } from 'react';
import { ISODate } from '../../../../domain/date/date';
import { useLanguage } from '../../../../language/use-language';
import { useTranslation } from '../../../../language/use-translation';
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

const MAX_DATE = new Date().toISOString().substring(0, 10);

export const VedtakDatePost = ({ title, value, onChange, onError, error, required = false }: Props) => {
  const langugage = useLanguage();
  const { error_messages } = useTranslation();

  const id = required ? FormFieldsIds.VEDTAK_DATE_REQUIRED : FormFieldsIds.VEDTAK_DATE;

  const validator = useMemo(
    () => (required ? validateRequiredVedtakDate : validateVedtakDate)(error_messages),
    [error_messages, required]
  );

  const onInternalChange: DatepickerChange = (date) => {
    const e = validator(date);
    onChange(date);
    onError(id, e);
  };

  return (
    <Datepicker
      id={id}
      onChange={onInternalChange}
      error={error}
      value={value ?? undefined}
      showYearSelector
      limitations={{
        maxDate: MAX_DATE,
      }}
      inputName={id}
      label={title}
      locale={langugage}
    />
  );
};
