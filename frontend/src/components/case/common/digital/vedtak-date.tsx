import React, { useCallback, useMemo, useState } from 'react';
import { ISODate } from '@app/domain/date/date';
import { isApiError, isError } from '@app/functions/is-api-error';
import { isErrorMessageKey } from '@app/language/error-messages';
import { Language } from '@app/language/nb';
import { useTranslation } from '@app/language/use-translation';
import { useUpdateAnkeMutation } from '@app/redux-api/case/anke/api';
import { useUpdateKlageMutation } from '@app/redux-api/case/klage/api';
import { AutosaveProgressIndicator } from '../../../autosave-progress/autosave-progress';
import { DatePicker } from '../../../date-picker/date-picker';
import { FormFieldsIds } from '../form-fields-ids';
import { validateRequiredVedtakDate, validateVedtakDate } from '../validators';

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
  const [date, setDate] = useState(vedtakDate);
  const { common, error_messages } = useTranslation();
  const [updateVedtakDate, status] = useUpdate();
  const id = required ? FormFieldsIds.VEDTAK_DATE_REQUIRED : FormFieldsIds.VEDTAK_DATE;
  const validator = useMemo(
    () => (required ? validateRequiredVedtakDate : validateVedtakDate)(error_messages),
    [error_messages, required],
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
              onError(id, isErrorMessageKey(e.data.detail) ? error_messages[e.data.detail] : undefined);

              return;
            }

            onError(id, common.generic_error);
          });
      }
    },
    [updateVedtakDate, caseId, onError, id, common.generic_error, common.logged_out, error_messages],
  );

  const onInternalChange = (value: string | null) => {
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
      <DatePicker
        id={id}
        onChange={onInternalChange}
        error={error}
        value={date ?? null}
        label={skjema.begrunnelse.vedtak_date.title}
        size="medium"
      />
      <AutosaveProgressIndicator translations={skjema} {...status} />
    </div>
  );
};
