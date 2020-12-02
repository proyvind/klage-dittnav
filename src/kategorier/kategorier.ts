import { TemaKey } from '../tema/tema';

export interface InngangKategori {
    title: string;
    path: string;
    beskrivelse: string;
    kategorier: Kategori[];
}

export interface Kategori {
    temaKey: TemaKey;
    title: string;
    anke: boolean;
    digitalKlage: boolean;
    digitalAnke: boolean;
    path: string;
    redirectUrl?: string;
}

export const INNGANG_KATEGORIER: InngangKategori[] = [
    {
        title: 'Korona / Covid-19',
        path: 'korona',
        beskrivelse: 'Midlertidige ordninger',
        kategorier: [
            {
                temaKey: TemaKey.PER,
                title: 'Lønnskompensasjon for permitterte',
                anke: false,
                digitalKlage: false,
                digitalAnke: false,
                path: 'lonnskompensasjon'
            },
            {
                temaKey: TemaKey.GEN,
                title: 'Midlertidig kompensasjon for selvstendig næringsdrivende og frilansere',
                anke: false,
                digitalKlage: false,
                digitalAnke: false,
                path: 'midlertidig-kompensasjon'
            }
        ]
    },
    {
        title: 'Arbeid',
        path: 'arbeid',
        beskrivelse: 'Dagpenger, AAP, tiltakspenger',
        kategorier: [
            {
                temaKey: TemaKey.AAP,
                title: 'Arbeidsavklaringspenger (AAP)',
                anke: true,
                digitalKlage: false,
                digitalAnke: false,
                path: 'arbeidsavklaringspenger'
            },
            {
                temaKey: TemaKey.DAG,
                title: 'Dagpenger',
                anke: true,
                digitalKlage: false,
                digitalAnke: false,
                path: 'dagpenger'
            },
            {
                temaKey: TemaKey.GEN,
                title: 'Lønnsgaranti ved konkurs hos arbeidsgiver',
                anke: false,
                digitalKlage: false,
                digitalAnke: false,
                path: 'lonnsgaranti'
            },
            {
                temaKey: TemaKey.OPP,
                title: 'Vurdering av behov for bistand etter NAV loven § 14 a',
                anke: false,
                digitalKlage: false,
                digitalAnke: false,
                path: 'nav-loven-14a'
            },
            {
                temaKey: TemaKey.TIL,
                title: 'Tiltakspenger for arbeidsrettet tiltak',
                anke: false,
                digitalKlage: false,
                digitalAnke: false,
                path: 'tiltakspenger'
            }
        ]
    },
    {
        title: 'Helse',
        path: 'helse',
        beskrivelse: 'Sykepenger, uføre, yrkesskade',
        kategorier: [
            {
                temaKey: TemaKey.GRU,
                title: 'Grunnstønad og hjelpestønad',
                anke: true,
                digitalKlage: false,
                digitalAnke: false,
                path: 'grunn-og-hjelpestonad'
            },
            {
                temaKey: TemaKey.SYK,
                title: 'Sykepenger',
                anke: true,
                digitalKlage: false,
                digitalAnke: false,
                path: 'sykepenger'
            },
            {
                temaKey: TemaKey.UFO,
                title: 'Uføretrygd',
                anke: true,
                digitalKlage: false,
                digitalAnke: false,
                path: 'uforetrygd'
            },
            {
                temaKey: TemaKey.YRK,
                title: 'Yrkesskade og yrkesskadetrygd',
                anke: true,
                digitalKlage: false,
                digitalAnke: false,
                path: 'yrkesskadetrygd'
            }
        ]
    },
    {
        title: 'Familie og barn',
        path: 'familie-og-barn',
        beskrivelse: 'Foreldrepenger, omsorg og pleie',
        kategorier: [
            {
                temaKey: TemaKey.FOR,
                title: 'Foreldrepenger, engangsstønad og svangerskapspenger',
                anke: true,
                digitalKlage: true,
                digitalAnke: false,
                path: 'foreldrepenger'
            },
            {
                temaKey: TemaKey.ENS,
                title: 'Enslig mor eller far',
                anke: true,
                digitalKlage: false,
                digitalAnke: false,
                path: 'enslig-mor-eller-far'
            },
            {
                temaKey: TemaKey.BID,
                title: 'Barnebidrag og bidragsforskudd',
                anke: false,
                digitalKlage: false,
                digitalAnke: false,
                path: 'barnebidrag-og-bidragsforskudd'
            },
            {
                temaKey: TemaKey.BAR,
                title: 'Barnetrygd',
                anke: true,
                digitalKlage: false,
                digitalAnke: false,
                path: 'barnetrygd'
            },
            {
                temaKey: TemaKey.KON,
                title: 'Kontantstøtte',
                anke: false,
                digitalKlage: false,
                digitalAnke: false,
                path: 'kontantstotte'
            },
            {
                temaKey: TemaKey.BID,
                title: 'Ektefellebidrag',
                anke: true,
                digitalKlage: false,
                digitalAnke: false,
                path: 'ektefellebidrag'
            },
            {
                temaKey: TemaKey.BID,
                title: 'Oppfostringsbidrag',
                anke: true,
                digitalKlage: false,
                digitalAnke: false,
                path: 'oppfostringsbidrag'
            },
            {
                temaKey: TemaKey.OMS,
                title: 'Omsorgspenger, opplæringspenger, pleiepenger',
                anke: true,
                digitalKlage: false,
                digitalAnke: false,
                path: 'sykdom-i-familien'
            },
            {
                temaKey: TemaKey.GRA,
                title: 'Gravferdsstønad',
                anke: true,
                digitalKlage: false,
                digitalAnke: false,
                path: 'gravferdsstonad'
            }
        ]
    },
    {
        title: 'Pensjon',
        path: 'pensjon',
        beskrivelse: 'Alderspensjon og andre typer pensjon',
        kategorier: [
            {
                temaKey: TemaKey.PEN,
                title: 'Ytelser til tidligere familiepleier',
                anke: true,
                digitalKlage: false,
                digitalAnke: false,
                path: 'tidligere-familiepleier'
            },
            {
                temaKey: TemaKey.PEN,
                title: 'Pensjon til gjenlevende ektefelle eller samboer',
                anke: true,
                digitalKlage: false,
                digitalAnke: false,
                path: 'gjenlevende'
            },
            {
                temaKey: TemaKey.PEN,
                title: 'Barnepensjon',
                anke: true,
                digitalKlage: false,
                digitalAnke: false,
                path: 'barnepensjon'
            },
            {
                temaKey: TemaKey.PEN,
                title: 'Alderspensjon',
                anke: true,
                digitalKlage: false,
                digitalAnke: false,
                path: 'alderspensjon'
            },
            {
                temaKey: TemaKey.PEN,
                title: 'Krigspensjon',
                anke: true,
                digitalKlage: false,
                digitalAnke: false,
                path: 'krigspensjon'
            },
            {
                temaKey: TemaKey.PEN,
                title: 'Avtalefestet pensjon (AFP)',
                anke: true,
                digitalKlage: false,
                digitalAnke: false,
                path: 'avtalefestet-pensjon'
            },
            {
                temaKey: TemaKey.SUP,
                title: 'Supplerende stønad til pensjon ved kort botid i Norge',
                anke: true,
                digitalKlage: false,
                digitalAnke: false,
                path: 'supplerende-stonad'
            }
        ]
    },
    {
        title: 'Til eller fra Norge',
        path: 'til-eller-fra-norge',
        beskrivelse: 'Medlemskap i folketrygdloven',
        kategorier: [
            {
                temaKey: TemaKey.MED,
                title: 'Medlemskap i folketrygdloven',
                anke: true,
                digitalKlage: false,
                digitalAnke: false,
                path: 'medlemskap'
            }
        ]
    },
    {
        title: 'Hjelpemidler og tilrettelegging',
        path: 'hjelpemidler-og-tilrettelegging',
        beskrivelse: 'Hjelpemidler, tilrettelegging, bil',
        kategorier: [
            {
                temaKey: TemaKey.HJE,
                title: 'Hjelpemidler og tilrettelegging ved nedsatt funksjonsevne',
                anke: true,
                digitalKlage: false,
                digitalAnke: false,
                path: 'hjelpemidler'
            },
            {
                temaKey: TemaKey.BIL,
                title: 'Stønad til bil og spesialutstyr til kjøretøy',
                anke: true,
                digitalKlage: false,
                digitalAnke: false,
                path: 'bil'
            }
        ]
    },
    {
        title: 'Sosiale tjenester',
        path: 'sosiale-tjenester',
        beskrivelse: 'Økonomisk sosialhjelp',
        kategorier: [
            {
                temaKey: TemaKey.UKJ,
                title: 'Midlertidig økonomisk sosialhjelp',
                anke: false,
                digitalKlage: false,
                digitalAnke: false,
                path: 'sosiale-tjenester',
                redirectUrl: 'https://www.nav.no/sosialhjelp/artikkel/124875'
            }
        ]
    }
];
