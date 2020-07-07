import { Klage } from '../../types/klage';
import { formatDate } from '../../utils/date-util';

export const KLAGER = [
    {
        userFirstName: 'Marianne',
        userLastName: 'Hval',
        userAddress: 'Address 1',
        userFodselsnummer: '88888822222',
        userPhone: '99999999',
        NAVEnhetNavn: 'TestEnhet',
        vedteksdato: '2019-09-19',
        NAVReference: 'ReferenceTest',
        shortWhyShouldChange: 'Blabbla',
        longWhyShouldChange: 'Lengre blablablabla',
        attachments: '',
        place: 'PlaceTest',
        date: '2020-02-19',
        userSignature: '',
        NAVSignature: ''
    }
];

export const okKlage: Klage = {
    id: 1,
    tema: 'FOR',
    fritekst: '',
    vedtaksdato: formatDate(new Date())
};
