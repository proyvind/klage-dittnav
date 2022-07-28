import { useSearchParams } from 'react-router-dom';
import { ISessionAnke } from '../components/anke/uinnlogget/types';
import { useAppDispatch } from '../redux/configure-store';
import { SessionAnkeKey } from '../redux/session/anke/types';
import { updateSessionAnke } from '../redux/session/session';
import { useSessionTemaTitle } from './use-session-tema-title';

export const useSessionAnkeUpdate = () => {
  const dispatch = useAppDispatch();
  const { temaKey, titleKey } = useSessionTemaTitle();
  const [query] = useSearchParams();

  const saksnummer = query.get('saksnummer');

  if (temaKey === null) {
    throw new Error('TemaKey is null');
  }

  const key: SessionAnkeKey = saksnummer === null ? { temaKey, titleKey } : saksnummer;

  return (update: Partial<ISessionAnke>) => dispatch(updateSessionAnke({ key, update }));
};
