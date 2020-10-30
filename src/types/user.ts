export interface User {
    navn: Name;
    adresse?: Address;
    kontaktinformasjon?: ContactInfo;
    folkeregisteridentifikator?: Identifikator;
    tokenExpires?: number;
}

export interface Identifikator {
    type: string;
    identifikasjonsnummer: string;
}

export interface Name {
    fornavn?: string;
    mellomnavn?: string;
    etternavn?: string;
}

export interface Address {
    adressenavn?: string;
    postnummer?: string;
    poststed?: string;
    husnummer?: string;
    husbokstav?: string;
}

export interface ContactInfo {
    telefonnummer?: string;
    epost?: string;
}

export function displayAddress(adresse: Address): string {
    let display = '';
    if (adresse) {
        display += adresse.adressenavn ?? '';
        display += adresse.husnummer ? ' ' + adresse.husnummer : '';
        display += adresse.husbokstav ?? '';
    }
    return display;
}
export function displayPoststed(adresse: Address): string {
    let display = '';
    if (adresse) {
        display += adresse.postnummer ?? '';
        display += adresse.postnummer && adresse.poststed ? ' ' : '';
        display += adresse.poststed ?? '';
    }
    return display;
}
