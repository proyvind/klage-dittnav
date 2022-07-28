import { dnr, fnr } from '@navikt/fnrvalidator';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { Language } from '../../../language/language';

dayjs.extend(isSameOrBefore);

export type Validator = (value: string | null) => string | undefined;
export type ValidatorFactory = (errorMessages: Language['error_messages']) => Validator;

export const validateFnrDnr: ValidatorFactory =
  ({ skjema }) =>
  (val) =>
    fnr(val ?? '').status === 'valid' || dnr(val ?? '').status === 'valid' ? undefined : skjema.f_or_d_number;

export const validateFornavn: ValidatorFactory =
  ({ skjema }) =>
  (value) =>
    stringNotEmpty(value) ? undefined : skjema.fornavn;

export const validateEtternavn: ValidatorFactory =
  ({ skjema }) =>
  (value) =>
    stringNotEmpty(value) ? undefined : skjema.etternavn;

export const validateVedtakDate: ValidatorFactory =
  ({ skjema }) =>
  (value) =>
    value === null || value.length === 0 || validateDate(value) ? undefined : skjema.vedtak_date;

export const validateRequiredVedtakDate: ValidatorFactory =
  ({ skjema }) =>
  (value) =>
    value !== null && value.length !== 0 && validateDate(value) ? undefined : skjema.vedtak_date_required;

export const validateKlageenhet: ValidatorFactory =
  ({ skjema }) =>
  (value) =>
    value !== null && value.length !== 0 && value !== 'NONE' ? undefined : skjema.enhet;

export const validateFritekst: ValidatorFactory =
  ({ skjema }) =>
  (fritekst) =>
    stringNotEmpty(fritekst) ? undefined : skjema.begrunnelse;

const stringNotEmpty = (value: string | null): boolean => value !== null && value.length !== 0;

const validateDate = (value: string): boolean => {
  const date = dayjs(value, 'YYYY-MM-DD', true);

  return date.isValid() && date.isSameOrBefore(MAX_DATE);
};

const MAX_DATE = dayjs();
