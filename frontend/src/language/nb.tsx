/* eslint-disable max-lines */
import { BodyShort, Link } from '@navikt/ds-react';
import React from 'react';
import { ExternalLink } from '../components/link/link';
import { displayBytes, displayFnr } from '../functions/display';
import { Utfall } from '../redux-api/case/anke/types';
import { Reason } from '../redux-api/case/klage/types';
import { CaseStatus } from '../redux-api/case/types';
import { TemaKey } from '../tema/tema';

export type Language = typeof nb;

export const nb = {
  fullmakt: {
    title: 'Klage på vegne av andre',
    description: 'Digital innsending av klage når du har fullmakt på vegne av andre.',
    help: {
      text: 'Slik gir du fullmakt til andre',
      url: 'https://www.nav.no/soknader/nb/person/diverse/fullmaktskjema',
    },
    loading: 'Sjekker fullmakt...',
  },
  inngang: {
    title_postfix: 'klage eller anke',
    guide_panel: {
      general_info: [
        <BodyShort key="1" spacing>
          Hvis du har fått et vedtak fra NAV og du er uenig i vedtaket, har du rett til å klage eller anke. Les mer om{' '}
          <ExternalLink
            href="https://www.nav.no/no/nav-og-samfunn/kontakt-nav/klage-ris-og-ros/klagerettigheter"
            inline
          >
            dine klagerettigheter
          </ExternalLink>
          .
        </BodyShort>,
      ].map((c, index) => <span key={index}>{c}</span>),
      login_info: [
        <BodyShort key="2" spacing>
          For at du skal få best mulig brukeropplevelse, anbefaler vi deg å <Link href="/oauth2/login">logge inn</Link>{' '}
          før du går videre.
        </BodyShort>,
        <ExternalLink key="external-id" href="https://www.norge.no/elektronisk-id" inline>
          Slik skaffer du deg elektronisk ID.
        </ExternalLink>,
      ],
    },
    hovedkategorier: {
      title: 'Klage eller anke på vedtak',
      chooseTema: 'Hvilket tema gjelder saken?',
    },
    kategorier: {
      title: 'Hvilken tjeneste eller ytelse gjelder saken?',
    },
    innsendingsvalg: {
      title: 'Hva vil du?',
      common: {
        read_more: [
          'Les mer om ',
          <ExternalLink
            key="klagerettigheter"
            href="https://www.nav.no/no/nav-og-samfunn/kontakt-nav/klage-ris-og-ros/klagerettigheter"
            inline
          >
            dine klagerettigheter på våre tema-sider
          </ExternalLink>,
          '.',
        ].map((c, index) => <span key={index}>{c}</span>),
        warning: 'Klagen eller anken din lagres i nettleseren inntil fanen lukkes, selv om du ikke er logget inn.',
        elektronisk_id: {
          text: 'Slik skaffer du deg elektronisk ID.',
          url: 'https://www.norge.no/elektronisk-id',
        },
      },
      klage: {
        title: 'Klage på vedtak fra NAV',
        description: {
          logged_in_digital: 'Du kan sende inn klagen og vedlegg digitalt her.',
          logged_in_post: 'Du kan fylle ut klagen her. Klagen må skrives ut, signeres og sendes via post.',
          logged_out_digital:
            'Hvis du logger deg inn kan du sende inn klagen og vedlegg digitalt her. Du kan fortsette uten å logge deg inn, men husk at du da må skrive ut klagen, signere den og sende den via post.',
          logged_out_post: 'Du kan fylle ut klagen her. Klagen må skrives ut, signeres og sendes via post.',
        },
      },
      anke: {
        title: 'Anke på vedtak fra NAV Klageinstans',
        description: {
          logged_in_digital: 'Du kan sende inn anken og vedlegg digitalt her.',
          logged_in_post: 'Du kan fylle ut anken her. Anken må skrives ut, signeres og sendes via post.',
          logged_out_digital: 'Du kan fylle ut anken her. Anken må skrives ut, signeres og sendes via post.',
          logged_out_post: 'Du kan fylle ut anken her. Anken må skrives ut, signeres og sendes via post.',
        },
      },
      fullmakt: {
        title_postfix: 'klage på vegne av andre',
        title: 'Klage på vegne av andre',
        who: 'Hvem klager du på vegne av?',
        nin: 'Fødselsnummer, D-nummer eller NPID for den du har fullmakt til (11 siffer)',
        search: 'Søk',
        no_fullmakt: (fnr: string, temaName: string) =>
          `Du har ikke fullmakt for person med personnummer ${displayFnr(fnr)} for området ${temaName}.`,
      },
      ettersendelse: {
        title: 'Ettersendelse til klage eller anke',
        description:
          'Har du klaget eller anket på et vedtak og ønsker å ettersende dokumentasjon, kan du trykke her for å få hjelp til å sende dokumentasjonen via post.',
      },
    },
  },
  ettersendelse: {
    title: 'Ettersende dokumentasjon på tidligere innsendt klage/anke',
    guide_text: [
      <BodyShort key="1" spacing>
        For å kunne ettersende dokumentasjon må du først skrive ut en forside som NAV har laget for deg. Denne skal
        ligge øverst. Følg oppskriften på forsiden.
      </BodyShort>,
      <BodyShort key="2">Send via post til:</BodyShort>,
    ],
    enhet: {
      radio_title: 'Har du mottatt brev fra NAV Klageinstans?',
      select_title: 'Hvilken enhet mottok du brevet fra?',
      none: 'Velg enhet',
    },
  },
  klageskjema_post: {
    common: {
      title_fragment: 'klage',
      steps: ['Begrunnelse', 'Oppsummering', 'Innsending'],
      page_title: 'Klage på vedtak',
    },
    has_attachments_label: 'Jeg skal sende med vedlegg.',
    send_by_post_text: 'Du må laste ned klagen din her, skrive den ut, signere den og sende den inn via post til NAV.',
    download: 'Last ned PDF',
    post_guidetext: 'Du kan fylle ut klagen her. Klagen må skrives ut, signeres og sendes via post.',
    should_log_in_digital:
      'Hvis du logger deg inn kan du sende inn klagen og vedlegg digitalt her. Du kan fortsette uten å logge deg inn, men husk at du da må skrive ut klagen, signere den og sende den via post.',
    logged_in_digital: 'Du kan sende inn klagen og vedlegg digitalt her.',
    summary: {
      title: 'Se over før du skriver ut',
    },
    innsending: {
      title: 'Hva gjør du nå?',
      steg: [
        'Skriv ut klagen. Ved utskrift kommer en forside som NAV har laget for deg. Denne skal ligge øverst. Følg oppskriften på forsiden.',
        'Signer forsiden og siste side i klagen.',
        'Legg ved vedleggene.',
        'Send via post til ',
      ],
    },
  },
  klageskjema: {
    common: {
      title_fragment: 'klage',
      page_title: 'Klage på vedtak',
      logged_out: {
        text: 'Du har blitt logget ut. For å fortsette trenger du bare å logge inn igjen.',
        log_in: 'Logg inn',
      },
      steps: ['Begrunnelse', 'Oppsummering', 'Kvittering'],
    },
    begrunnelse: {
      fullmakt: {
        label: 'Klage på vegne av:',
      },
      reasons: {
        title: 'Hva gjelder klagen? (valgfri)',
        not_specified: 'Ikke spesifisert.',
        texts: {
          [Reason.AVSLAG_PAA_SOKNAD]: 'Jeg har fått avslag på søknaden min',
          [Reason.FOR_LITE_UTBETALT]: 'Jeg har fått for lite utbetalt',
          [Reason.UENIG_I_NOE_ANNET]: 'Jeg er uenig i noe annet i vedtaket mitt',
          [Reason.UENIG_I_VEDTAK_OM_TILBAKEBETALING]: 'Jeg er uenig i vedtaket om tilbakebetaling',
        },
      },
      vedtak_date: {
        title: 'Vedtaksdato (valgfri)',
      },
      saksnummer: {
        title: 'Saksnummer (valgfri)',
        internalTitle: 'Saksnummer',
      },
      begrunnelse_text: {
        title: 'Hvorfor er du uenig?',
        placeholder: 'Skriv inn din begrunnelse her.',
        description:
          'Forklar med dine egne ord hva som gjør at du er uenig og hva du ønsker endret. Legg ved dokumenter som kan vise NAV hvorfor du er uenig.',
      },
      autosave: {
        popover: 'Vi lagrer endringene dine automatisk.',
        saving: 'Lagrer',
        saved: 'Lagret',
        failed: 'Klarte ikke lagre',
      },
      attachments: {
        clear_errors: 'Fjern feilmeldinger',
        title: 'Vedlegg',
        upload_button_text: 'Last opp nytt vedlegg',
        upload_error: ({ name, type, size }: File, reason = 'Ukjent årsak.') =>
          `Kunne ikke laste opp vedlegg "${name}" med type "${type}" på ${displayBytes(size)}. ${reason}`,
        description: 'Har du informasjon du ønsker å legge ved, laster du det opp her.',
        supported_types: [
          'Filtyper som støttes: ',
          <b key="png">PNG</b>,
          ', ',
          <b key="jpeg">JPEG</b>,
          ' og ',
          <b key="pdf">PDF</b>,
          '.',
        ].map((c, index) => <span key={index}>{c}</span>),
        size_limit:
          'Filstørrelsen kan ikke være større enn 8 MB, og total størrelse av alle vedlegg kan ikke være større enn 32 MB.',
      },
      attachments_preview: {
        delete_error: (name: string, id: string, reason = 'Ukjent årsak.') =>
          `Kunne ikke slette vedlegg "${name}" med ID "${id}". ${reason}`,
      },
      next_button: 'Gå videre',
      delete_title: 'Slett klagen og returner til hovedsiden',
    },
    summary: {
      title: 'Se over før du sender inn',
      submit_error: 'Klarte ikke sende inn klagen. Ukjent feil.',
      sections: {
        person: {
          title: <>Person&shy;opplysninger</>,
          info_from: 'Hentet fra Folkeregisteret og Kontakt- og reserverasjonsregisteret.',
        },
        case: {
          title: 'Opplysninger fra saken',
          vedtak: 'Vedtaksdato',
          no_date: 'Ingen dato satt',
          saksnummer: 'Saksnummer',
          not_specified: 'Ikke angitt',
          given_by_user: 'Oppgitt av bruker',
          from_system: 'Hentet fra internt system',
        },
        begrunnelse: {
          title: 'Begrunnelse i klagen din',
          what: 'Hva gjelder klagen?',
          why: 'Hvorfor er du uenig?',
          documents: 'Vedlagte dokumenter',
        },
      },
      next: (status: CaseStatus): string => (status === CaseStatus.DRAFT ? 'Send inn' : 'Se innsendt klage'),
      post_link: 'Last ned hvis du heller ønsker å sende via post',
    },
    kvittering: {
      title: 'Kvittering for innsendt klage',
      download: 'Se og last ned klagen din',
      sent: 'Sendt inn',
      general_info: {
        title: 'Nå er resten vårt ansvar',
        description:
          'Du trenger ikke gjøre noe mer. Vi tar kontakt med deg hvis det er noe vi lurer på eller hvis vi trenger flere opplysninger fra deg. Om det viser seg at du har glemt å sende inn noe dokumentasjon til saken din, så kan dette ettersendes ved å trykke på "Ettersende dokumentasjon på tidligere innsendt klage/anke" på ytelsen det gjelder.',
      },
      read_more: [
        'Du kan lese mer om hvordan vi behandler klagen din videre på våre ',
        <ExternalLink
          key="tema"
          href="https://www.nav.no/no/nav-og-samfunn/kontakt-nav/klage-ris-og-ros/klagerettigheter"
          inline
        >
          tema-sider om klage og anke
        </ExternalLink>,
        '.',
      ].map((c, index) => <span key={index}>{c}</span>),
      dine_saker: {
        title: 'Se dine saker på Ditt NAV',
        url: 'https://person.nav.no/mine-saker/',
      },
      loading: {
        title: 'Sender inn klage...',
        still_working: 'Jobber fortsatt...',
      },
    },
  },
  ankeskjema_post: {
    common: {
      title_fragment: 'Anke',
      steps: ['Begrunnelse', 'Oppsummering', 'Innsending'],
      page_title: 'Anke på vedtak',
    },
    has_attachments_label: 'Jeg skal sende med vedlegg.',
    send_by_post_text: 'Du må laste ned anken din her, skrive den ut, signere den og sende den inn via post til NAV.',
    download: 'Last ned PDF',
    post_guidetext: 'Du kan fylle ut anken her. Anken må skrives ut, signeres og sendes via post.',
    should_log_in_digital:
      'Hvis du logger deg inn kan du sende inn anken og vedlegg digitalt her. Du kan fortsette uten å logge deg inn, men husk at du da må skrive ut anken, signere den og sende den via post.',
    logged_in_digital: 'Du kan sende inn anken og vedlegg digitalt her.',
    summary: {
      title: 'Se over før du skriver ut',
    },
    innsending: {
      title: 'Hva gjør du nå?',
      steg: [
        'Skriv ut anken. Ved utskrift kommer en forside som NAV har laget for deg. Denne skal ligge øverst. Følg oppskriften på forsiden.',
        'Signer anken.',
        'Legg ved vedleggene.',
        'Send via post til ',
      ],
    },
  },
  ankeskjema: {
    common: {
      title_fragment: 'anke',
      page_title: 'Anke på vedtak',
      logged_out: {
        text: 'Du har blitt logget ut. For å fortsette trenger du bare å logge inn igjen.',
        log_in: 'Logg inn',
      },
      steps: ['Begrunnelse', 'Oppsummering', 'Kvittering'],
    },
    begrunnelse: {
      fullmakt: {
        label: 'Anke på vegne av:',
      },
      vedtak_date: {
        title: 'Klagens vedtaksdato',
      },
      saksnummer: {
        title: 'Saksnummer (valgfri)',
      },
      klageenhet: {
        title: 'Klageenhet',
        not_specified: 'Ingen enhet valgt',
      },
      begrunnelse_text: {
        title: 'Beskriv din anke',
        placeholder: 'Skriv inn din begrunnelse her.',
        description: 'Her kan du skrive inn din anke. Legg ved dokumenter som skal følge saken til Trygderetten.',
      },
      autosave: {
        popover: 'Vi lagrer endringene dine automatisk.',
        saving: 'Lagrer',
        saved: 'Lagret',
        failed: 'Klarte ikke lagre',
      },
      attachments: {
        title: 'Vedlegg',
        upload_button_text: 'Last opp nytt vedlegg',
        upload_error: ({ name, type, size }: File, reason = 'Ukjent årsak.') =>
          `Kunne ikke laste opp vedlegg "${name}" med type "${type}" på ${size} byte. ${reason}`,
        description: 'Har du informasjon du ønsker å legge ved, laster du det opp her.',
        supported_types: [
          'Filtyper som støttes: ',
          <b key="png">PNG</b>,
          ', ',
          <b key="jpeg">JPEG</b>,
          ' og ',
          <b key="pdf">PDF</b>,
          '.',
        ].map((c, index) => <span key={index}>{c}</span>),
        size_limit:
          'Filstørrelsen kan ikke være større enn 8 MB, og total størrelse av alle vedlegg kan ikke være større enn 32 MB.',
        clear_errors: 'Fjern feilmeldinger',
      },
      attachments_preview: {
        delete_error: (name: string, id: string, reason = 'Ukjent årsak.') =>
          `Kunne ikke slette vedlegg "${name}" med ID "${id}". ${reason}`,
      },
      next_button: 'Gå videre',
      delete_title: 'Slett anken og returner til hovedsiden',
    },
    summary: {
      title: 'Se over før du sender inn',
      submit_error: 'Klarte ikke sende inn anken. Ukjent feil.',
      sections: {
        person: {
          title: <>Person&shy;opplysninger</>,
          info_from: 'Hentet fra Folkeregisteret og Kontakt- og reserverasjonsregisteret.',
        },
        case: {
          title: 'Opplysninger fra saken',
          vedtak: 'Vedtaksdato fra NAV Klageinstans',
          no_date: 'Ingen dato satt',
          saksnummer: 'Saksnummer',
          not_specified: 'Ikke angitt',
          given_by_user: 'Oppgitt av bruker',
          from_system: 'Hentet fra internt system',
        },
        begrunnelse: {
          title: 'Begrunnelse i anken din',
          why: 'Beskrivelse i din anke',
          documents: 'Vedlagte dokumenter',
        },
      },
      back: 'Tilbake',
      next: (status: CaseStatus): string => (status === CaseStatus.DRAFT ? 'Last ned / skriv ut' : 'Se innsendt anke'),
      post_link: 'Last ned hvis du heller ønsker å sende via post',
    },
    kvittering: {
      title: 'Kvittering for innsendt anke',
      download: 'Se og last ned anken din',
      sent: 'Sendt inn',
      general_info: {
        title: 'Nå er resten vårt ansvar',
        description:
          'Du trenger ikke gjøre noe mer. Vi tar kontakt med deg hvis det er noe vi lurer på eller hvis vi trenger flere opplysninger fra deg. Om det viser seg at du har glemt å sende inn noe dokumentasjon til saken din, så kan dette ettersendes ved å trykke på "Ettersende dokumentasjon på tidligere innsendt klage/anke" på ytelsen det gjelder.',
      },
      read_more: [
        'Du kan lese mer om hvordan vi behandler anken din videre på våre ',
        <ExternalLink
          key="tema"
          href="https://www.nav.no/no/nav-og-samfunn/kontakt-nav/klage-ris-og-ros/klagerettigheter"
          inline
        >
          tema-sider om klage og anke
        </ExternalLink>,
        '.',
      ],
      dine_saker: {
        title: 'Se dine saker på Ditt NAV',
        url: 'https://person.nav.no/mine-saker/',
      },
      loading: {
        title: 'Sender inn anke...',
        still_working: 'Jobber fortsatt...',
      },
    },
  },
  klage_create: {
    invalid_tema: (tema = 'Ukjent') => `Ugyldig tema "${tema}".`,
    format_error: (tema: TemaKey, ytelse: string, saksnummer: string | null): string => {
      if (saksnummer === null) {
        return `Klarte ikke opprette klage med tema "${tema}" og tittel "${ytelse}".`;
      }

      return `Klarte ikke opprette klage med tema "${tema}", tittel "${ytelse}" og saksnummer "${saksnummer}".`;
    },
    create_error: 'Klarte ikke opprette klage',
    finne_fullmaktsgiver_error: (fnr: string) => `Klarte ikke finne fullmaktsgiver med fødselsnummer ${fnr}.`,
    creating: 'Oppretter klage...',
  },
  anke_create: {
    invalid_tema: (tema = 'Ukjent') => `Ugyldig tema "${tema}".`,
    format_error: (tema: TemaKey, ytelse: string, saksnummer: string | null): string => {
      if (saksnummer === null) {
        return `Klarte ikke opprette anke med tema "${tema}" og tittel "${ytelse}".`;
      }

      return `Klarte ikke opprette anke med tema "${tema}", tittel "${ytelse}" og saksnummer "${saksnummer}".`;
    },
    create_error: 'Klarte ikke opprette anke',
    finne_fullmaktsgiver_error: (fnr: string) => `Klarte ikke finne fullmaktsgiver med fødselsnummer ${fnr}.`,
    creating: 'Oppretter anke...',
  },
  user_loader: {
    loading_user: 'Laster bruker...',
    network_error: 'Kunne ikke laste brukeren, fordi nettleseren din ikke kan nå NAV. Har du fortsatt internett?',
    other_error: 'Kunne ikke laste brukeren, vennligst prøv igjen senere.',
    error_message: (message: string) => `Feilmelding: "${message}"`,
    log_in: 'Logg inn',
  },
  klage_loader: {
    loading_klage: 'Laster klage...',
    restoring: 'Gjenoppretter klage...',
    format_error: (klageId: string, error: Error) => `Klarte ikke hente klage med ID "${klageId}". ${error.message}`,
  },
  anke_loader: {
    loading_anke: 'Laster anke...',
    restoring: 'Gjenoppretter anke...',
    format_error: (ankeInternalSaksnummer: string, error: Error) =>
      `Klarte ikke hente anke med ID "${ankeInternalSaksnummer}". ${error.message}`,
  },
  landing_page: {
    checking_user: 'Sjekker bruker...',
  },
  not_found_page: {
    title: 'Finner ikke siden',
    go_back: 'Gå tilbake til startsiden',
  },
  utfall: {
    [Utfall.TRUKKET]: 'Trukket',
    [Utfall.RETUR]: 'Retur',
    [Utfall.OPPHEVET]: 'Opphevet',
    [Utfall.MEDHOLD]: 'Omgjort',
    [Utfall.DELVIS_MEDHOLD]: 'Delvis omgjort',
    [Utfall.OPPRETTHOLDT]: 'Stadfestet',
    [Utfall.UGUNST]: 'Omgjort',
    [Utfall.AVVIST]: 'Avvist',
  },
  kvittering: {
    see_estimate: [
      'Du kan se ',
      <ExternalLink key="saksbehandlingstid" href="https://www.nav.no/saksbehandlingstider" inline>
        forventet saksbehandlingstid for klage og anke
      </ExternalLink>,
      ' i egen oversikt.',
    ].map((c, index) => <span key={index}>{c}</span>),
  },
  error_messages: {
    TOO_LARGE: 'Filstørrelsen kan ikke være større enn 8 MB.',
    TOTAL_TOO_LARGE: 'Total filstørrelse kan ikke være større enn 32 MB.',
    ENCRYPTED: 'Vi mistenker at filen din er kryptert, den kan derfor ikke sendes med.',
    EMPTY: 'Du kan ikke sende med en tom fil.',
    VIRUS: 'Vi mistenker at filen din inneholder et virus, den kan derfor ikke sendes med.',
    FILE_COULD_NOT_BE_CONVERTED:
      'Du har prøvd å legge til et vedlegg med et format vi ikke støtter. Vedlegg er begrenset til PNG, JPEG, og PDF.',
    skjema: {
      title: 'Feil i skjema',
      fnr: 'Fødselsnummer er ikke gyldig.',
      fnr_dnr_or_npid: 'Ugyldig fødselsnummer, D-nummer eller NPID.',
      vedtak_date: 'Vedtaksdato må være en gyldig dato som ikke er i fremtiden, eller tom.',
      vedtak_date_required: 'Vedtaksdato må være en gyldig dato som ikke er i fremtiden.',
      fornavn: 'Du må fylle inn fornavn og mellomnavn.',
      etternavn: 'Du må fylle inn etternavn.',
      begrunnelse: 'Du må skrive en begrunnelse før du går videre.',
      enhet: 'Du må velge en enhet.',
    },
  },
  common: {
    logged_out: 'Du har blitt logget ut. For å fortsette trenger du bare å logge inn igjen.',
    log_in: 'Logg inn',
    retry: 'Prøv på nytt',
    generic_error: 'Noe gikk galt. Vennligst prøv igjen senere.',
    fnr_dnr_or_npid: 'Fødselsnummer, D-nummer eller NPID',
    fornavn: 'For- og mellomnavn',
    etternavn: 'Etternavn',
    address: 'Adresse',
    phone_number: 'Telefonnummer',
    download: 'Last ned / skriv ut',
    optional_suffix: ' (valgfri)',
    klage: 'Klage',
    anke: 'Anke',
    back: 'Tilbake',
    close_confirm: 'Er du sikker på at du vil lukke denne nettsiden?',
    last_changed: 'Sist endret',
    delete: 'Slett',
    cancel: 'Avbryt',
    yes: 'Ja',
    no: 'Nei',
    expires_in: (exp: string) => `Du vil bli logget ut ${exp}. For å fortsette trenger du bare logge inn igjen.`,
  },
  personalised: {
    draft_klager: {
      title: 'Påbegynte klager',
    },
    draft_anker: {
      title: 'Påbegynte anker',
      item_title: 'Påbegynt anke',
    },
    available_anker: {
      title: 'Avslåtte klager',
      klage_date: 'Klagens vedtaksdato',
    },
  },
};
