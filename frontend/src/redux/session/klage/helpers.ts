import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { ISessionKlage } from '../../../components/klage/uinnlogget/types';
import { Languages } from '../../../language/types';
import { TemaKey } from '../../../tema/tema';
import { SessionKey } from '../types';

dayjs.extend(utc);

export const getSessionKlageKey = (key: SessionKey): string =>
  `klage-${key.temaKey.toString()}-${key.titleKey ?? 'none'}`;

export const createSessionKlage = (
  language: Languages,
  tema: TemaKey,
  titleKey: string | null = null,
  internalSaksnummer: string | null = null
): ISessionKlage => ({
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
  checkboxesSelected: [],
  language,
  hasVedlegg: false,
  modifiedByUser: dayjs().utc(true).toISOString(),
});
