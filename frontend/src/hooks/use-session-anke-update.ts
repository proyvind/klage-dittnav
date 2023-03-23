import { ISessionAnke } from '@app/components/anke/uinnlogget/types';
import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { useAppDispatch } from '@app/redux/configure-store';
import { updateSessionAnke } from '@app/redux/session/session';

export const useSessionAnkeUpdate = (key: Innsendingsytelse) => {
  const dispatch = useAppDispatch();

  return (update: Partial<ISessionAnke>) => dispatch(updateSessionAnke({ key, update }));
};
