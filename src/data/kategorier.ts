import { TemaKey } from '../types/tema';

export interface Kategori {
    tema: TemaKey;
    title: string;
    digital: boolean;
}

export interface InngangKategori {
    title: string;
    path: string;
    beskrivelse: string;
    kategorier: Kategori[];
}

export const INNGANG_KATEGORIER: InngangKategori[] = [
    {
        title: 'Arbeid',
        path: 'arbeid',
        beskrivelse: 'Dagpenger, AAP, egen bedrift',
        kategorier: [
            {
                tema: TemaKey.AAP,
                title: 'Arbeidsavklaringspenger (AAP)',
                digital: false
            },
            {
                tema: TemaKey.DAG,
                title: 'Dagpenger',
                digital: false
            }
        ]
    },
    {
        title: 'Familie og barn',
        path: 'familie-og-barn',
        beskrivelse: 'Barnetrygd, foreldrepenger, pleie',
        kategorier: [
            {
                tema: TemaKey.FOR,
                title: 'Foreldrepenger, engangsstønad og svangerskapspenger',
                digital: true
            }
        ]
    }
];
