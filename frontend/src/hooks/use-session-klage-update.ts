import { ISessionKlage } from '../components/klage/uinnlogget/types';
import { useAppDispatch } from '../redux/configure-store';
import { updateSessionKlage } from '../redux/session/session';
import { useSessionTemaTitle } from './use-session-tema-title';

export const useSessionKlageUpdate = () => {
  const dispatch = useAppDispatch();
  const { temaKey, titleKey } = useSessionTemaTitle();

  return (update: Partial<ISessionKlage>) => dispatch(updateSessionKlage({ temaKey, titleKey, update }));
};
