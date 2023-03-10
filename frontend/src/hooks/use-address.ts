import { Innsendingsytelse } from '../innsendingsytelser/innsendingsytelser';

type AddressLines = [string, string, string];

const ADDRESSES: [AddressLines, AddressLines] = [
  ['NAV skanning', 'Postboks 1400', '0109 Oslo'],
  ['NAV Arbeid og ytelser Kristiania', 'Postboks 6683 St. Olavs plass', '0129 Oslo'],
];

export const useAddress = (innsendingsytelse: Innsendingsytelse | null): AddressLines => {
  switch (innsendingsytelse) {
    case 'LONNSGARANTI':
      return ADDRESSES[1];
    default:
      return ADDRESSES[0];
  }
};
