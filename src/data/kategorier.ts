import { TemaKey } from '../types/tema';

export interface Kategori {
    temaKey: TemaKey;
    title: string;
    digital: boolean;
    path: string;
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
                temaKey: TemaKey.AAP,
                title: 'Arbeidsavklaringspenger (AAP)',
                digital: false,
                path: 'arbeidsavklaringspenger'
            },
            {
                temaKey: TemaKey.DAG,
                title: 'Dagpenger',
                digital: false,
                path: 'dagpenger'
            }
        ]
    },
    {
        title: 'Familie og barn',
        path: 'familie-og-barn',
        beskrivelse: 'Barnetrygd, foreldrepenger, pleie',
        kategorier: [
            {
                temaKey: TemaKey.FOR,
                title: 'Foreldrepenger, engangsstønad og svangerskapspenger',
                digital: true,
                path: 'foreldrepenger-engangsstonad-svagerskapspenger'
            }
        ]
    }
];
