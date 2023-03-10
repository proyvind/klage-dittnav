import { ISessionKlage } from '../../../components/klage/uinnlogget/types';
import { SessionKey } from '../types';

export interface SessionKlagePayload {
  key: SessionKey;
  klage: ISessionKlage | null;
}

export interface SessionKlageUpdate {
  key: SessionKey;
  update: Partial<ISessionKlage>;
}
