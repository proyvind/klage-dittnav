import { ISessionAnke } from '../../../components/anke/uinnlogget/types';
import { SessionKey } from '../types';

export interface SessionAnkePayload {
  key: SessionKey;
  anke: ISessionAnke | null;
}

export interface SessionAnkeUpdate {
  key: SessionKey;
  update: Partial<ISessionAnke>;
}
