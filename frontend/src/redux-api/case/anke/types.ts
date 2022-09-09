import { TemaKey } from '../../../tema/tema';
import { Case, CaseStatus } from '../types';

export interface NewAnke {
  readonly tema: TemaKey;
  readonly titleKey: string | null;
}

export interface Anke extends Case, NewAnke {
  enhetsnummer: string | null;
}

type Updatable = Pick<Anke, 'fritekst' | 'vedtakDate' | 'userSaksnummer' | 'hasVedlegg' | 'enhetsnummer'>;

interface IAnkeUpdate<T extends keyof Updatable> {
  readonly id: Anke['id'];
  readonly key: T;
  readonly value: Updatable[T];
}

export type AnkeUpdate = IAnkeUpdate<keyof Updatable>;

enum AnkemulighetStatus {
  OPEN = 'OPEN',
}

type AvailableAnkeStatus = CaseStatus | AnkemulighetStatus;

export enum Utfall {
  TRUKKET = 'TRUKKET',
  RETUR = 'RETUR',
  OPPHEVET = 'OPPHEVET',
  MEDHOLD = 'MEDHOLD',
  DELVIS_MEDHOLD = 'DELVIS_MEDHOLD',
  OPPRETTHOLDT = 'OPPRETTHOLDT',
  UGUNST = 'UGUNST',
  AVVIST = 'AVVIST',
}

export interface AvailableAnke {
  readonly id: string;
  readonly ankeStatus: AvailableAnkeStatus;
  readonly innsendtDate: string;
  readonly tema: TemaKey;
  readonly titleKey: string;
  readonly utfall: Utfall;
  readonly vedtakDate: string;
}
