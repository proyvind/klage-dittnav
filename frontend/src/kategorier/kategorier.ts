/* eslint-disable max-lines */
import { EnvString } from '../environment/environment';
import { Languages } from '../language/types';
import { TemaKey } from '../tema/tema';

export type StringValue = {
  [key in Languages]: string;
};

export interface InngangKategori {
  title: StringValue;
  path: string;
  beskrivelse: StringValue;
  kategorier: Kategori[];
  externalUrl?: StringValue;
}

export interface Kategori {
  temaKey: TemaKey;
  titleKey: string;
  allowsAnke: boolean;
  showAnkeList: EnvString[];
  digitalKlage: EnvString[];
  digitalAnke: EnvString[];
  digitalKlageFullmakt: boolean;
  path: string;
  externalUrl?: StringValue;
}

export const INNGANG_KATEGORIER: InngangKategori[] = [
  {
    title: {
      [Languages.nb]: 'Korona / Covid-19',
      [Languages.en]: 'Corona / COVID-19',
    },
    path: 'korona',
    beskrivelse: {
      [Languages.nb]: 'Midlertidige ordninger',
      [Languages.en]: 'Temporary schemes (midlertidige ordninger)',
    },
    kategorier: [
      {
        temaKey: TemaKey.DAG,
        titleKey: 'DAGPENGER_FERIEPENGER',
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [],
        digitalKlageFullmakt: false,
        path: 'dagpenger-feriepenger',
      },
      {
        temaKey: TemaKey.DAG,
        titleKey: 'DAGPENGER_TILBAKEBETALING_FORSKUDD',
        allowsAnke: false,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [],
        digitalKlageFullmakt: false,
        path: 'dagpenger-tilbakebetaling-forskudd',
      },
      {
        temaKey: TemaKey.DAG,
        titleKey: 'LONNSKOMPENSASJON',
        allowsAnke: false,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [],
        digitalKlageFullmakt: false,
        path: 'lonnskompensasjon',
      },
      {
        temaKey: TemaKey.GEN,
        titleKey: 'MIDLERTIDIG_KOMPENSASJON',
        allowsAnke: false,
        showAnkeList: [],
        digitalKlage: [],
        digitalAnke: [],
        digitalKlageFullmakt: false,
        path: 'midlertidig-kompensasjon',
      },
    ],
  },
  {
    title: {
      [Languages.nb]: 'Arbeid',
      [Languages.en]: 'Work',
    },
    path: 'arbeid',
    beskrivelse: {
      [Languages.nb]: 'Dagpenger, AAP, tiltakspenger',
      [Languages.en]:
        'Unemployment benefit (dagpenger), work assessment allowance (AAP), benefits while participating in employment schemes (tiltakspenger)',
    },
    kategorier: [
      {
        temaKey: TemaKey.DAG,
        titleKey: 'DAGPENGER',
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [],
        digitalKlageFullmakt: false,
        path: 'dagpenger',
      },
      {
        temaKey: TemaKey.DAG,
        titleKey: 'DAGPENGER_FERIEPENGER',
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [],
        digitalKlageFullmakt: false,
        path: 'dagpenger-feriepenger',
      },
      {
        temaKey: TemaKey.DAG,
        titleKey: 'DAGPENGER_TILBAKEBETALING_FORSKUDD',
        allowsAnke: false,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [],
        digitalKlageFullmakt: false,
        path: 'dagpenger-tilbakebetaling-forskudd',
      },
      {
        temaKey: TemaKey.AAP,
        titleKey: 'ARBEIDSAVKLARINGSPENGER',
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [],
        digitalKlageFullmakt: false,
        path: 'arbeidsavklaringspenger',
      },
      {
        temaKey: TemaKey.GEN,
        titleKey: 'LONNSGARANTI',
        allowsAnke: false,
        showAnkeList: [],
        digitalKlage: [EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [],
        digitalKlageFullmakt: false,
        path: 'lonnsgaranti',
      },
      {
        temaKey: TemaKey.IND,
        titleKey: 'TILTAKSPENGER',
        allowsAnke: false,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [],
        digitalKlageFullmakt: false,
        path: 'tiltakspenger',
      },
      {
        temaKey: TemaKey.OPP,
        titleKey: 'NAV_LOVEN_14A',
        allowsAnke: false,
        showAnkeList: [],
        digitalKlage: [],
        digitalAnke: [],
        digitalKlageFullmakt: false,
        path: 'nav-loven-14a',
      },
    ],
  },
  {
    title: { [Languages.nb]: 'Helse', [Languages.en]: 'Health' },
    path: 'helse',
    beskrivelse: {
      [Languages.nb]: 'Sykepenger, uføre, yrkesskade',
      [Languages.en]: 'Sickness benefit (sykepenger), disability (uføre), occupational injury (yrkesskade)',
    },
    kategorier: [
      {
        temaKey: TemaKey.SYK,
        titleKey: 'SYKEPENGER',
        allowsAnke: true,
        showAnkeList: [EnvString.DEV, EnvString.LOCAL],
        digitalKlage: [],
        digitalAnke: [],
        digitalKlageFullmakt: false,
        path: 'sykepenger',
      },
      {
        temaKey: TemaKey.AAP,
        titleKey: 'ARBEIDSAVKLARINGSPENGER',
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [],
        digitalKlageFullmakt: false,
        path: 'arbeidsavklaringspenger',
      },
      {
        temaKey: TemaKey.UFO,
        titleKey: 'UFORETRYGD',
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [],
        digitalAnke: [],
        digitalKlageFullmakt: false,
        path: 'uforetrygd',
      },
      {
        temaKey: TemaKey.SUP,
        titleKey: 'SUPPLERENDE_STONAD_UFORE_FLYKTNINGER',
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [],
        digitalKlageFullmakt: false,
        path: 'supplerende-stonad-ufore-flyktninger',
      },
      {
        temaKey: TemaKey.GRU,
        titleKey: 'GRUNN_OG_HJELPESTONAD',
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [],
        digitalAnke: [],
        digitalKlageFullmakt: false,
        path: 'grunn-og-hjelpestonad',
      },
      {
        temaKey: TemaKey.YRK,
        titleKey: 'YRKESSKADE',
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [],
        digitalKlageFullmakt: false,
        path: 'yrkesskade',
      },
    ],
  },
  {
    title: { [Languages.nb]: 'Familie', [Languages.en]: 'Family' },
    path: 'familie',
    beskrivelse: {
      [Languages.nb]: 'Foreldrepenger, pleie- og omsorgspenger',
      [Languages.en]: 'Parental benefit (foreldrepenger), care (omsorg) and attendance (pleie)',
    },
    kategorier: [
      {
        temaKey: TemaKey.FOR,
        titleKey: 'FORELDREPENGER',
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [],
        digitalKlageFullmakt: false,
        path: 'foreldrepenger',
      },
      {
        temaKey: TemaKey.FOR,
        titleKey: 'ENGANGSSTONAD',
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [],
        digitalKlageFullmakt: false,
        path: 'engangsstonad',
      },
      {
        temaKey: TemaKey.FOR,
        titleKey: 'SVANGERSKAPSPENGER',
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [],
        digitalKlageFullmakt: false,
        path: 'svangerskapspenger',
      },
      {
        temaKey: TemaKey.KON,
        titleKey: 'KONTANTSTOTTE',
        allowsAnke: false,
        showAnkeList: [],
        digitalKlage: [],
        digitalAnke: [],
        digitalKlageFullmakt: false,
        path: 'kontantstotte',
      },
      {
        temaKey: TemaKey.BAR,
        titleKey: 'BARNETRYGD',
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [],
        digitalAnke: [],
        digitalKlageFullmakt: false,
        path: 'barnetrygd',
      },
      {
        temaKey: TemaKey.BID,
        titleKey: 'BARNEBIDRAG_OG_BIDRAGSFORSKUDD',
        allowsAnke: false,
        showAnkeList: [],
        digitalKlage: [],
        digitalAnke: [],
        digitalKlageFullmakt: false,
        path: 'barnebidrag-og-bidragsforskudd',
      },
      {
        temaKey: TemaKey.BID,
        titleKey: 'EKTEFELLEBIDRAG',
        allowsAnke: false,
        showAnkeList: [],
        digitalKlage: [],
        digitalAnke: [],
        digitalKlageFullmakt: false,
        path: 'ektefellebidrag',
      },
      {
        temaKey: TemaKey.ENF,
        titleKey: 'ENSLIG_MOR_ELLER_FAR',
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [EnvString.DEV, EnvString.LOCAL, EnvString.PROD],
        digitalAnke: [],
        digitalKlageFullmakt: false,
        path: 'enslig-mor-eller-far',
      },
      {
        temaKey: TemaKey.GRA,
        titleKey: 'GRAVFERDSSTONAD',
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [],
        digitalAnke: [],
        digitalKlageFullmakt: false,
        path: 'gravferdsstonad',
      },
      {
        temaKey: TemaKey.OMS,
        titleKey: 'SYKDOM_I_FAMILIEN',
        allowsAnke: true,
        showAnkeList: [EnvString.DEV, EnvString.LOCAL],
        digitalKlage: [EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [],
        digitalKlageFullmakt: false,
        path: 'sykdom-i-familien',
      },
      {
        temaKey: TemaKey.BID,
        titleKey: 'OPPFOSTRINGSBIDRAG',
        allowsAnke: false,
        showAnkeList: [],
        digitalKlage: [],
        digitalAnke: [],
        digitalKlageFullmakt: false,
        path: 'oppfostringsbidrag',
      },
    ],
  },
  {
    title: { [Languages.nb]: 'Pensjon', [Languages.en]: 'Pension' },
    path: 'pensjon',
    beskrivelse: {
      [Languages.nb]: 'Alderspensjon og andre typer pensjon',
      [Languages.en]: 'Old-age pension (alderspensjon) and other types of pensions',
    },
    kategorier: [
      {
        temaKey: TemaKey.PEN,
        titleKey: 'ALDERSPENSJON',
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [],
        digitalKlageFullmakt: false,
        path: 'alderspensjon',
      },
      {
        temaKey: TemaKey.PEN,
        titleKey: 'AVTALEFESTET_PENSJON_SPK',
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [],
        digitalAnke: [],
        digitalKlageFullmakt: false,
        path: 'avtalefestet-pensjon-spk',
      },
      {
        temaKey: TemaKey.PEN,
        titleKey: 'AVTALEFESTET_PENSJON_PRIVAT',
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [],
        digitalAnke: [],
        digitalKlageFullmakt: false,
        path: 'avtalefestet-pensjon-privat',
      },
      {
        temaKey: TemaKey.PEN,
        titleKey: 'BARNEPENSJON',
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [],
        digitalAnke: [],
        digitalKlageFullmakt: false,
        path: 'barnepensjon',
      },
      {
        temaKey: TemaKey.PEN,
        titleKey: 'KRIGSPENSJON',
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [],
        digitalAnke: [],
        digitalKlageFullmakt: false,
        path: 'krigspensjon',
      },
      {
        temaKey: TemaKey.PEN,
        titleKey: 'GJENLEVENDE',
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [],
        digitalAnke: [],
        digitalKlageFullmakt: false,
        path: 'gjenlevende',
      },
      {
        temaKey: TemaKey.SUP,
        titleKey: 'SUPPLERENDE_STONAD',
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [],
        digitalKlageFullmakt: false,
        path: 'supplerende-stonad',
      },
      {
        temaKey: TemaKey.PEN,
        titleKey: 'TIDLIGERE_FAMILIEPLEIER',
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [],
        digitalAnke: [],
        digitalKlageFullmakt: false,
        path: 'tidligere-familiepleier',
      },
    ],
  },
  {
    title: { [Languages.nb]: 'Til eller fra Norge', [Languages.en]: 'To and from Norway' },
    path: 'til-eller-fra-norge',
    beskrivelse: {
      [Languages.nb]: 'Medlemskap i folketrygden og trygdeavgift',
      [Languages.en]: 'Membership of National Insurance Act',
    },
    kategorier: [
      {
        temaKey: TemaKey.MED,
        titleKey: 'OPPHOLD_ELLER_ARBEID_I_NORGE',
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [],
        digitalAnke: [],
        digitalKlageFullmakt: false,
        path: 'opphold-eller-arbeid-i-norge',
      },
      {
        temaKey: TemaKey.MED,
        titleKey: 'OPPHOLD_ELLER_ARBEID_UTENFOR_NORGE',
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [],
        digitalAnke: [],
        digitalKlageFullmakt: false,
        path: 'opphold-eller-arbeid-utenfor-norge',
      },
    ],
  },
  {
    title: {
      [Languages.nb]: 'Hjelpemidler og tilrettelegging',
      [Languages.en]: 'Assistive technology and facilitation',
    },
    path: 'hjelpemidler-og-tilrettelegging',
    beskrivelse: {
      [Languages.nb]: 'Hjelpemidler, tilrettelegging, bil',
      [Languages.en]: 'Assistive technology, facilitation, vehicle',
    },
    kategorier: [
      {
        temaKey: TemaKey.HJE,
        titleKey: 'HJELPEMIDLER',
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [],
        digitalAnke: [],
        digitalKlageFullmakt: false,
        path: 'hjelpemidler',
      },
      {
        temaKey: TemaKey.BIL,
        titleKey: 'BILSTONAD',
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [],
        digitalAnke: [],
        digitalKlageFullmakt: false,
        path: 'bil',
      },
    ],
  },
  {
    title: { [Languages.nb]: 'Økonomisk sosialhjelp', [Languages.en]: 'Financial social assistance' },
    path: 'sosiale-tjenester',
    beskrivelse: {
      [Languages.nb]: '',
      [Languages.en]: '',
    },
    kategorier: [],
    externalUrl: {
      [Languages.nb]: 'https://www.nav.no/sosialhjelp/klage',
      [Languages.en]: 'https://www.nav.no/sosialhjelp/klage?lang=en',
    },
  },
];
