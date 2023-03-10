import { ISODate } from '../../../domain/date/date';
import { Languages } from '../../../language/types';
import { Reason } from '../../../redux-api/case/klage/types';
import { IName } from '../../../redux-api/user/types';
import { TemaKey } from '../../../tema/tema';

export interface ISessionKlage {
  readonly foedselsnummer: string;
  readonly navn: IName;
  readonly fritekst: string;
  readonly userSaksnummer: string | null;
  readonly internalSaksnummer: string | null;
  readonly vedtakDate: ISODate | null;
  readonly titleKey: string | null;
  readonly tema: TemaKey;
  readonly checkboxesSelected: Reason[];
  readonly language: Languages;
  readonly hasVedlegg: boolean;
  readonly modifiedByUser: ISODate;
}
