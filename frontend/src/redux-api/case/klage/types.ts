import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { StringValue } from '@app/kategorier/kategorier';
import { Languages } from '@app/language/types';
import { Case } from '../types';

export enum Reason {
  AVSLAG_PAA_SOKNAD = 'AVSLAG_PAA_SOKNAD',
  UENIG_I_VEDTAK_OM_TILBAKEBETALING = 'UENIG_I_VEDTAK_OM_TILBAKEBETALING',
  FOR_LITE_UTBETALT = 'FOR_LITE_UTBETALT',
  UENIG_I_NOE_ANNET = 'UENIG_I_NOE_ANNET',
}

export interface ResumeKlage {
  readonly innsendingsytelse: Innsendingsytelse;
  readonly internalSaksnummer: string | null;
}

export interface NewKlage
  extends Pick<Case, 'fritekst' | 'vedtakDate' | 'hasVedlegg' | 'userSaksnummer' | 'internalSaksnummer' | 'language'> {
  readonly innsendingsytelse: Innsendingsytelse;
  readonly checkboxesSelected: Reason[];
}

export interface Klage extends ResumeKlage, Case {
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
