import { parse } from 'date-fns';
import { useCallback } from 'react';
import { FormFieldsIds } from '@app/components/case/common/form-fields-ids';
import { useValidators } from '@app/components/case/common/validators';
import { ISessionCase } from '@app/components/case/uinnlogget/types';
import { FORMAT } from '@app/components/date-picker/constants';
import { ErrorState, INITIAL_ERRORS, ValidateFnFactory } from '@app/hooks/errors/types';
import { Case, CaseType } from '@app/redux-api/case/types';

export const useValidateCommonCaseFn: ValidateFnFactory<Case | ISessionCase> = (type: CaseType) => {
  const { validateCaseIsAtKa, validateEnhet, validateVedtakDateRequired, validateVedtakDate } = useValidators();

  return useCallback(
    (data) => {
      const errors: ErrorState = { ...INITIAL_ERRORS };
      const { enhetsnummer, vedtakDate, caseIsAtKA } = data;

      if (type === CaseType.ANKE || type === CaseType.ETTERSENDELSE_ANKE) {
        const date = vedtakDate === null ? null : parse(vedtakDate, FORMAT, new Date());
        errors[FormFieldsIds.VEDTAK_DATE] = validateVedtakDateRequired(date);
      } else if (type === CaseType.KLAGE || type === CaseType.ETTERSENDELSE_KLAGE) {
        const date = vedtakDate === null ? null : parse(vedtakDate, FORMAT, new Date());
        errors[FormFieldsIds.VEDTAK_DATE] = validateVedtakDate(date);
      }

      if (type === CaseType.ETTERSENDELSE_KLAGE) {
        errors[FormFieldsIds.CASE_IS_AT_KA] = validateCaseIsAtKa(caseIsAtKA);
      }

      if (caseIsAtKA === true || type === CaseType.ANKE || type === CaseType.ETTERSENDELSE_ANKE) {
        errors[FormFieldsIds.ENHETSNUMMER] = validateEnhet(enhetsnummer);
      }

      return errors;
    },
    [type, validateCaseIsAtKa, validateEnhet, validateVedtakDate, validateVedtakDateRequired],
  );
};
