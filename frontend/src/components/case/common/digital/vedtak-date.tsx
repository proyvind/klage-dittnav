import { Datepicker, DatepickerChange } from '@navikt/ds-datepicker';
import React, { useCallback, useMemo, useState } from 'react';
import { ISODate } from '../../../../domain/date/date';
import { isApiError, isError } from '../../../../functions/is-api-error';
import { Language } from '../../../../language/nb';
import { useLanguage } from '../../../../language/use-language';
import { useTranslation } from '../../../../language/use-translation';
import { useUpdateAnkeMutation } from '../../../../redux-api/case/anke/api';
import { useUpdateKlageMutation } from '../../../../redux-api/case/klage/api';
import { AutosaveProgressIndicator } from '../../../autosave-progress/autosave-progress';
import { FormFieldsIds } from '../form-fields-ids';
import { validateRequiredVedtakDate, validateVedtakDate } from '../validators';
import '@navikt/ds-datepicker/lib/index.css';

interface VedtakDateProps {
  vedtakDate: ISODate | null;
  caseId: string;
  skjema: Language['klageskjema' | 'ankeskjema'];
  useUpdate: typeof useUpdateKlageMutation | typeof useUpdateAnkeMutation;
  onError: (id: FormFieldsIds, error?: string) => void;
  error: string | undefined;
  required?: boolean;
}

export const VedtakDateDigital = ({
  caseId,
  vedtakDate,
  skjema,
  useUpdate,
  onError,
  error,
  required = false,
}: VedtakDateProps) => {
  const langugage = useLanguage();
  const [date, setDate] = useState(vedtakDate);
  const { common, error_messages } = useTranslation();
  const [updateVedtakDate, status] = useUpdate();
  const id = required ? FormFieldsIds.VEDTAK_DATE_REQUIRED : FormFieldsIds.VEDTAK_DATE;
  const validator = useMemo(
    () => (required ? validateRequiredVedtakDate : validateVedtakDate)(error_messages),
    [error_messages, required]
  );

  const update = useCallback(
    (value: string | null) => {
      {
        updateVedtakDate({ key: 'vedtakDate', value, id: caseId })
          .unwrap()
          .catch((e) => {
            if (isError(e) && e.status === 401) {
              onError(id, common.logged_out);

              return;
            }

            if (isApiError(e)) {
              onError(id, error_messages[e.data.detail]);

              return;
            }

            onError(id, common.generic_error);
          });
      }
    },
    [updateVedtakDate, caseId, onError, id, common.generic_error, common.logged_out, error_messages]
  );

  const onInternalChange: DatepickerChange = (value: string) => {
    if (value === date) {
      return;
    }

    setDate(value);

    const e = validator(value);

    if (typeof e === 'undefined') {
      update(value === '' ? null : value);
    }

    onError(id, e);
  };

  return (
    <div>
      <Datepicker
        id={id}
        onChange={onInternalChange}
        error={error}
        value={date ?? undefined}
        showYearSelector
        limitations={{
          maxDate: MAX_DATE,
        }}
        inputName={id}
        label={skjema.begrunnelse.vedtak_date.title}
        locale={langugage}
      />
      <AutosaveProgressIndicator translations={skjema} {...status} />
    </div>
  );
};

const MAX_DATE = new Date().toISOString().substring(0, 10);
