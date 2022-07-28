import { ISessionAnke } from '../../../components/anke/uinnlogget/types';
import { TemaKey } from '../../../tema/tema';

export type SessionAnkeKey =
  | string
  | {
      temaKey: TemaKey;
      titleKey?: string | null;
    };

export interface SessionAnkePayload {
  key: SessionAnkeKey;
  anke: ISessionAnke | null;
}

export interface SessionAnkeUpdate {
  key: SessionAnkeKey;
  update: Partial<ISessionAnke>;
}
