import { useCallback, useMemo, useState } from 'react';
import { ISessionAnke } from '../components/anke/uinnlogget/types';
import { FormFieldsIds } from '../components/case/common/form-fields-ids';
import {
  ValidatorFactory,
  validateEtternavn,
  validateFnrDnr,
  validateFornavn,
  validateFritekst,
  validateKlageenhet,
  validateRequiredVedtakDate,
  validateVedtakDate,
} from '../components/case/common/validators';
import { ISessionKlage } from '../components/klage/uinnlogget/types';
import { useTranslation } from '../language/use-translation';
import { Anke } from '../redux-api/case/anke/types';
import { Klage } from '../redux-api/case/klage/types';

export type ErrorState = Record<FormFieldsIds, string | undefined>;

const INITIAL_ERRORS: ErrorState = {
  [FormFieldsIds.FNR_DNR]: undefined,
  [FormFieldsIds.FORNAVN]: undefined,
  [FormFieldsIds.ETTERNAVN]: undefined,
  [FormFieldsIds.VEDTAK_DATE]: undefined,
  [FormFieldsIds.VEDTAK_DATE_REQUIRED]: undefined,
  [FormFieldsIds.KLAGEENHET]: undefined,
  [FormFieldsIds.SAKSNUMMER]: undefined,
  [FormFieldsIds.FRITEKST]: undefined,
};

const VALIDATORS: Record<FormFieldsIds, ValidatorFactory> = {
  [FormFieldsIds.FNR_DNR]: validateFnrDnr,
  [FormFieldsIds.FORNAVN]: validateFornavn,
  [FormFieldsIds.ETTERNAVN]: validateEtternavn,
  [FormFieldsIds.VEDTAK_DATE]: validateVedtakDate,
  [FormFieldsIds.VEDTAK_DATE_REQUIRED]: validateRequiredVedtakDate,
  [FormFieldsIds.KLAGEENHET]: validateKlageenhet,
  [FormFieldsIds.SAKSNUMMER]: () => () => undefined,
  [FormFieldsIds.FRITEKST]: validateFritekst,
};

interface SessionKlageValues {
  [FormFieldsIds.FNR_DNR]: string | null;
  [FormFieldsIds.FORNAVN]: string | null;
  [FormFieldsIds.ETTERNAVN]: string | null;
  [FormFieldsIds.VEDTAK_DATE]: string | null;
  [FormFieldsIds.FRITEKST]: string | null;
}

interface SessionAnkeValues {
  [FormFieldsIds.FNR_DNR]: string | null;
  [FormFieldsIds.FORNAVN]: string | null;
  [FormFieldsIds.ETTERNAVN]: string | null;
  [FormFieldsIds.VEDTAK_DATE_REQUIRED]: string | null;
  [FormFieldsIds.KLAGEENHET]: string | null;
  [FormFieldsIds.FRITEKST]: string | null;
}

interface KlageValues {
  [FormFieldsIds.FRITEKST]: string | null;
  [FormFieldsIds.VEDTAK_DATE]: string | null;
}

interface AnkeValues {
  [FormFieldsIds.FRITEKST]: string | null;
  [FormFieldsIds.KLAGEENHET]: string | null;
  [FormFieldsIds.VEDTAK_DATE_REQUIRED]: string | null;
}

type ValidationValues = SessionKlageValues | SessionAnkeValues | KlageValues | AnkeValues;

export type Data =
  | {
      caseData: Klage;
      type: 'klage';
    }
  | {
      caseData: Anke;
      type: 'anke';
    }
  | {
      caseData: ISessionKlage;
      type: 'session-klage';
    }
  | {
      caseData: ISessionAnke;
      type: 'session-anke';
    };

export const useErrors = (data: Data) => {
  const { error_messages } = useTranslation();
  const [errors, setErrors] = useState(INITIAL_ERRORS);

  const values = useMemo(() => getValues(data), [data]);
  const setError = useCallback((id: FormFieldsIds, error?: string) => setErrors((e) => ({ ...e, [id]: error })), []);
  const isValid = useMemo(() => Object.values(errors).every((v) => v === undefined), [errors]);

  const isEverythingValid = useCallback(() => {
    const validities = Object.entries(values)
      .map<[FormFieldsIds | string, string | undefined]>(([id, value]) => {
        if (isFormFieldId(id)) {
          const validator = VALIDATORS[id](error_messages);

          return [id, validator(value)];
        }

        return [id, undefined];
      })
      .filter<[FormFieldsIds, string | undefined]>(isFormFieldError);

    validities.forEach(([id, e]) => setError(id, e));

    return validities.every(([, e]) => e === undefined);
  }, [error_messages, setError, values]);

  return { errors, isValid, isEverythingValid, setError };
};

const isFormFieldId = (id: string): id is FormFieldsIds => Object.values(FormFieldsIds).some((v) => v === id);
const isFormFieldError = (v: [FormFieldsIds | string, string | undefined]): v is [FormFieldsIds, string | undefined] =>
  isFormFieldId(v[0]);

const getValues = (data: Data): ValidationValues => {
  switch (data.type) {
    case 'klage': {
      const v: KlageValues = {
        [FormFieldsIds.FRITEKST]: data.caseData.fritekst,
        [FormFieldsIds.VEDTAK_DATE]: data.caseData.vedtakDate,
      };

      return v;
    }
    case 'anke': {
      const v: AnkeValues = {
        [FormFieldsIds.FRITEKST]: data.caseData.fritekst,
        [FormFieldsIds.VEDTAK_DATE_REQUIRED]: data.caseData.vedtakDate,
        [FormFieldsIds.KLAGEENHET]: data.caseData.enhetsnummer,
      };

      return v;
    }
    case 'session-klage': {
      const v: SessionKlageValues = {
        [FormFieldsIds.FNR_DNR]: data.caseData.foedselsnummer,
        [FormFieldsIds.FORNAVN]: data.caseData.navn.fornavn ?? null,
        [FormFieldsIds.ETTERNAVN]: data.caseData.navn.etternavn ?? null,
        [FormFieldsIds.FRITEKST]: data.caseData.fritekst,
        [FormFieldsIds.VEDTAK_DATE]: data.caseData.vedtakDate,
      };

      return v;
    }
    case 'session-anke': {
      const v: SessionAnkeValues = {
        [FormFieldsIds.FNR_DNR]: data.caseData.foedselsnummer,
        [FormFieldsIds.FORNAVN]: data.caseData.navn.fornavn ?? null,
        [FormFieldsIds.ETTERNAVN]: data.caseData.navn.etternavn ?? null,
        [FormFieldsIds.FRITEKST]: data.caseData.fritekst,
        [FormFieldsIds.VEDTAK_DATE_REQUIRED]: data.caseData.vedtakDate,
        [FormFieldsIds.KLAGEENHET]: data.caseData.enhetsnummer,
      };

      return v;
    }
  }
};
