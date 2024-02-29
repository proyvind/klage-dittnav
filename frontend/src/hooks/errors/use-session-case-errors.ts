import { useCallback } from 'react';
import { FormFieldsIds } from '@app/components/case/common/form-fields-ids';
import { useValidators } from '@app/components/case/common/validators';
import { ISessionCase } from '@app/components/case/uinnlogget/types';
import { ErrorState, INITIAL_ERRORS, ValidateFnFactory } from '@app/hooks/errors/types';
import { useValidateCommonCaseFn } from '@app/hooks/errors/use-common-case-errors';
import { useErrors } from '@app/hooks/errors/use-errors';
import { CaseType } from '@app/redux-api/case/types';

const useValidateSessionCaseFn: ValidateFnFactory<ISessionCase> = (type) => {
  const { validateEtternavn, validateFnrDnr, validateFornavn, validateVedleggOrFritekst } = useValidators();

  const validateCommonCase = useValidateCommonCaseFn(type);

  return useCallback(
    (data) => {
      const errors: ErrorState = { ...INITIAL_ERRORS, ...validateCommonCase(data) };

      const { foedselsnummer, navn, fritekst, hasVedlegg } = data;

      errors[FormFieldsIds.FNR_DNR_NPID] = validateFnrDnr(foedselsnummer);
      errors[FormFieldsIds.FORNAVN] = validateFornavn(navn.fornavn);
      errors[FormFieldsIds.ETTERNAVN] = validateEtternavn(navn.etternavn);

      const error = validateVedleggOrFritekst({ hasVedlegg, fritekst, isLoggedIn: false });

      errors[FormFieldsIds.FRITEKST] = error;
      errors[FormFieldsIds.VEDLEGG] = error;

      return errors;
    },
    [validateCommonCase, validateEtternavn, validateFnrDnr, validateFornavn, validateVedleggOrFritekst],
  );
};

export const useSessionCaseErrors = (type: CaseType) => useErrors(useValidateSessionCaseFn(type));
