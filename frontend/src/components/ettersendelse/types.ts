import { Languages } from '../../language/types';
import { TemaKey } from '../../tema/tema';

export interface IEttersendelse {
  tema: TemaKey;
  titleKey: string;
  foedselsnummer: string;
  enhetsnummer: string | null;
  language: Languages;
}
