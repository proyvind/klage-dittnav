import { ISODate } from '@app/domain/date/date';
import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { Languages } from '@app/language/types';
import { IName } from '@app/redux-api/user/types';

export interface ISessionAnke {
  readonly foedselsnummer: string;
  readonly navn: IName;
  readonly fritekst: string;
  readonly internalSaksnummer: string | null;
  readonly userSaksnummer: string | null;
  readonly vedtakDate: ISODate | null;
  readonly enhetsnummer: string | null;
  readonly innsendingsytelse: Innsendingsytelse;
  readonly language: Languages;
  readonly hasVedlegg: boolean;
  readonly modifiedByUser: ISODate;
}
