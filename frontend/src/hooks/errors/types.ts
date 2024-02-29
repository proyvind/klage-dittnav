import { FormFieldsIds } from '@app/components/case/common/form-fields-ids';
import { ISessionCase } from '@app/components/case/uinnlogget/types';
import { Case, CaseType } from '@app/redux-api/case/types';

export type ErrorState = Record<FormFieldsIds, string | undefined>;

export const INITIAL_ERRORS: ErrorState = {
  [FormFieldsIds.FNR_DNR_NPID]: undefined,
  [FormFieldsIds.FORNAVN]: undefined,
  [FormFieldsIds.ETTERNAVN]: undefined,
  [FormFieldsIds.VEDTAK_DATE]: undefined,
  [FormFieldsIds.CASE_IS_AT_KA]: undefined,
  [FormFieldsIds.ENHETSNUMMER]: undefined,
  [FormFieldsIds.SAKSNUMMER]: undefined,
  [FormFieldsIds.FRITEKST]: undefined,
  [FormFieldsIds.VEDLEGG]: undefined,
};

export type ValidateFn<T> = (data: T) => ErrorState;
export type ValidateFnFactory<T extends Case | ISessionCase> = (type: CaseType) => ValidateFn<T>;
