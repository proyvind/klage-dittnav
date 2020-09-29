import { TemaKey } from '../types/tema';

export interface KategoriTema {
    tema: TemaKey;
    tittel: string;
    skjemaveileder: boolean;
    digital: boolean;
    bareAnke: boolean;
}

interface KlageAnkeTema {
    tittel: string;
    path: string;
    beskrivelse: string;
    underkategorier: KategoriTema[];
}

export const KLAGE_ELLER_ANKE_TEMAER: KlageAnkeTema[] = [
    {
        tittel: 'Arbeid',
        path: 'arbeid',
        beskrivelse: 'Dagpenger, AAP, egen bedrift',
        underkategorier: [
            {
                tema: 'AAP',
                tittel: 'Arbeidsavklaringspenger (AAP)',
                skjemaveileder: false,
                digital: false,
                bareAnke: false
            },
            {
                tema: 'DAG',
                tittel: 'Dagpenger',
                skjemaveileder: false,
                digital: false,
                bareAnke: false
            }
        ]
    },
    {
        tittel: 'Familie og barn',
        path: 'familie-og-barn',
        beskrivelse: 'Barnetrygd, foreldrepenger, pleie',
        underkategorier: [
            {
                tema: 'FOR',
                tittel: 'Foreldrepenger, engangsstønad og svangerskapspenger',
                skjemaveileder: false,
                digital: true,
                bareAnke: false
            }
        ]
    }
];

export const getKategori = (kategori: string) => KLAGE_ELLER_ANKE_TEMAER.find(({ path }) => path === kategori) ?? null;

export const hasDigitalForm = (kategori: KlageAnkeTema, tema: TemaKey) =>
    kategori.underkategorier.some(t => t.digital && t.tema === tema);
