import { ISessionAnke } from '../../components/anke/uinnlogget/types';
import { ISessionKlage } from '../../components/klage/uinnlogget/types';

export interface State {
  klager: Record<string, ISessionKlage | null>;
  anker: Record<string, ISessionAnke | null>;
}
