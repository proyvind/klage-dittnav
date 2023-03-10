/* eslint-disable max-lines */
import { EnvString } from '../environment/environment';
import { Innsendingsytelse } from '../innsendingsytelser/innsendingsytelser';
import { Languages } from '../language/types';

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
  innsendingsytelse: Innsendingsytelse;
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
        innsendingsytelse: Innsendingsytelse.DAGPENGER_FERIEPENGER,
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        digitalKlageFullmakt: false,
        path: 'dagpenger-feriepenger',
      },
      {
        innsendingsytelse: Innsendingsytelse.DAGPENGER_TILBAKEBETALING_FORSKUDD,
        allowsAnke: false,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        digitalKlageFullmakt: false,
        path: 'dagpenger-tilbakebetaling-forskudd',
      },
      {
        innsendingsytelse: Innsendingsytelse.LONNSKOMPENSASJON,
        allowsAnke: false,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        digitalKlageFullmakt: false,
        path: 'lonnskompensasjon',
      },
      {
        innsendingsytelse: Innsendingsytelse.MIDLERTIDIG_KOMPENSASJON,
        allowsAnke: false,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
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
        innsendingsytelse: Innsendingsytelse.DAGPENGER,
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        digitalKlageFullmakt: false,
        path: 'dagpenger',
      },
      {
        innsendingsytelse: Innsendingsytelse.DAGPENGER_FERIEPENGER,
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        digitalKlageFullmakt: false,
        path: 'dagpenger-feriepenger',
      },
      {
        innsendingsytelse: Innsendingsytelse.DAGPENGER_TILBAKEBETALING_FORSKUDD,
        allowsAnke: false,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        digitalKlageFullmakt: false,
        path: 'dagpenger-tilbakebetaling-forskudd',
      },
      {
        innsendingsytelse: Innsendingsytelse.ARBEIDSAVKLARINGSPENGER,
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        digitalKlageFullmakt: false,
        path: 'arbeidsavklaringspenger',
      },
      {
        innsendingsytelse: Innsendingsytelse.LONNSGARANTI,
        allowsAnke: false,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        digitalKlageFullmakt: false,
        path: 'lonnsgaranti',
      },
      {
        innsendingsytelse: Innsendingsytelse.TILTAKSPENGER,
        allowsAnke: false,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        digitalKlageFullmakt: false,
        path: 'tiltakspenger',
      },
      {
        innsendingsytelse: Innsendingsytelse.NAV_LOVEN_14A,
        allowsAnke: false,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
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
        innsendingsytelse: Innsendingsytelse.SYKEPENGER,
        allowsAnke: true,
        showAnkeList: [EnvString.DEV, EnvString.LOCAL],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        digitalKlageFullmakt: false,
        path: 'sykepenger',
      },
      {
        innsendingsytelse: Innsendingsytelse.ARBEIDSAVKLARINGSPENGER,
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        digitalKlageFullmakt: false,
        path: 'arbeidsavklaringspenger',
      },
      {
        innsendingsytelse: Innsendingsytelse.UFORETRYGD,
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        digitalKlageFullmakt: false,
        path: 'uforetrygd',
      },
      {
        innsendingsytelse: Innsendingsytelse.SUPPLERENDE_STONAD_UFORE_FLYKTNINGER,
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        digitalKlageFullmakt: false,
        path: 'supplerende-stonad-ufore-flyktninger',
      },
      {
        innsendingsytelse: Innsendingsytelse.GRUNN_OG_HJELPESTONAD,
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        digitalKlageFullmakt: false,
        path: 'grunn-og-hjelpestonad',
      },
      {
        innsendingsytelse: Innsendingsytelse.YRKESSKADE,
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
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
        innsendingsytelse: Innsendingsytelse.FORELDREPENGER,
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        digitalKlageFullmakt: false,
        path: 'foreldrepenger',
      },
      {
        innsendingsytelse: Innsendingsytelse.ENGANGSSTONAD,
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        digitalKlageFullmakt: false,
        path: 'engangsstonad',
      },
      {
        innsendingsytelse: Innsendingsytelse.SVANGERSKAPSPENGER,
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        digitalKlageFullmakt: false,
        path: 'svangerskapspenger',
      },
      {
        innsendingsytelse: Innsendingsytelse.KONTANTSTOTTE,
        allowsAnke: false,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        digitalKlageFullmakt: false,
        path: 'kontantstotte',
      },
      {
        innsendingsytelse: Innsendingsytelse.BARNETRYGD,
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        digitalKlageFullmakt: false,
        path: 'barnetrygd',
      },
      {
        innsendingsytelse: Innsendingsytelse.BARNEBIDRAG_OG_BIDRAGSFORSKUDD,
        allowsAnke: false,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        digitalKlageFullmakt: false,
        path: 'barnebidrag-og-bidragsforskudd',
      },
      {
        innsendingsytelse: Innsendingsytelse.EKTEFELLEBIDRAG,
        allowsAnke: false,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        digitalKlageFullmakt: false,
        path: 'ektefellebidrag',
      },
      {
        innsendingsytelse: Innsendingsytelse.ENSLIG_MOR_ELLER_FAR,
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [EnvString.DEV, EnvString.LOCAL, EnvString.PROD],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        digitalKlageFullmakt: false,
        path: 'enslig-mor-eller-far',
      },
      {
        innsendingsytelse: Innsendingsytelse.GRAVFERDSSTONAD,
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        digitalKlageFullmakt: false,
        path: 'gravferdsstonad',
      },
      {
        innsendingsytelse: Innsendingsytelse.SYKDOM_I_FAMILIEN,
        allowsAnke: true,
        showAnkeList: [EnvString.DEV, EnvString.LOCAL],
        digitalKlage: [EnvString.DEV, EnvString.LOCAL, EnvString.PROD],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        digitalKlageFullmakt: false,
        path: 'sykdom-i-familien',
      },
      {
        innsendingsytelse: Innsendingsytelse.OPPFOSTRINGSBIDRAG,
        allowsAnke: false,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
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
        innsendingsytelse: Innsendingsytelse.ALDERSPENSJON,
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        digitalKlageFullmakt: false,
        path: 'alderspensjon',
      },
      {
        innsendingsytelse: Innsendingsytelse.AVTALEFESTET_PENSJON_SPK,
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        digitalKlageFullmakt: false,
        path: 'avtalefestet-pensjon-spk',
      },
      {
        innsendingsytelse: Innsendingsytelse.AVTALEFESTET_PENSJON_PRIVAT,
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        digitalKlageFullmakt: false,
        path: 'avtalefestet-pensjon-privat',
      },
      {
        innsendingsytelse: Innsendingsytelse.BARNEPENSJON,
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        digitalKlageFullmakt: false,
        path: 'barnepensjon',
      },
      {
        innsendingsytelse: Innsendingsytelse.KRIGSPENSJON,
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        digitalKlageFullmakt: false,
        path: 'krigspensjon',
      },
      {
        innsendingsytelse: Innsendingsytelse.GJENLEVENDE,
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        digitalKlageFullmakt: false,
        path: 'gjenlevende',
      },
      {
        innsendingsytelse: Innsendingsytelse.SUPPLERENDE_STONAD,
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        digitalKlageFullmakt: false,
        path: 'supplerende-stonad',
      },
      {
        innsendingsytelse: Innsendingsytelse.TIDLIGERE_FAMILIEPLEIER,
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
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
        innsendingsytelse: Innsendingsytelse.OPPHOLD_ELLER_ARBEID_I_NORGE,
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        digitalKlageFullmakt: false,
        path: 'opphold-eller-arbeid-i-norge',
      },
      {
        innsendingsytelse: Innsendingsytelse.OPPHOLD_ELLER_ARBEID_UTENFOR_NORGE,
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
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
        innsendingsytelse: Innsendingsytelse.HJELPEMIDLER,
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        digitalKlageFullmakt: false,
        path: 'hjelpemidler',
      },
      {
        innsendingsytelse: Innsendingsytelse.BILSTONAD,
        allowsAnke: true,
        showAnkeList: [],
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
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

export const innsendingsytelsePath = (innsendingsytelse: Innsendingsytelse | null): string | null => {
  if (innsendingsytelse === null) {
    return null;
  }

  for (const { path, kategorier } of INNGANG_KATEGORIER) {
    const kategori = kategorier.find((k) => k.innsendingsytelse === innsendingsytelse);

    if (kategori !== undefined) {
      return `${path}/${kategori.path}`;
    }
  }

  return null;
};
