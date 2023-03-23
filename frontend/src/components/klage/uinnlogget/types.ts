import { ISODate } from '@app/domain/date/date';
import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { Languages } from '@app/language/types';
import { Reason } from '@app/redux-api/case/klage/types';
import { IName } from '@app/redux-api/user/types';

export interface ISessionKlage {
  readonly foedselsnummer: string;
  readonly navn: IName;
  readonly fritekst: string;
  readonly userSaksnummer: string | null;
  readonly internalSaksnummer: string | null;
  readonly vedtakDate: ISODate | null;
  readonly innsendingsytelse: Innsendingsytelse;
  readonly checkboxesSelected: Reason[];
  readonly language: Languages;
  readonly hasVedlegg: boolean;
  readonly modifiedByUser: ISODate;
}
