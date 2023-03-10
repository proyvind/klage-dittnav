import { ISessionAnke } from '../components/anke/uinnlogget/types';
import { useAppDispatch } from '../redux/configure-store';
import { updateSessionAnke } from '../redux/session/session';
import { SessionKey } from '../redux/session/types';
import { useSessionKey } from './use-session-key';

export const useSessionAnkeUpdate = () => {
  const dispatch = useAppDispatch();
  const { temaKey, titleKey } = useSessionKey();

  if (temaKey === null) {
    throw new Error('TemaKey is null');
  }

  const key: SessionKey = { temaKey, titleKey };

  return (update: Partial<ISessionAnke>) => dispatch(updateSessionAnke({ key, update }));
};
