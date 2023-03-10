import { ISODate } from '../../../domain/date/date';
import { Languages } from '../../../language/types';
import { IName } from '../../../redux-api/user/types';
import { TemaKey } from '../../../tema/tema';

export interface ISessionAnke {
  readonly foedselsnummer: string;
  readonly navn: IName;
  readonly fritekst: string;
  readonly internalSaksnummer: string | null;
  readonly userSaksnummer: string | null;
  readonly vedtakDate: ISODate | null;
  readonly enhetsnummer: string | null;
  readonly titleKey: string | null;
  readonly tema: TemaKey;
  readonly language: Languages;
  readonly hasVedlegg: boolean;
  readonly modifiedByUser: ISODate;
}
