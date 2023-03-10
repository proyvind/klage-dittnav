import { ISODate } from '../../../domain/date/date';
import { Innsendingsytelse } from '../../../innsendingsytelser/innsendingsytelser';
import { Languages } from '../../../language/types';
import { Reason } from '../../../redux-api/case/klage/types';
import { IName } from '../../../redux-api/user/types';

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
