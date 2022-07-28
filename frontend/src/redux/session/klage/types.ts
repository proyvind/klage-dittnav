import { ISessionKlage } from '../../../components/klage/uinnlogget/types';
import { TemaKey } from '../../../tema/tema';

export interface SessionKlageKey {
  temaKey: TemaKey;
  titleKey: string | null;
}

export interface SessionKlagePayload {
  key: SessionKlageKey;
  klage: ISessionKlage | null;
}

export interface SessionKlageUpdate {
  temaKey: TemaKey | null;
  titleKey: string | null;
  update: Partial<ISessionKlage>;
}
