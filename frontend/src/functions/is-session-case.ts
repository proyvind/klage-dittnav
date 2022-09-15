import { ISessionAnke } from '../components/anke/uinnlogget/types';
import { IEttersendelse } from '../components/ettersendelse/types';
import { ISessionKlage } from '../components/klage/uinnlogget/types';
import { Anke } from '../redux-api/case/anke/types';
import { Klage } from '../redux-api/case/klage/types';

export const isSessionCase = (
  klage: ISessionKlage | ISessionAnke | Klage | Anke | IEttersendelse
): klage is ISessionKlage | ISessionAnke => typeof klage['navn'] !== 'undefined';
