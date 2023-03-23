import { ISessionKlage } from '@app/components/klage/uinnlogget/types';
import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { useAppDispatch } from '@app/redux/configure-store';
import { updateSessionKlage } from '@app/redux/session/session';

export const useSessionKlageUpdate = (key: Innsendingsytelse) => {
  const dispatch = useAppDispatch();

  return (update: Partial<ISessionKlage>) => dispatch(updateSessionKlage({ key, update }));
};
