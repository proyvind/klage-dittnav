import { ISODate } from '../../../date/date';
import { Languages } from '../../../language/types';
import { TemaKey } from '../../../tema/tema';
import { Attachment, Case } from '../types';

export interface AnkeAttachment extends Attachment {
  readonly ankeInternalSaksnummer: string;
}

export interface NewAnke {
  readonly ankeInternalSaksnummer: string;
  readonly language: Languages;
}

export type Updatable = Pick<Anke, 'fritekst'>;
export type UpdatableKeys = keyof Updatable;
export const UPDATABLE_KEYS: UpdatableKeys[] = ['fritekst'];

export interface Anke extends Case {
  readonly ankeInternalSaksnummer: string;
  readonly vedtakDate: ISODate;
  readonly vedlegg: AnkeAttachment[];
  readonly fritekst: string;
  readonly tema: TemaKey;
}
