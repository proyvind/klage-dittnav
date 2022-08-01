export interface IIdentifikator {
  type: string;
  identifikasjonsnummer: string;
}

export interface IName {
  fornavn?: string;
  mellomnavn?: string;
  etternavn?: string;
}

export interface IAddress {
  adressenavn?: string;
  postnummer?: string;
  poststed?: string;
  husnummer?: string;
  husbokstav?: string;
}

export interface IContactInfo {
  telefonnummer?: string;
  epost?: string;
}

export interface IUser {
  navn: IName;
  adresse?: IAddress;
  kontaktinformasjon?: IContactInfo;
  folkeregisteridentifikator?: IIdentifikator;
  tokenExpires: number; // Expiration timestamp in milliseconds since 01-01-1970.
}

export interface IAuthResponse {
  authenticated: boolean;
}
