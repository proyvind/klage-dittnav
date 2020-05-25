export interface Bruker {
    id?: string;
    navn: Navn;
    adresse: Adresse;
    kontaktinformasjon?: Kontaktinformasjon;
}

export interface Navn {
    fornavn?: string;
    mellomnavn?: string;
    etternavn?: string;
}

export interface Adresse {
    adressenavn?: string;
    postnummer?: string;
    poststed?: string;
    husnummer?: string;
    husbokstav?: string;
}

export interface Kontaktinformasjon {
    telefonnummer?: string;
    epost?: string;
}
