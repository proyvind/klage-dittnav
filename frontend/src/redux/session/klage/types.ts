import { ISessionKlage } from '@app/components/klage/uinnlogget/types';
import { SessionKey } from '../types';

export interface SessionKlagePayload {
  key: SessionKey;
  klage: ISessionKlage;
}

export interface SessionKlageUpdate {
  key: SessionKey;
  update: Partial<ISessionKlage>;
}
