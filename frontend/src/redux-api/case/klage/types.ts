import { StringValue } from '../../../kategorier/kategorier';
import { Languages } from '../../../language/types';
import { TemaKey } from '../../../tema/tema';
import { Case } from '../types';

export enum Reason {
  AVSLAG_PAA_SOKNAD = 'AVSLAG_PAA_SOKNAD',
  UENIG_I_VEDTAK_OM_TILBAKEBETALING = 'UENIG_I_VEDTAK_OM_TILBAKEBETALING',
  FOR_LITE_UTBETALT = 'FOR_LITE_UTBETALT',
  UENIG_I_NOE_ANNET = 'UENIG_I_NOE_ANNET',
}

export interface NewKlage {
  readonly tema: TemaKey;
  readonly titleKey: string | null;
  readonly internalSaksnummer: string | null;
  readonly fullmaktsgiver: string | null;
}

export interface Klage extends NewKlage, Case {
  readonly title: StringValue;
  readonly language: Languages;
  readonly checkboxesSelected: Reason[];
}

type Updatable = Pick<Klage, 'fritekst' | 'vedtakDate' | 'checkboxesSelected' | 'userSaksnummer' | 'hasVedlegg'>;

interface IKlageUpdate<T extends keyof Updatable> {
  readonly id: Klage['id'];
  readonly key: T;
  readonly value: Updatable[T];
}

export type KlageUpdate = IKlageUpdate<keyof Updatable>;
