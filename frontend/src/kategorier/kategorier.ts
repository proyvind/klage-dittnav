/* eslint-disable max-lines */
import { EnvString } from '@app/environment/environment';
import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { Languages } from '@app/language/types';

export type StringValue = {
  [key in Languages]: string;
};

interface BaseTema {
  path: string;
  externalUrl?: StringValue;
  beskrivelse: StringValue;
}

interface IBaseKategori {
  innsendingsytelse: Innsendingsytelse;
  allowsAnke: boolean;
  digitalKlage: EnvString[];
  digitalAnke: EnvString[];
}

// Rendered
export interface ITemakategori extends BaseTema, IBaseKategori {}

// Rendered
export interface ITemaWithKategorier extends BaseTema {
  title: StringValue;
  kategorier: IKategori[];
}

// Rendered
export interface IKategori extends IBaseKategori {
  path: string;
  externalUrl?: StringValue;
}

export type ITema = ITemakategori | ITemaWithKategorier;

export const INNGANG_KATEGORIER: ITema[] = [
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
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        path: 'dagpenger',
      },
      {
        innsendingsytelse: Innsendingsytelse.DAGPENGER_TILBAKEBETALING_FORSKUDD,
        allowsAnke: false,
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        path: 'dagpenger-tilbakebetaling-forskudd',
      },
      {
        innsendingsytelse: Innsendingsytelse.ARBEIDSAVKLARINGSPENGER,
        allowsAnke: true,
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        path: 'arbeidsavklaringspenger',
      },
      {
        innsendingsytelse: Innsendingsytelse.LONNSGARANTI,
        allowsAnke: false,
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        path: 'lonnsgaranti',
      },
      {
        innsendingsytelse: Innsendingsytelse.TILTAKSPENGER,
        allowsAnke: false,
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],

        path: 'tiltakspenger',
      },
      {
        innsendingsytelse: Innsendingsytelse.NAV_LOVEN_14A,
        allowsAnke: false,
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
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
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        path: 'sykepenger',
      },
      {
        innsendingsytelse: Innsendingsytelse.ARBEIDSAVKLARINGSPENGER,
        allowsAnke: true,
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        path: 'arbeidsavklaringspenger',
      },
      {
        innsendingsytelse: Innsendingsytelse.UFORETRYGD,
        allowsAnke: true,
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        path: 'uforetrygd',
      },
      {
        innsendingsytelse: Innsendingsytelse.SUPPLERENDE_STONAD_UFORE_FLYKTNINGER,
        allowsAnke: true,
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        path: 'supplerende-stonad-ufore-flyktninger',
      },
      {
        innsendingsytelse: Innsendingsytelse.GRUNN_OG_HJELPESTONAD,
        allowsAnke: true,
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        path: 'grunn-og-hjelpestonad',
      },
      {
        innsendingsytelse: Innsendingsytelse.YRKESSKADE,
        allowsAnke: true,
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
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
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        path: 'foreldrepenger',
      },
      {
        innsendingsytelse: Innsendingsytelse.ENGANGSSTONAD,
        allowsAnke: true,
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        path: 'engangsstonad',
      },
      {
        innsendingsytelse: Innsendingsytelse.SVANGERSKAPSPENGER,
        allowsAnke: true,
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        path: 'svangerskapspenger',
      },
      {
        innsendingsytelse: Innsendingsytelse.KONTANTSTOTTE,
        allowsAnke: false,
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        path: 'kontantstotte',
      },
      {
        innsendingsytelse: Innsendingsytelse.BARNETRYGD,
        allowsAnke: true,
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        path: 'barnetrygd',
      },
      {
        innsendingsytelse: Innsendingsytelse.BARNEBIDRAG_OG_BIDRAGSFORSKUDD,
        allowsAnke: false,
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        path: 'barnebidrag-og-bidragsforskudd',
      },
      {
        innsendingsytelse: Innsendingsytelse.EKTEFELLEBIDRAG,
        allowsAnke: false,
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        path: 'ektefellebidrag',
      },
      {
        innsendingsytelse: Innsendingsytelse.ENSLIG_MOR_ELLER_FAR,
        allowsAnke: true,
        digitalKlage: [EnvString.DEV, EnvString.LOCAL, EnvString.PROD],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        path: 'enslig-mor-eller-far',
      },
      {
        innsendingsytelse: Innsendingsytelse.GRAVFERDSSTONAD,
        allowsAnke: true,
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        path: 'gravferdsstonad',
      },
      {
        innsendingsytelse: Innsendingsytelse.SYKDOM_I_FAMILIEN,
        allowsAnke: true,
        digitalKlage: [EnvString.DEV, EnvString.LOCAL, EnvString.PROD],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        path: 'sykdom-i-familien',
      },
      {
        innsendingsytelse: Innsendingsytelse.OPPFOSTRINGSBIDRAG,
        allowsAnke: false,
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
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
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        path: 'alderspensjon',
      },
      {
        innsendingsytelse: Innsendingsytelse.AVTALEFESTET_PENSJON_SPK,
        allowsAnke: true,
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        path: 'avtalefestet-pensjon-spk',
      },
      {
        innsendingsytelse: Innsendingsytelse.AVTALEFESTET_PENSJON_PRIVAT,
        allowsAnke: true,
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        path: 'avtalefestet-pensjon-privat',
      },
      {
        innsendingsytelse: Innsendingsytelse.BARNEPENSJON,
        allowsAnke: true,
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        path: 'barnepensjon',
      },
      {
        innsendingsytelse: Innsendingsytelse.KRIGSPENSJON,
        allowsAnke: true,
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        path: 'krigspensjon',
      },
      {
        innsendingsytelse: Innsendingsytelse.GJENLEVENDE,
        allowsAnke: true,
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        path: 'gjenlevende',
      },
      {
        innsendingsytelse: Innsendingsytelse.SUPPLERENDE_STONAD,
        allowsAnke: true,
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        path: 'supplerende-stonad',
      },
      {
        innsendingsytelse: Innsendingsytelse.TIDLIGERE_FAMILIEPLEIER,
        allowsAnke: true,
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
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
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        path: 'opphold-eller-arbeid-i-norge',
      },
      {
        innsendingsytelse: Innsendingsytelse.OPPHOLD_ELLER_ARBEID_UTENFOR_NORGE,
        allowsAnke: true,
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
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
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        path: 'hjelpemidler',
      },
      {
        innsendingsytelse: Innsendingsytelse.BILSTONAD,
        allowsAnke: true,
        digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
        digitalAnke: [EnvString.DEV, EnvString.LOCAL],
        path: 'bil',
      },
    ],
  },
  {
    // title: { [Languages.nb]: 'Tilleggsstønader', [Languages.en]: 'Supplemental benefit' },
    path: 'tilleggstonader',
    beskrivelse: {
      [Languages.nb]: '',
      [Languages.en]: '',
    },
    innsendingsytelse: Innsendingsytelse.TILLEGGSSTONADER,
    allowsAnke: true,
    digitalKlage: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
    digitalAnke: [EnvString.PROD, EnvString.DEV, EnvString.LOCAL],
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

  for (const tema of INNGANG_KATEGORIER) {
    if (!('kategorier' in tema)) {
      return tema.path;
    }

    const kategori = tema.kategorier.find((k) => k.innsendingsytelse === innsendingsytelse);

    if (kategori !== undefined) {
      return `${tema.path}/${kategori.path}`;
    }
  }

  return null;
};
