import { ISODate } from '../../../domain/date/date';
import { Innsendingsytelse } from '../../../innsendingsytelser/innsendingsytelser';
import { Languages } from '../../../language/types';
import { IName } from '../../../redux-api/user/types';

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
