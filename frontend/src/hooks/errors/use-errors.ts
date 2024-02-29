import { useCallback } from 'react';
import { FORM_FIELDS_IDS } from '@app/components/case/common/form-fields-ids';
import { ISessionCase } from '@app/components/case/uinnlogget/types';
import { ErrorState, ValidateFn } from '@app/hooks/errors/types';
import { Case } from '@app/redux-api/case/types';

const results: Map<string, ErrorState> = new Map();

type ValidateFieldsFn<T extends Case | ISessionCase> = (data: T) => [boolean, ErrorState];

export const useErrors = <T extends Case | ISessionCase>(validateCase: ValidateFn<T>): ValidateFieldsFn<T> =>
  useCallback(
    (data: T): [boolean, ErrorState] => {
      const _errors = validateCase(data);
      results.set(data.id, _errors);

      return [containsNoErrors(_errors), _errors];
    },
    [validateCase],
  );

const containsNoErrors = (errors: ErrorState) => FORM_FIELDS_IDS.every((key) => errors[key] === undefined);
