import { ISessionCase } from '@app/components/case/uinnlogget/types';
import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { Languages } from '@app/language/types';
import { CASE_TYPE_PATH_SEGMENTS, CaseType } from '@app/redux-api/case/types';

export const getSessionCaseKey = (type: CaseType, ytelse: Innsendingsytelse): string =>
  `${CASE_TYPE_PATH_SEGMENTS[type]}-${ytelse}`;

export const createSessionCase = (
  type: CaseType,
  language: Languages,
  innsendingsytelse: Innsendingsytelse,
  internalSaksnummer: string | null,
): ISessionCase => ({
  id: crypto.randomUUID(),
  type,
  innsendingsytelse,
  foedselsnummer: '',
  navn: {
    fornavn: '',
    etternavn: '',
  },
  fritekst: '',
  internalSaksnummer,
  userSaksnummer: null,
  vedtakDate: null,
  checkboxesSelected: [],
  language,
  hasVedlegg: false,
  modifiedByUser: new Date().toISOString(),
  caseIsAtKA: null,
  enhetsnummer: null,
});
