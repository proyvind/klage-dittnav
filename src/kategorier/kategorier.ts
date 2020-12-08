import { TemaKey } from '../tema/tema';

export const klageFormUrl = 'https://www.nav.no/soknader/nb/klage/person';

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
    kategoriMailKlageUrl: string;
    kategoriMailAnkeUrl?: string;
    externalUrl?: string;
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
                path: 'lonnskompensasjon',
                kategoriMailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/korona/lonskompensasjon-permitterte/NAV%2004-07.01/klage/brev'
            },
            {
                temaKey: TemaKey.GEN,
                title: 'Midlertidig kompensasjon for selvstendig næringsdrivende og frilansere',
                anke: false,
                digitalKlage: false,
                digitalAnke: false,
                path: 'midlertidig-kompensasjon',
                kategoriMailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/korona/kompensasjon/NAV%2000-03.00/klage/brev'
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
                path: 'arbeidsavklaringspenger',
                kategoriMailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/arbeid/arbeidsavklaringspenger/NAV%2011-13.05/klage/brev',
                kategoriMailAnkeUrl:
                    'https://www.nav.no/soknader/nb/person/arbeid/arbeidsavklaringspenger/NAV%2011-13.05/anke/brev'
            },
            {
                temaKey: TemaKey.DAG,
                title: 'Dagpenger',
                anke: true,
                digitalKlage: false,
                digitalAnke: false,
                path: 'dagpenger',
                kategoriMailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/arbeid/dagpenger/NAV%2004-01.03/klage/brev',
                kategoriMailAnkeUrl: 'https://www.nav.no/soknader/nb/person/arbeid/dagpenger/NAV%2004-01.03/anke/brev'
            },
            {
                temaKey: TemaKey.GEN,
                title: 'Lønnsgaranti ved konkurs hos arbeidsgiver',
                anke: false,
                digitalKlage: false,
                digitalAnke: false,
                path: 'lonnsgaranti',
                kategoriMailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/arbeid/lonnsgaranti-arbeidsgiver-betaler-ikke-ut-lonn/NAV%2067-01.01/klage/brev'
            },
            {
                temaKey: TemaKey.OPP,
                title: 'Vurdering av behov for bistand etter NAV loven § 14 a',
                anke: false,
                digitalKlage: false,
                digitalAnke: false,
                path: 'nav-loven-14a',
                kategoriMailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/arbeid/Bistand-fra-NAV-for-a-komme-i-arbeid/NAV%2000-01.00/klage/brev'
            },
            {
                temaKey: TemaKey.TIL,
                title: 'Tiltakspenger for arbeidsrettet tiltak',
                anke: false,
                digitalKlage: false,
                digitalAnke: false,
                path: 'tiltakspenger',
                kategoriMailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/arbeid/tiltakspenger/NAV%2076-13.45/klage/brev'
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
                path: 'grunn-og-hjelpestonad',
                kategoriMailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/helse/grunn-og-hjelpestonad/NAV%2006-03.04/klage/brev',
                kategoriMailAnkeUrl:
                    'https://www.nav.no/soknader/nb/person/helse/grunn-og-hjelpestonad/NAV%2006-03.04/anke/brev'
            },
            {
                temaKey: TemaKey.SYK,
                title: 'Sykepenger',
                anke: true,
                digitalKlage: false,
                digitalAnke: false,
                path: 'sykepenger',
                kategoriMailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/helse/sykepenger/NAV%2000-03.00/klage/brev',
                kategoriMailAnkeUrl: 'https://www.nav.no/soknader/nb/person/helse/sykepenger/NAV%2000-03.00/anke/brev'
            },
            {
                temaKey: TemaKey.UFO,
                title: 'Uføretrygd',
                anke: true,
                digitalKlage: false,
                digitalAnke: false,
                path: 'uforetrygd',
                kategoriMailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/helse/uforetrygd/NAV%2012-06.05/klage/brev',
                kategoriMailAnkeUrl: 'https://www.nav.no/soknader/nb/person/helse/uforetrygd/NAV%2012-06.05/anke/brev'
            },
            {
                temaKey: TemaKey.YRK,
                title: 'Yrkesskade og yrkesskadetrygd',
                anke: true,
                digitalKlage: false,
                digitalAnke: false,
                path: 'yrkesskadetrygd',
                kategoriMailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/helse/yrkesskade/NAV%2013-07.05/klage/brev',
                kategoriMailAnkeUrl: 'https://www.nav.no/soknader/nb/person/helse/yrkesskade/NAV%2013-07.05/anke/brev'
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
                path: 'foreldrepenger',
                kategoriMailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/familie/foreldrepenger-og-engangsstonad/NAV%2014-05.09/klage/brev',
                kategoriMailAnkeUrl:
                    'https://www.nav.no/soknader/nb/person/familie/foreldrepenger-og-engangsstonad/NAV%2014-05.09/anke/brev'
            },
            {
                temaKey: TemaKey.ENF,
                title: 'Enslig mor eller far',
                anke: true,
                digitalKlage: false,
                digitalAnke: false,
                path: 'enslig-mor-eller-far',
                kategoriMailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/familie/enslig-mor-eller-far/NAV%2015-00.01/klage/brev',
                kategoriMailAnkeUrl:
                    'https://www.nav.no/soknader/nb/person/familie/enslig-mor-eller-far/NAV%2015-00.01/anke/brev'
            },
            {
                temaKey: TemaKey.BID,
                title: 'Barnebidrag og bidragsforskudd',
                anke: false,
                digitalKlage: false,
                digitalAnke: false,
                path: 'barnebidrag-og-bidragsforskudd',
                kategoriMailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/familie/barnebidrag-og-bidragsforskudd/NAV%2055-00.60/klage/brev'
            },
            {
                temaKey: TemaKey.BAR,
                title: 'Barnetrygd',
                anke: true,
                digitalKlage: false,
                digitalAnke: false,
                path: 'barnetrygd',
                kategoriMailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/familie/barnetrygd/NAV%2033-00.07/klage/brev',
                kategoriMailAnkeUrl: 'https://www.nav.no/soknader/nb/person/familie/barnetrygd/NAV%2033-00.07/anke/brev'
            },
            {
                temaKey: TemaKey.KON,
                title: 'Kontantstøtte',
                anke: false,
                digitalKlage: false,
                digitalAnke: false,
                path: 'kontantstotte',
                kategoriMailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/familie/kontantstotte/NAV%2034-00.08/klage/brev'
            },
            {
                temaKey: TemaKey.BID,
                title: 'Ektefellebidrag',
                anke: true,
                digitalKlage: false,
                digitalAnke: false,
                path: 'ektefellebidrag',
                kategoriMailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/familie/ektefellebidrag/NAV%2053-00.05/klage/brev',
                kategoriMailAnkeUrl:
                    'https://www.nav.no/soknader/nb/person/familie/ektefellebidrag/NAV%2053-00.05/anke/brev'
            },
            {
                temaKey: TemaKey.BID,
                title: 'Oppfostringsbidrag',
                anke: true,
                digitalKlage: false,
                digitalAnke: false,
                path: 'oppfostringsbidrag',
                kategoriMailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/familie/oppfostringsbidrag/NAV%2057-00.08/klage/brev',
                kategoriMailAnkeUrl:
                    'https://www.nav.no/soknader/nb/person/familie/oppfostringsbidrag/NAV%2057-00.08/anke/brev'
            },
            {
                temaKey: TemaKey.OMS,
                title: 'Omsorgspenger, opplæringspenger, pleiepenger',
                anke: true,
                digitalKlage: false,
                digitalAnke: false,
                path: 'sykdom-i-familien',
                kategoriMailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/familie/omsorgspenger/NAV%2009-06.07/klage/brev',
                kategoriMailAnkeUrl:
                    'https://www.nav.no/soknader/nb/person/familie/omsorgspenger/NAV%2009-06.07/anke/brev'
            },
            {
                temaKey: TemaKey.GRA,
                title: 'Gravferdsstønad',
                anke: true,
                digitalKlage: false,
                digitalAnke: false,
                path: 'gravferdsstonad',
                kategoriMailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/stonader-ved-dodsfall/gravferdsstonad-og-baretransport/NAV%2007-02.08/klage/brev',
                kategoriMailAnkeUrl:
                    'https://www.nav.no/soknader/nb/person/stonader-ved-dodsfall/gravferdsstonad-og-baretransport/NAV%2007-02.08/anke/brev'
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
                path: 'tidligere-familiepleier',
                kategoriMailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/stonader-ved-dodsfall/familiepleier/NAV%2016-01.05/klage/brev',
                kategoriMailAnkeUrl:
                    'https://www.nav.no/soknader/nb/person/stonader-ved-dodsfall/familiepleier/NAV%2016-01.05/anke/brev'
            },
            {
                temaKey: TemaKey.PEN,
                title: 'Pensjon til gjenlevende ektefelle eller samboer',
                anke: true,
                digitalKlage: false,
                digitalAnke: false,
                path: 'gjenlevende',
                kategoriMailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/pensjon/gjenlevende-ektefelle-partner-eller-samboer/NAV%2017-01.05/klage/brev',
                kategoriMailAnkeUrl:
                    'https://www.nav.no/soknader/nb/person/pensjon/gjenlevende-ektefelle-partner-eller-samboer/NAV%2017-01.05/anke/brev'
            },
            {
                temaKey: TemaKey.PEN,
                title: 'Barnepensjon',
                anke: true,
                digitalKlage: false,
                digitalAnke: false,
                path: 'barnepensjon',
                kategoriMailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/pensjon/barn-som-har-mistet-en-eller-flere-av-foreldrene/NAV%2018-04.01/klage/brev',
                kategoriMailAnkeUrl:
                    'https://www.nav.no/soknader/nb/person/pensjon/barn-som-har-mistet-en-eller-flere-av-foreldrene/NAV%2018-04.01/anke/brev'
            },
            {
                temaKey: TemaKey.PEN,
                title: 'Alderspensjon',
                anke: true,
                digitalKlage: false,
                digitalAnke: false,
                path: 'alderspensjon',
                kategoriMailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/pensjon/alderspensjon-og-avtalefestet-pensjon/NAV%2019-01.05/klage/brev',
                kategoriMailAnkeUrl:
                    'https://www.nav.no/soknader/nb/person/pensjon/alderspensjon-og-avtalefestet-pensjon/NAV%2019-01.05/anke/brev'
            },
            {
                temaKey: TemaKey.PEN,
                title: 'Krigspensjon',
                anke: true,
                digitalKlage: false,
                digitalAnke: false,
                path: 'krigspensjon',
                kategoriMailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/pensjon/krigspensjon/NAV%2031-00.02/klage/brev',
                kategoriMailAnkeUrl:
                    'https://www.nav.no/soknader/nb/person/pensjon/krigspensjon/NAV%2031-00.02/anke/brev'
            },
            {
                temaKey: TemaKey.PEN,
                title: 'Avtalefestet pensjon (AFP)',
                anke: true,
                digitalKlage: false,
                digitalAnke: false,
                path: 'avtalefestet-pensjon',
                kategoriMailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/pensjon/avtalefestet-pensjon-fra-statens-pensjonskasse/NAV%2062-00.16/klage/brev',
                kategoriMailAnkeUrl:
                    'https://www.nav.no/soknader/nb/person/pensjon/avtalefestet-pensjon-fra-statens-pensjonskasse/NAV%2062-00.16/anke/brev'
            },
            {
                temaKey: TemaKey.SUP,
                title: 'Supplerende stønad til pensjon ved kort botid i Norge',
                anke: true,
                digitalKlage: false,
                digitalAnke: false,
                path: 'supplerende-stonad',
                kategoriMailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/pensjon/supplerende-stonad-til-personer-med-kort-botid-i-norge/NAV%2064-21.00/klage/brev',
                kategoriMailAnkeUrl:
                    'https://www.nav.no/soknader/nb/person/pensjon/supplerende-stonad-til-personer-med-kort-botid-i-norge/NAV%2064-21.00/anke/brev'
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
                path: 'medlemskap',
                kategoriMailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/til-eller-fra-norge/opphold-eller-arbeid-i-norge/NAV%2002-07.05/klage/brev',
                kategoriMailAnkeUrl:
                    'https://www.nav.no/soknader/nb/person/til-eller-fra-norge/opphold-eller-arbeid-i-norge/NAV%2002-07.05/anke/brev'
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
                path: 'hjelpemidler',
                kategoriMailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/hjelpemidler-og-tilrettelegging/diverse/NAV%2010-07.23/klage/brev',
                kategoriMailAnkeUrl:
                    'https://www.nav.no/soknader/nb/person/hjelpemidler-og-tilrettelegging/diverse/NAV%2010-07.23/anke/brev'
            },
            {
                temaKey: TemaKey.BIL,
                title: 'Stønad til bil og spesialutstyr til kjøretøy',
                anke: true,
                digitalKlage: false,
                digitalAnke: false,
                path: 'bil',
                kategoriMailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/hjelpemidler-og-tilrettelegging/bil/NAV%2010-07.40/klage/brev',
                kategoriMailAnkeUrl:
                    'https://www.nav.no/soknader/nb/person/hjelpemidler-og-tilrettelegging/bil/NAV%2010-07.40/anke/brev'
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
                kategoriMailKlageUrl: klageFormUrl,
                externalUrl: 'https://www.nav.no/sosialhjelp/artikkel/124875'
            }
        ]
    }
];
