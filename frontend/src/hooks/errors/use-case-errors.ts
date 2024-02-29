import { useCallback } from 'react';
import { FormFieldsIds } from '@app/components/case/common/form-fields-ids';
import { useValidators } from '@app/components/case/common/validators';
import { ErrorState, INITIAL_ERRORS, ValidateFnFactory } from '@app/hooks/errors/types';
import { useValidateCommonCaseFn } from '@app/hooks/errors/use-common-case-errors';
import { useErrors } from '@app/hooks/errors/use-errors';
import { Case, CaseType } from '@app/redux-api/case/types';

const useValidateCaseFn: ValidateFnFactory<Case> = (type: CaseType) => {
  const { validateVedleggOrFritekst } = useValidators();

  const validateCommonCase = useValidateCommonCaseFn(type);

  return useCallback(
    (data) => {
      const errors: ErrorState = { ...INITIAL_ERRORS, ...validateCommonCase(data) };
      const { fritekst, vedlegg } = data;

      const error = validateVedleggOrFritekst({ hasVedlegg: vedlegg.length !== 0, fritekst, isLoggedIn: true });

      errors[FormFieldsIds.FRITEKST] = error;
      errors[FormFieldsIds.VEDLEGG] = error;

      return errors;
    },
    [validateCommonCase, validateVedleggOrFritekst],
  );
};

export const useCaseErrors = (type: CaseType) => useErrors(useValidateCaseFn(type));
