import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { ISessionKlage } from '../../../components/klage/uinnlogget/types';
import { Languages } from '../../../language/types';
import { TemaKey } from '../../../tema/tema';

dayjs.extend(utc);

export const getSessionKlageKey = (temaKey: TemaKey, titleKey: string | null = null) =>
  `klage-${temaKey.toString()}-${titleKey ?? 'none'}`;

export const createSessionKlage = (
  language: Languages,
  tema: TemaKey,
  titleKey: string | null = null,
  userSaksnummer: string | null = null
): ISessionKlage => ({
  tema,
  titleKey,
  foedselsnummer: '',
  navn: {
    fornavn: '',
    etternavn: '',
  },
  fritekst: '',
  userSaksnummer,
  vedtakDate: null,
  checkboxesSelected: [],
  language,
  hasVedlegg: false,
  modifiedByUser: dayjs().utc(true).toISOString(),
});
