import { TemaKey } from '../../../tema/tema';
import { CaseStatus } from '../types';

export enum AnkemulighetStatus {
  OPEN = 'OPEN',
}

export type AvailableAnkeStatus = CaseStatus | AnkemulighetStatus;

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
  readonly ankeStatus: AvailableAnkeStatus;
  readonly innsendtDate: string;
  readonly ankeInternalSaksnummer: string;
  readonly tema: TemaKey;
  readonly titleKey: string;
  readonly utfall: Utfall;
  readonly vedtakDate: string;
}
