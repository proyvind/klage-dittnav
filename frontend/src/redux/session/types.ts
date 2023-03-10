import { ISessionAnke } from '../../components/anke/uinnlogget/types';
import { ISessionKlage } from '../../components/klage/uinnlogget/types';
import { Innsendingsytelse } from '../../innsendingsytelser/innsendingsytelser';

export interface State {
  klager: Record<string, ISessionKlage>;
  anker: Record<string, ISessionAnke>;
}

export type SessionKey = Innsendingsytelse;
