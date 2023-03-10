import { Innsendingsytelse } from '../../innsendingsytelser/innsendingsytelser';
import { Languages } from '../../language/types';

export interface IEttersendelse {
  innsendingsytelse: Innsendingsytelse;
  foedselsnummer: string;
  enhetsnummer: string | null;
  language: Languages;
}
