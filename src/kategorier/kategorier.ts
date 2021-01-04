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
    allowsAnke: boolean;
    digitalKlage: boolean;
    path: string;
    mailKlageUrl: string;
    mailAnkeUrl?: string;
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
                allowsAnke: false,
                digitalKlage: false,
                path: 'lonnskompensasjon',
                mailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/korona/lonskompensasjon-permitterte/NAV%2004-07.01/klage/brev'
            },
            {
                temaKey: TemaKey.GEN,
                title: 'Midlertidig kompensasjon for selvstendig næringsdrivende og frilansere',
                allowsAnke: false,
                digitalKlage: false,
                path: 'midlertidig-kompensasjon',
                mailKlageUrl: 'https://www.nav.no/soknader/nb/person/korona/kompensasjon/NAV%2000-03.00/klage/brev'
            }
        ]
    },
    {
        title: 'Arbeid',
        path: 'arbeid',
        beskrivelse: 'Dagpenger, AAP, tiltakspenger',
        kategorier: [
            {
                temaKey: TemaKey.DAG,
                title: 'Dagpenger',
                allowsAnke: true,
                digitalKlage: false,
                path: 'dagpenger',
                mailKlageUrl: 'https://www.nav.no/soknader/nb/person/arbeid/dagpenger/NAV%2004-01.03/klage/brev',
                mailAnkeUrl: 'https://www.nav.no/soknader/nb/person/arbeid/dagpenger/NAV%2004-01.03/anke/brev'
            },
            {
                temaKey: TemaKey.AAP,
                title: 'Arbeidsavklaringspenger (AAP)',
                allowsAnke: true,
                digitalKlage: false,
                path: 'arbeidsavklaringspenger',
                mailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/arbeid/arbeidsavklaringspenger/NAV%2011-13.05/klage/brev',
                mailAnkeUrl:
                    'https://www.nav.no/soknader/nb/person/arbeid/arbeidsavklaringspenger/NAV%2011-13.05/anke/brev'
            },
            {
                temaKey: TemaKey.GEN,
                title: 'Lønnsgaranti ved konkurs hos arbeidsgiver',
                allowsAnke: false,
                digitalKlage: false,
                path: 'lonnsgaranti',
                mailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/arbeid/lonnsgaranti-arbeidsgiver-betaler-ikke-ut-lonn/NAV%2067-01.01/klage/brev'
            },
            {
                temaKey: TemaKey.TIL,
                title: 'Tiltakspenger for arbeidsrettet tiltak',
                allowsAnke: false,
                digitalKlage: false,
                path: 'tiltakspenger',
                mailKlageUrl: 'https://www.nav.no/soknader/nb/person/arbeid/tiltakspenger/NAV%2076-13.45/klage/brev'
            },
            {
                temaKey: TemaKey.OPP,
                title: 'Vurdering av behov for bistand etter NAV loven § 14 a',
                allowsAnke: false,
                digitalKlage: false,
                path: 'nav-loven-14a',
                mailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/arbeid/Bistand-fra-NAV-for-a-komme-i-arbeid/NAV%2000-01.00/klage/brev'
            }
        ]
    },
    {
        title: 'Helse',
        path: 'helse',
        beskrivelse: 'Sykepenger, uføre, yrkesskade',
        kategorier: [
            {
                temaKey: TemaKey.SYK,
                title: 'Sykepenger',
                allowsAnke: true,
                digitalKlage: false,
                path: 'sykepenger',
                mailKlageUrl: 'https://www.nav.no/soknader/nb/person/helse/sykepenger/NAV%2000-03.00/klage/brev',
                mailAnkeUrl: 'https://www.nav.no/soknader/nb/person/helse/sykepenger/NAV%2000-03.00/anke/brev'
            },
            {
                temaKey: TemaKey.AAP,
                title: 'Arbeidsavklaringspenger (AAP)',
                allowsAnke: true,
                digitalKlage: false,
                path: 'arbeidsavklaringspenger',
                mailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/arbeid/arbeidsavklaringspenger/NAV%2011-13.05/klage/brev',
                mailAnkeUrl:
                    'https://www.nav.no/soknader/nb/person/arbeid/arbeidsavklaringspenger/NAV%2011-13.05/anke/brev'
            },
            {
                temaKey: TemaKey.UFO,
                title: 'Uføretrygd',
                allowsAnke: true,
                digitalKlage: false,
                path: 'uforetrygd',
                mailKlageUrl: 'https://www.nav.no/soknader/nb/person/helse/uforetrygd/NAV%2012-06.05/klage/brev',
                mailAnkeUrl: 'https://www.nav.no/soknader/nb/person/helse/uforetrygd/NAV%2012-06.05/anke/brev'
            },
            {
                temaKey: TemaKey.GRU,
                title: 'Grunnstønad og hjelpestønad',
                allowsAnke: true,
                digitalKlage: false,
                path: 'grunn-og-hjelpestonad',
                mailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/helse/grunn-og-hjelpestonad/NAV%2006-03.04/klage/brev',
                mailAnkeUrl:
                    'https://www.nav.no/soknader/nb/person/helse/grunn-og-hjelpestonad/NAV%2006-03.04/anke/brev'
            },
            {
                temaKey: TemaKey.YRK,
                title: 'Yrkesskade og yrkesskadetrygd',
                allowsAnke: true,
                digitalKlage: false,
                path: 'yrkesskadetrygd',
                mailKlageUrl: 'https://www.nav.no/soknader/nb/person/helse/yrkesskade/NAV%2013-07.05/klage/brev',
                mailAnkeUrl: 'https://www.nav.no/soknader/nb/person/helse/yrkesskade/NAV%2013-07.05/anke/brev'
            }
        ]
    },
    {
        title: 'Familie',
        path: 'familie',
        beskrivelse: 'Foreldrepenger, omsorg og pleie',
        kategorier: [
            {
                temaKey: TemaKey.FOR,
                title: 'Foreldrepenger, engangsstønad og svangerskapspenger',
                allowsAnke: true,
                digitalKlage: true,
                path: 'foreldrepenger',
                mailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/familie/foreldrepenger-og-engangsstonad/NAV%2014-05.09/klage/brev',
                mailAnkeUrl:
                    'https://www.nav.no/soknader/nb/person/familie/foreldrepenger-og-engangsstonad/NAV%2014-05.09/anke/brev'
            },
            {
                temaKey: TemaKey.KON,
                title: 'Kontantstøtte',
                allowsAnke: false,
                digitalKlage: false,
                path: 'kontantstotte',
                mailKlageUrl: 'https://www.nav.no/soknader/nb/person/familie/kontantstotte/NAV%2034-00.08/klage/brev'
            },
            {
                temaKey: TemaKey.BAR,
                title: 'Barnetrygd',
                allowsAnke: true,
                digitalKlage: false,
                path: 'barnetrygd',
                mailKlageUrl: 'https://www.nav.no/soknader/nb/person/familie/barnetrygd/NAV%2033-00.07/klage/brev',
                mailAnkeUrl: 'https://www.nav.no/soknader/nb/person/familie/barnetrygd/NAV%2033-00.07/anke/brev'
            },
            {
                temaKey: TemaKey.BID,
                title: 'Barnebidrag og bidragsforskudd',
                allowsAnke: false,
                digitalKlage: false,
                path: 'barnebidrag-og-bidragsforskudd',
                mailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/familie/barnebidrag-og-bidragsforskudd/NAV%2055-00.60/klage/brev'
            },
            {
                temaKey: TemaKey.BID,
                title: 'Ektefellebidrag',
                allowsAnke: true,
                digitalKlage: false,
                path: 'ektefellebidrag',
                mailKlageUrl: 'https://www.nav.no/soknader/nb/person/familie/ektefellebidrag/NAV%2053-00.05/klage/brev',
                mailAnkeUrl: 'https://www.nav.no/soknader/nb/person/familie/ektefellebidrag/NAV%2053-00.05/anke/brev'
            },
            {
                temaKey: TemaKey.ENF,
                title: 'Enslig mor eller far',
                allowsAnke: true,
                digitalKlage: false,
                path: 'enslig-mor-eller-far',
                mailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/familie/enslig-mor-eller-far/NAV%2015-00.01/klage/brev',
                mailAnkeUrl:
                    'https://www.nav.no/soknader/nb/person/familie/enslig-mor-eller-far/NAV%2015-00.01/anke/brev'
            },
            {
                temaKey: TemaKey.GRA,
                title: 'Gravferdsstønad',
                allowsAnke: true,
                digitalKlage: false,
                path: 'gravferdsstonad',
                mailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/stonader-ved-dodsfall/gravferdsstonad-og-baretransport/NAV%2007-02.08/klage/brev',
                mailAnkeUrl:
                    'https://www.nav.no/soknader/nb/person/stonader-ved-dodsfall/gravferdsstonad-og-baretransport/NAV%2007-02.08/anke/brev'
            },
            {
                temaKey: TemaKey.OMS,
                title: 'Omsorgspenger, opplæringspenger, pleiepenger',
                allowsAnke: true,
                digitalKlage: false,
                path: 'sykdom-i-familien',
                mailKlageUrl: 'https://www.nav.no/soknader/nb/person/familie/omsorgspenger/NAV%2009-06.07/klage/brev',
                mailAnkeUrl: 'https://www.nav.no/soknader/nb/person/familie/omsorgspenger/NAV%2009-06.07/anke/brev'
            },
            {
                temaKey: TemaKey.BID,
                title: 'Oppfostringsbidrag',
                allowsAnke: true,
                digitalKlage: false,
                path: 'oppfostringsbidrag',
                mailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/familie/oppfostringsbidrag/NAV%2057-00.08/klage/brev',
                mailAnkeUrl: 'https://www.nav.no/soknader/nb/person/familie/oppfostringsbidrag/NAV%2057-00.08/anke/brev'
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
                title: 'Alderspensjon',
                allowsAnke: true,
                digitalKlage: false,
                path: 'alderspensjon',
                mailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/pensjon/alderspensjon-og-avtalefestet-pensjon/NAV%2019-01.05/klage/brev',
                mailAnkeUrl:
                    'https://www.nav.no/soknader/nb/person/pensjon/alderspensjon-og-avtalefestet-pensjon/NAV%2019-01.05/anke/brev'
            },
            {
                temaKey: TemaKey.PEN,
                title: 'Avtalefestet pensjon (AFP)',
                allowsAnke: true,
                digitalKlage: false,
                path: 'avtalefestet-pensjon',
                mailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/pensjon/avtalefestet-pensjon-fra-statens-pensjonskasse/NAV%2062-00.16/klage/brev',
                mailAnkeUrl:
                    'https://www.nav.no/soknader/nb/person/pensjon/avtalefestet-pensjon-fra-statens-pensjonskasse/NAV%2062-00.16/anke/brev'
            },
            {
                temaKey: TemaKey.PEN,
                title: 'Barnepensjon',
                allowsAnke: true,
                digitalKlage: false,
                path: 'barnepensjon',
                mailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/pensjon/barn-som-har-mistet-en-eller-flere-av-foreldrene/NAV%2018-04.01/klage/brev',
                mailAnkeUrl:
                    'https://www.nav.no/soknader/nb/person/pensjon/barn-som-har-mistet-en-eller-flere-av-foreldrene/NAV%2018-04.01/anke/brev'
            },
            {
                temaKey: TemaKey.PEN,
                title: 'Krigspensjon',
                allowsAnke: true,
                digitalKlage: false,
                path: 'krigspensjon',
                mailKlageUrl: 'https://www.nav.no/soknader/nb/person/pensjon/krigspensjon/NAV%2031-00.02/klage/brev',
                mailAnkeUrl: 'https://www.nav.no/soknader/nb/person/pensjon/krigspensjon/NAV%2031-00.02/anke/brev'
            },
            {
                temaKey: TemaKey.PEN,
                title: 'Pensjon til gjenlevende ektefelle eller samboer',
                allowsAnke: true,
                digitalKlage: false,
                path: 'gjenlevende',
                mailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/pensjon/gjenlevende-ektefelle-partner-eller-samboer/NAV%2017-01.05/klage/brev',
                mailAnkeUrl:
                    'https://www.nav.no/soknader/nb/person/pensjon/gjenlevende-ektefelle-partner-eller-samboer/NAV%2017-01.05/anke/brev'
            },
            {
                temaKey: TemaKey.SUP,
                title: 'Supplerende stønad til pensjon ved kort botid i Norge',
                allowsAnke: true,
                digitalKlage: false,
                path: 'supplerende-stonad',
                mailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/pensjon/supplerende-stonad-til-personer-over-sekstisyv-ar/NAV%2064-21.00/klage/brev',
                mailAnkeUrl:
                    'https://www.nav.no/soknader/nb/person/pensjon/supplerende-stonad-til-personer-over-sekstisyv-ar/NAV%2064-21.00/anke/brev'
            },
            {
                temaKey: TemaKey.PEN,
                title: 'Ytelser til tidligere familiepleier',
                allowsAnke: true,
                digitalKlage: false,
                path: 'tidligere-familiepleier',
                mailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/stonader-ved-dodsfall/familiepleier/NAV%2016-01.05/klage/brev',
                mailAnkeUrl:
                    'https://www.nav.no/soknader/nb/person/stonader-ved-dodsfall/familiepleier/NAV%2016-01.05/anke/brev'
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
                title: 'Opphold eller arbeid i Norge',
                allowsAnke: true,
                digitalKlage: false,
                path: 'opphold-eller-arbeid-i-norge',
                mailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/til-eller-fra-norge/opphold-eller-arbeid-i-norge/NAV%2002-07.05/klage/brev',
                mailAnkeUrl:
                    'https://www.nav.no/soknader/nb/person/til-eller-fra-norge/opphold-eller-arbeid-i-norge/NAV%2002-07.05/anke/brev'
            },
            {
                temaKey: TemaKey.MED,
                title: 'Opphold eller arbeid utenfor Norge',
                allowsAnke: true,
                digitalKlage: false,
                path: 'opphold-eller-arbeid-utenfor-norge',
                mailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/til-eller-fra-norge/opphold-eller-arbeid-utenfor-norge/NAV%2002-08.05/klage/brev',
                mailAnkeUrl:
                    'https://www.nav.no/soknader/nb/person/til-eller-fra-norge/opphold-eller-arbeid-utenfor-norge/NAV%2002-08.05/anke/brev'
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
                allowsAnke: true,
                digitalKlage: false,
                path: 'hjelpemidler',
                mailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/hjelpemidler-og-tilrettelegging/diverse/NAV%2010-07.23/klage/brev',
                mailAnkeUrl:
                    'https://www.nav.no/soknader/nb/person/hjelpemidler-og-tilrettelegging/diverse/NAV%2010-07.23/anke/brev'
            },
            {
                temaKey: TemaKey.BIL,
                title: 'Stønad til bil og spesialutstyr til kjøretøy',
                allowsAnke: true,
                digitalKlage: false,
                path: 'bil',
                mailKlageUrl:
                    'https://www.nav.no/soknader/nb/person/hjelpemidler-og-tilrettelegging/bil/NAV%2010-07.40/klage/brev',
                mailAnkeUrl:
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
                allowsAnke: false,
                digitalKlage: false,
                path: 'sosiale-tjenester',
                mailKlageUrl: klageFormUrl,
                externalUrl: 'https://www.nav.no/sosialhjelp/artikkel/124875'
            }
        ]
    }
];
