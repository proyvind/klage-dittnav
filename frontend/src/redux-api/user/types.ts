interface IIdentifikator {
  type: string;
  identifikasjonsnummer: string;
}

export interface IName {
  fornavn?: string;
  etternavn?: string;
}

export interface IUser {
  navn: IName;
  folkeregisteridentifikator?: IIdentifikator;
  tokenExpires: number; // Expiration timestamp in milliseconds since 01-01-1970.
}

export interface IAuthResponse {
  tokenx: boolean;
  selvbetjening: boolean;
}
