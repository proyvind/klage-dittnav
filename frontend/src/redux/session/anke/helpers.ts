import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { ISessionAnke } from '../../../components/anke/uinnlogget/types';
import { Languages } from '../../../language/types';
import { TemaKey } from '../../../tema/tema';
import { SessionKey } from '../types';

dayjs.extend(utc);

export const getSessionAnkeKey = (key: SessionKey): string =>
  `anke-${key.temaKey.toString()}-${key.titleKey ?? 'none'}`;

export const createSessionAnke = (
  language: Languages,
  tema: TemaKey,
  titleKey: string | null = null,
  internalSaksnummer: string | null = null
): ISessionAnke => ({
  tema,
  titleKey,
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
