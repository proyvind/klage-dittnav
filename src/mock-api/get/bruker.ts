import { Bruker } from '../../types/bruker';

export const okPerson: Bruker = {
    id: '123456789',
    foedselsnummer: '32432',
    navn: {
        fornavn: 'Ola',
        etternavn: 'Nordmann'
    },
    adresse: {
        adressenavn: 'Storgata',
        postnummer: '0001',
        poststed: 'Oslo',
        husnummer: '1'
    },
    kontaktinformasjon: {
        epost: 'ola@norge.no',
        telefonnummer: '+4710101010'
    }
};
