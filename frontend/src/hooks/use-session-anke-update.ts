import { ISessionAnke } from '../components/anke/uinnlogget/types';
import { Innsendingsytelse } from '../innsendingsytelser/innsendingsytelser';
import { useAppDispatch } from '../redux/configure-store';
import { updateSessionAnke } from '../redux/session/session';

export const useSessionAnkeUpdate = (key: Innsendingsytelse) => {
  const dispatch = useAppDispatch();

  return (update: Partial<ISessionAnke>) => dispatch(updateSessionAnke({ key, update }));
};
