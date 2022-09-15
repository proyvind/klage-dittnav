import { Languages } from '../../language/types';
import { TemaKey } from '../../tema/tema';

export interface IEttersendelse {
  tema: TemaKey;
  foedselsnummer: string;
  enhetsnummer?: string;
  language: Languages;
}
