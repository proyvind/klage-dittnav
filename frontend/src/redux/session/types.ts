import { ISessionAnke } from '@app/components/anke/uinnlogget/types';
import { ISessionKlage } from '@app/components/klage/uinnlogget/types';
import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';

export interface State {
  klager: Record<string, ISessionKlage>;
  anker: Record<string, ISessionAnke>;
}

export type SessionKey = Innsendingsytelse;
