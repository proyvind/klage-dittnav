import { useParams } from 'react-router-dom';
import { SessionKey } from '../redux/session/types';
import { ensureStringIsTema } from '../tema/tema';

export const useSessionKey = (): Nullable<SessionKey> => {
  const { temaKey: tema, titleKey = null } = useParams();

  const temaKey = ensureStringIsTema(tema ?? null);

  return { temaKey, titleKey };
};

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};
