import dayjs, { extend } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { ISessionAnke } from '../../../components/anke/uinnlogget/types';
import { Innsendingsytelse } from '../../../innsendingsytelser/innsendingsytelser';
import { Languages } from '../../../language/types';
import { SessionKey } from '../types';

extend(utc);

export const getSessionAnkeKey = (key: SessionKey): string => `anke-${key}`;

export const createSessionAnke = (
  language: Languages,
  innsendingsytelse: Innsendingsytelse,
  internalSaksnummer: string | null = null
): ISessionAnke => ({
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
  enhetsnummer: null,
  language,
  hasVedlegg: false,
  modifiedByUser: dayjs().utc(true).toISOString(),
});
