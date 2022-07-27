import { ISODate } from '../../../date/date';
import { StringValue } from '../../../kategorier/kategorier';
import { Languages } from '../../../language/types';
import { TemaKey } from '../../../tema/tema';
import { Attachment, Case } from '../types';

export interface KlageAttachment extends Attachment {
  readonly klageId: number;
}

export enum Reason {
  AVSLAG_PAA_SOKNAD = 'AVSLAG_PAA_SOKNAD',
  UENIG_I_VEDTAK_OM_TILBAKEBETALING = 'UENIG_I_VEDTAK_OM_TILBAKEBETALING',
  FOR_LITE_UTBETALT = 'FOR_LITE_UTBETALT',
  UENIG_I_NOE_ANNET = 'UENIG_I_NOE_ANNET',
}

export interface NewKlage {
  readonly tema: TemaKey;
  readonly internalSaksnummer: string | null;
  readonly titleKey?: string;
  readonly ytelse?: string;
  readonly fullmaktsgiver: string | null;
}

export type Updatable = Pick<Klage, 'fritekst' | 'vedtakDate' | 'checkboxesSelected' | 'userSaksnummer'>;
export type UpdatableKeys = keyof Updatable;
export const UPDATABLE_KEYS: UpdatableKeys[] = ['fritekst', 'vedtakDate', 'checkboxesSelected', 'userSaksnummer'];

export interface Klage extends NewKlage, Case {
  readonly id: string;
  readonly vedlegg: KlageAttachment[];
  readonly title: StringValue;
  readonly language: Languages;
  readonly fritekst: string;
  readonly checkboxesSelected: Reason[];
  readonly userSaksnummer: string | null;
  readonly vedtakDate: ISODate | null;
}
