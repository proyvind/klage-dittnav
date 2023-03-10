import { ISessionAnke } from '../../components/anke/uinnlogget/types';
import { ISessionKlage } from '../../components/klage/uinnlogget/types';
import { TemaKey } from '../../tema/tema';

export interface State {
  klager: Record<string, ISessionKlage | null>;
  anker: Record<string, ISessionAnke | null>;
}

export interface SessionKey {
  temaKey: TemaKey;
  titleKey: string | null;
}
