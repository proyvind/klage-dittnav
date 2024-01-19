/* eslint-disable max-lines */
import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { Languages } from '@app/language/types';

export type StringValue = {
  [key in Languages]: string;
};

export enum TemaType {
  TEMA = 'TEMA',
  INNSENDINGSYTELSE = 'INNSENDINGSYTELSE',
  EXTERNAL = 'EXTERNAL',
}

export interface IExternalTema {
  type: TemaType.EXTERNAL;
  title: StringValue;
  externalUrl: StringValue;
}

export interface ITemaWithKategorier {
  type: TemaType.TEMA;
  path: string;
  title: StringValue;
  innsendingsytelser: IInnsendingsytelse[];
}

export interface IInnsendingsytelse {
  type: TemaType.INNSENDINGSYTELSE;
  path: string;
  innsendingsytelse: Innsendingsytelse;
  allowsAnke: boolean;
}

type ITema = ITemaWithKategorier | IInnsendingsytelse | IExternalTema;

export const INNGANG_KATEGORIER: ITema[] = [
  {
    type: TemaType.TEMA,
    title: {
      [Languages.nb]: 'Arbeid',
      [Languages.en]: 'Work',
    },
    path: 'arbeid',
    innsendingsytelser: [
      {
        type: TemaType.INNSENDINGSYTELSE,
        innsendingsytelse: Innsendingsytelse.DAGPENGER,
        allowsAnke: true,
        path: 'dagpenger',
      },
      {
        type: TemaType.INNSENDINGSYTELSE,
        innsendingsytelse: Innsendingsytelse.DAGPENGER_TILBAKEBETALING_FORSKUDD,
        allowsAnke: false,
        path: 'dagpenger-tilbakebetaling-forskudd',
      },
      {
        type: TemaType.INNSENDINGSYTELSE,
        innsendingsytelse: Innsendingsytelse.ARBEIDSAVKLARINGSPENGER,
        allowsAnke: true,
        path: 'arbeidsavklaringspenger',
      },
      {
        type: TemaType.INNSENDINGSYTELSE,
        innsendingsytelse: Innsendingsytelse.LONNSGARANTI,
        allowsAnke: false,
        path: 'lonnsgaranti',
      },
      {
        type: TemaType.INNSENDINGSYTELSE,
        innsendingsytelse: Innsendingsytelse.TILTAKSPENGER,
        allowsAnke: false,

        path: 'tiltakspenger',
      },
      {
        type: TemaType.INNSENDINGSYTELSE,
        innsendingsytelse: Innsendingsytelse.NAV_LOVEN_14A,
        allowsAnke: false,
        path: 'nav-loven-14a',
      },
    ],
  },
  {
    type: TemaType.TEMA,
    title: { [Languages.nb]: 'Helse', [Languages.en]: 'Health' },
    path: 'helse',
    innsendingsytelser: [
      {
        type: TemaType.INNSENDINGSYTELSE,
        innsendingsytelse: Innsendingsytelse.SYKEPENGER,
        allowsAnke: true,
        path: 'sykepenger',
      },
      {
        type: TemaType.INNSENDINGSYTELSE,
        innsendingsytelse: Innsendingsytelse.ARBEIDSAVKLARINGSPENGER,
        allowsAnke: true,
        path: 'arbeidsavklaringspenger',
      },
      {
        type: TemaType.INNSENDINGSYTELSE,
        innsendingsytelse: Innsendingsytelse.UFORETRYGD,
        allowsAnke: true,
        path: 'uforetrygd',
      },
      {
        type: TemaType.INNSENDINGSYTELSE,
        innsendingsytelse: Innsendingsytelse.SUPPLERENDE_STONAD_UFORE_FLYKTNINGER,
        allowsAnke: true,
        path: 'supplerende-stonad-ufore-flyktninger',
      },
      {
        type: TemaType.INNSENDINGSYTELSE,
        innsendingsytelse: Innsendingsytelse.GRUNN_OG_HJELPESTONAD,
        allowsAnke: true,
        path: 'grunn-og-hjelpestonad',
      },
      {
        type: TemaType.INNSENDINGSYTELSE,
        innsendingsytelse: Innsendingsytelse.YRKESSKADE,
        allowsAnke: true,
        path: 'yrkesskade',
      },
    ],
  },
  {
    type: TemaType.TEMA,
    title: { [Languages.nb]: 'Familie', [Languages.en]: 'Family' },
    path: 'familie',
    innsendingsytelser: [
      {
        type: TemaType.INNSENDINGSYTELSE,
        innsendingsytelse: Innsendingsytelse.FORELDREPENGER,
        allowsAnke: true,
        path: 'foreldrepenger',
      },
      {
        type: TemaType.INNSENDINGSYTELSE,
        innsendingsytelse: Innsendingsytelse.ENGANGSSTONAD,
        allowsAnke: true,
        path: 'engangsstonad',
      },
      {
        type: TemaType.INNSENDINGSYTELSE,
        innsendingsytelse: Innsendingsytelse.SVANGERSKAPSPENGER,
        allowsAnke: true,
        path: 'svangerskapspenger',
      },
      {
        type: TemaType.INNSENDINGSYTELSE,
        innsendingsytelse: Innsendingsytelse.KONTANTSTOTTE,
        allowsAnke: false,
        path: 'kontantstotte',
      },
      {
        type: TemaType.INNSENDINGSYTELSE,
        innsendingsytelse: Innsendingsytelse.BARNETRYGD,
        allowsAnke: true,
        path: 'barnetrygd',
      },
      {
        type: TemaType.INNSENDINGSYTELSE,
        innsendingsytelse: Innsendingsytelse.BARNEBIDRAG_OG_BIDRAGSFORSKUDD,
        allowsAnke: false,
        path: 'barnebidrag-og-bidragsforskudd',
      },
      {
        type: TemaType.INNSENDINGSYTELSE,
        innsendingsytelse: Innsendingsytelse.EKTEFELLEBIDRAG,
        allowsAnke: false,
        path: 'ektefellebidrag',
      },
      {
        type: TemaType.INNSENDINGSYTELSE,
        innsendingsytelse: Innsendingsytelse.ENSLIG_MOR_ELLER_FAR,
        allowsAnke: true,
        path: 'enslig-mor-eller-far',
      },
      {
        type: TemaType.INNSENDINGSYTELSE,
        innsendingsytelse: Innsendingsytelse.GRAVFERDSSTONAD,
        allowsAnke: true,
        path: 'gravferdsstonad',
      },
      {
        type: TemaType.INNSENDINGSYTELSE,
        innsendingsytelse: Innsendingsytelse.SYKDOM_I_FAMILIEN,
        allowsAnke: true,
        path: 'sykdom-i-familien',
      },
      {
        type: TemaType.INNSENDINGSYTELSE,
        innsendingsytelse: Innsendingsytelse.OPPFOSTRINGSBIDRAG,
        allowsAnke: false,
        path: 'oppfostringsbidrag',
      },
      {
        type: TemaType.INNSENDINGSYTELSE,
        innsendingsytelse: Innsendingsytelse.REISEKOSTNADER_VED_SAMVAER,
        allowsAnke: false,
        path: 'reisekostnader-ved-samvaer',
      },
    ],
  },
  {
    type: TemaType.TEMA,
    title: { [Languages.nb]: 'Pensjon', [Languages.en]: 'Pension' },
    path: 'pensjon',
    innsendingsytelser: [
      {
        type: TemaType.INNSENDINGSYTELSE,
        innsendingsytelse: Innsendingsytelse.ALDERSPENSJON,
        allowsAnke: true,
        path: 'alderspensjon',
      },
      {
        type: TemaType.INNSENDINGSYTELSE,
        innsendingsytelse: Innsendingsytelse.AVTALEFESTET_PENSJON_SPK,
        allowsAnke: true,
        path: 'avtalefestet-pensjon-spk',
      },
      {
        type: TemaType.INNSENDINGSYTELSE,
        innsendingsytelse: Innsendingsytelse.AVTALEFESTET_PENSJON_PRIVAT,
        allowsAnke: true,
        path: 'avtalefestet-pensjon-privat',
      },
      {
        type: TemaType.INNSENDINGSYTELSE,
        innsendingsytelse: Innsendingsytelse.BARNEPENSJON,
        allowsAnke: true,
        path: 'barnepensjon',
      },
      {
        type: TemaType.INNSENDINGSYTELSE,
        innsendingsytelse: Innsendingsytelse.KRIGSPENSJON,
        allowsAnke: true,
        path: 'krigspensjon',
      },
      {
        type: TemaType.INNSENDINGSYTELSE,
        innsendingsytelse: Innsendingsytelse.GJENLEVENDE,
        allowsAnke: true,
        path: 'gjenlevende',
      },
      {
        type: TemaType.INNSENDINGSYTELSE,
        innsendingsytelse: Innsendingsytelse.SUPPLERENDE_STONAD,
        allowsAnke: true,
        path: 'supplerende-stonad',
      },
      {
        type: TemaType.INNSENDINGSYTELSE,
        innsendingsytelse: Innsendingsytelse.TIDLIGERE_FAMILIEPLEIER,
        allowsAnke: true,
        path: 'tidligere-familiepleier',
      },
      {
        type: TemaType.INNSENDINGSYTELSE,
        innsendingsytelse: Innsendingsytelse.OMSTILLINGSSTOENAD,
        allowsAnke: true,
        path: 'omstillingsstoenad',
      },
    ],
  },
  {
    type: TemaType.TEMA,
    title: { [Languages.nb]: 'Til eller fra Norge', [Languages.en]: 'To and from Norway' },
    path: 'til-eller-fra-norge',
    innsendingsytelser: [
      {
        type: TemaType.INNSENDINGSYTELSE,
        innsendingsytelse: Innsendingsytelse.OPPHOLD_ELLER_ARBEID_I_NORGE,
        allowsAnke: true,
        path: 'opphold-eller-arbeid-i-norge',
      },
      {
        type: TemaType.INNSENDINGSYTELSE,
        innsendingsytelse: Innsendingsytelse.OPPHOLD_ELLER_ARBEID_UTENFOR_NORGE,
        allowsAnke: true,
        path: 'opphold-eller-arbeid-utenfor-norge',
      },
    ],
  },
  {
    type: TemaType.TEMA,
    title: {
      [Languages.nb]: 'Hjelpemidler og tilrettelegging',
      [Languages.en]: 'Assistive technology and facilitation',
    },
    path: 'hjelpemidler-og-tilrettelegging',
    innsendingsytelser: [
      {
        type: TemaType.INNSENDINGSYTELSE,
        innsendingsytelse: Innsendingsytelse.HJELPEMIDLER,
        allowsAnke: true,
        path: 'hjelpemidler',
      },
      {
        type: TemaType.INNSENDINGSYTELSE,
        innsendingsytelse: Innsendingsytelse.BILSTONAD,
        allowsAnke: true,
        path: 'bil',
      },
    ],
  },
  {
    type: TemaType.INNSENDINGSYTELSE,
    path: 'tilleggsstonader',
    innsendingsytelse: Innsendingsytelse.TILLEGGSSTONADER,
    allowsAnke: true,
  },
  {
    type: TemaType.EXTERNAL,
    title: { [Languages.nb]: 'Økonomisk sosialhjelp', [Languages.en]: 'Financial social assistance' },
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
    if (tema.type === TemaType.TEMA) {
      const kategori = tema.innsendingsytelser.find((k) => k.innsendingsytelse === innsendingsytelse);

      if (kategori !== undefined) {
        return `${tema.path}/${kategori.path}`;
      }
    }

    if (tema.type === TemaType.INNSENDINGSYTELSE) {
      return tema.path;
    }
  }

  return null;
};
