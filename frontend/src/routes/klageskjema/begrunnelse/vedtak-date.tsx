import { Datepicker } from '@navikt/ds-datepicker';
import React from 'react';
import { AutosaveProgressIndicator } from '../../../components/autosave-progress/autosave-progress';
import { ErrorProps, Errors } from '../../../components/errors/errors';
import { ISODate } from '../../../date/date';
import { Languages } from '../../../language/types';
import '@navikt/ds-datepicker/lib/index.css';
import { useTranslation } from '../../../language/use-translation';
import { useUpdateKlageMutation } from '../../../redux-api/case/klage/api';

interface Props extends Pick<ErrorProps, 'logIn'> {
  vedtakDate: ISODate | null;
  useUpdateVedtakDate: typeof useUpdateKlageMutation;
  title: string;
  lang: Languages;
  id: string;
}

export const VedtakDate = ({ title, vedtakDate, lang, useUpdateVedtakDate, id, logIn }: Props) => {
  const { klageskjema } = useTranslation();
  const [updateVedtakDate, status] = useUpdateVedtakDate();

  const onChange = (dateISO: string, isValid: boolean) =>
    updateVedtakDate({ id, key: 'vedtakDate', value: isValid ? dateISO : null });

  return (
    <div>
      <Datepicker
        onChange={onChange}
        value={vedtakDate ?? undefined}
        showYearSelector
        limitations={{
          maxDate: new Date().toISOString().substring(0, 10),
        }}
        id="vedtaksdato"
        inputName="vedtaksdato"
        label={title}
        locale={lang}
      />
      <AutosaveProgressIndicator translations={klageskjema} {...status} />
      <Errors error={status.error} logIn={logIn} show={status.isError} />
    </div>
  );
};
