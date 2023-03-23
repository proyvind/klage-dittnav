import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { Languages } from '@app/language/types';

export interface IEttersendelse {
  innsendingsytelse: Innsendingsytelse;
  foedselsnummer: string;
  enhetsnummer: string | null;
  language: Languages;
}
