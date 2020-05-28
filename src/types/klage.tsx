import { Bruker } from './bruker';

export interface Klage {
    id: number;
    person: Bruker;
    NAVEnhetNavn: string;
    vedteksdato: string;
    NAVReference: string;
    shortWhyShouldChange: string;
    longWhyShouldChange: string;
    attachments: string;
    place: string;
    date: string;
    userSignature: string;
    NAVSignature: string;
}
