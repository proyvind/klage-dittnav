export interface Bruker {
    navn: Navn;
    adresse?: Adresse;
    kontaktinformasjon?: Kontaktinformasjon;
    folkeregisteridentifikator?: Identifikator;
    tokenExpires?: number;
}

export interface Identifikator {
    type: string;
    identifikasjonsnummer: string;
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

export function displayAddress(adresse: Adresse): string {
    let display = '';
    if (adresse) {
        display += adresse.adressenavn ?? '';
        display += adresse.husnummer ? ' ' + adresse.husnummer : '';
        display += adresse.husbokstav ?? '';
    }
    return display;
}
export function displayPoststed(adresse: Adresse): string {
    let display = '';
    if (adresse) {
        display += adresse.postnummer ?? '';
        display += adresse.postnummer && adresse.poststed ? ' ' : '';
        display += adresse.poststed ?? '';
    }
    return display;
}
