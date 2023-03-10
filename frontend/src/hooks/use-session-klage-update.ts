import { ISessionKlage } from '../components/klage/uinnlogget/types';
import { Innsendingsytelse } from '../innsendingsytelser/innsendingsytelser';
import { useAppDispatch } from '../redux/configure-store';
import { updateSessionKlage } from '../redux/session/session';

export const useSessionKlageUpdate = (key: Innsendingsytelse) => {
  const dispatch = useAppDispatch();

  return (update: Partial<ISessionKlage>) => dispatch(updateSessionKlage({ key, update }));
};
