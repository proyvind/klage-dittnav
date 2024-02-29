import { dnr, fnr } from '@navikt/fnrvalidator';
import { isBefore, isEqual } from 'date-fns';
import { useMemo } from 'react';
import { validNpid } from '@app/domain/npid/valid-npid';
import { ENVIRONMENT } from '@app/environment/environment';
import { useTranslation } from '@app/language/use-translation';

type Validator<T> = (data: T) => string | undefined;

export const useValidators = () => {
  const { error_messages } = useTranslation();

  return useMemo(() => {
    const validateFnrDnr: Validator<string> = (val) => {
      if (val.length === 0) {
        return error_messages.skjema.fnr_dnr_or_npid;
      }

      return fnr(val).status === 'valid' || dnr(val).status === 'valid' || validNpid(val, ENVIRONMENT.isProduction)
        ? undefined
        : error_messages.skjema.fnr_dnr_or_npid;
    };

    const validateFornavn: Validator<string | undefined> = (value) =>
      stringIsEmpty(value) ? error_messages.skjema.fornavn : undefined;

    const validateEtternavn: Validator<string | undefined> = (value) =>
      stringIsEmpty(value) ? error_messages.skjema.etternavn : undefined;

    const validateVedtakDate: Validator<Date | null> = (value) =>
      value === null || validateDate(value) ? undefined : error_messages.skjema.vedtak_date;

    const validateVedtakDateRequired: Validator<Date | null> = (value) =>
      value !== null && validateDate(value) ? undefined : error_messages.skjema.vedtak_date_required;

    const validateCaseIsAtKa: Validator<boolean | null> = (value) =>
      value === null ? error_messages.skjema.case_is_at_ka : undefined;

    const validateEnhet: Validator<string | null> = (value) =>
      value !== null && value.length !== 0 ? undefined : error_messages.skjema.enhet;

    const validateVedleggOrFritekst: Validator<{ hasVedlegg: boolean; fritekst: string; isLoggedIn: boolean }> = ({
      hasVedlegg,
      fritekst,
      isLoggedIn,
    }) => {
      if (hasVedlegg || fritekst.length !== 0) {
        return undefined;
      }

      if (isLoggedIn) {
        return error_messages.skjema.vedleggEllerFritekstLoggedIn;
      }

      return error_messages.skjema.vedleggEllerFritekstLoggedOut;
    };

    return {
      validateFnrDnr,
      validateFornavn,
      validateEtternavn,
      validateVedtakDate,
      validateVedtakDateRequired,
      validateCaseIsAtKa,
      validateEnhet,
      validateVedleggOrFritekst,
    };
  }, [error_messages.skjema]);
};

const stringIsEmpty = (value: string | null | undefined): boolean =>
  value === null || value === undefined || value.length === 0;

const validateDate = (date: Date): boolean => isEqual(date, MAX_DATE) || isBefore(date, MAX_DATE);

const MAX_DATE = new Date();
