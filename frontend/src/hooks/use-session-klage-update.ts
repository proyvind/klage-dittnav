import { ISessionKlage } from '../components/klage/uinnlogget/types';
import { useAppDispatch } from '../redux/configure-store';
import { updateSessionKlage } from '../redux/session/session';
import { SessionKey } from '../redux/session/types';
import { useSessionKey } from './use-session-key';

export const useSessionKlageUpdate = () => {
  const dispatch = useAppDispatch();
  const { temaKey, titleKey } = useSessionKey();

  if (temaKey === null) {
    throw new Error('TemaKey is null');
  }

  const key: SessionKey = { temaKey, titleKey };

  return (update: Partial<ISessionKlage>) => dispatch(updateSessionKlage({ key, update }));
};
