/* eslint-disable max-lines */
import React from 'react';
import { displayBytes, displayFnr } from '../functions/display';
import { ExternalLink } from '../link/link';
import { Utfall } from '../redux-api/case/available-anke/types';
import { Reason } from '../redux-api/case/klage/types';
import { CaseStatus } from '../redux-api/case/types';
import { TemaKey } from '../tema/tema';

export type Language = typeof nb;

export const nb = {
  inngang: {
    title_postfix: 'klage eller anke',
    hovedkategorier: {
      title: 'Klage eller anke på vedtak',
      description: [
        'Hvis du har fått et vedtak fra NAV og du er uenig i vedtaket, har du rett til å klage. Start med å velge hvilket tema saken gjelder. Les mer om ',
        <ExternalLink
          key="klagerettigheter"
          href="https://www.nav.no/no/nav-og-samfunn/kontakt-nav/klage-ris-og-ros/klagerettigheter"
          inline
        >
          dine klagerettigheter
        </ExternalLink>,
        '.',
      ].map((c, index) => <span key={index}>{c}</span>),
      chooseTema: 'Velg tema',
    },
    skjemaHistorikk: {
      ankemuligheterTitle: 'Dine ankemuligheter',
    },
    kategorier: {
      title: 'Hvilken tjeneste eller ytelse gjelder det?',
    },
    innsendingsvalg: {
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
        estimate: [
          'Du kan se ',
          <ExternalLink
            key="saksbehandlingstid"
            href="https://www.nav.no/no/nav-og-samfunn/om-nav/saksbehandlingstider-i-nav/relatert-informasjon/klage-og-anke"
            inline
          >
            forventet saksbehandlingstid for klage og anke
          </ExternalLink>,
          ' i egen oversikt.',
        ].map((c, index) => <span key={index}>{c}</span>),
      },
      digital: {
        cards: {
          digital_klage: {
            title: 'Klage digitalt',
            title_resume: 'Klage digitalt (påbegynt)',
            description: 'For å sende inn digitalt må du logge inn med elektronisk ID.',
          },
          digital_anke: {
            title: 'Anke digitalt',
            title_resume: 'Anke digitalt (påbegynt)',
            description: (date: string, utfall: string) =>
              `Anke på vedtak av ${date} med utfall ${utfall.toLowerCase()}.`,
          },
          post: {
            title: 'Klage via post',
            description: 'Klageskjema som sendes inn via post. Også for deg som skal klage på vegne av andre.',
          },
          anke: {
            title: 'Innsending av anke',
            description: 'For å sende inn en anke fyller du ut et skjema som sendes via post.',
          },
          fullmakt: {
            title: 'Klage på vegne av andre',
            description: 'Digital innsending av klage når du har fullmakt på vegne av andre.',
          },
        },
        elektronisk_id: {
          text: 'Slik skaffer du deg elektronisk ID',
          url: 'https://www.norge.no/elektronisk-id',
        },
        fullmakt_help: {
          text: 'Slik gir du fullmakt til andre',
          url: 'https://www.nav.no/soknader/nb/person/diverse/fullmaktskjema',
        },
      },
      post: {
        title: 'Innsending via post',
        description: `Klage eller anke på denne tjenesten krever at du må du sende inn via post. Veiviseren hjelper
                deg med utfylling av en førsteside og klageskjema. Dette må du skrive ut og sende inn til den
                adressen som står på førstesiden, sammen med kopi av eventuelle andre dokumenter eller
                kvitteringer.`,
        cards: {
          post: {
            title: 'Skjema for klager',
            description: 'Dette velger du når du skal klage på et vedtak du har fått fra NAV.',
          },
          anke: {
            title: 'Skjema for anke',
            description: `Dette velger du hvis du tidligere har sendt inn en klage og ønsker å
                        anke til Trygderetten.`,
          },
        },
      },
      fullmakt: {
        title_postfix: 'klage på vegne av andre',
        title: 'Klage på vegne av andre',
        who: 'Hvem klager du på vegne av?',
        nin: 'Fødselsnummer for den du har fullmakt til (11 siffer)',
        invalid_nin: 'Ugyldig fødselsnummer',
        search: 'Søk',
        no_fullmakt: (fnr: string, temaName: string) =>
          `Du har ikke fullmakt for person med personnummer ${displayFnr(fnr)} for området ${temaName}.`,
      },
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
        title: 'Hva er du uenig i? (valgfri)',
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
        begrunnelse_mangler: 'Du må skrive en begrunnelse før du går videre.',
        error_empty: 'Du må skrive en begrunnelse før du går videre.',
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
    },
    summary: {
      title: 'Se over før du sender inn',
      submit_error: 'Klarte ikke sende inn klagen. Ukjent feil.',
      sections: {
        person: {
          title: <>Person&shy;opplysninger</>,
          info_from: 'Hentet fra Folkeregisteret og Kontakt- og reserverasjonsregisteret.',
          given_name: 'For- og mellomnavn',
          surname: 'Etternavn',
          nin: 'Fødselsnummer',
          phone: 'Telefonnummer',
          address: 'Adresse',
          change_name_address: {
            text: 'Endre navn eller adresse (Folkeregisteret)',
            url: 'https://www.skatteetaten.no/person/folkeregister/',
          },
          change_phone: {
            text: 'Endre telefonnummer (Kontakt- og reservasjonsregisteret)',
            url: 'https://brukerprofil.difi.no/minprofil',
          },
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
          title: 'Begrunnelse i din klage',
          what: 'Hva er du uenig i?',
          why: 'Hvorfor er du uenig?',
          documents: 'Vedlagte dokumenter',
        },
      },
      back: 'Tilbake',
      next: (status: CaseStatus): string => (status === CaseStatus.DRAFT ? 'Send inn' : 'Se innsendt klage'),
    },
    kvittering: {
      title: 'Kvittering for innsendt klage',
      download: 'Se og last ned klagen din',
      sent: 'Sendt inn',
      general_info: {
        title: 'Nå er resten vårt ansvar',
        description:
          'Du trenger ikke gjøre noe mer, vi tar kontakt med deg hvis det er noe vi lurer på eller hvis vi trenger flere opplysninger fra deg.',
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
      see_estimate: [
        'Du kan se ',
        <ExternalLink
          key="saksbehandlingstid"
          href="https://www.nav.no/no/nav-og-samfunn/om-nav/saksbehandlingstider-i-nav/relatert-informasjon/klage-og-anke"
          inline
        >
          forventet saksbehandlingstid for klage og anke
        </ExternalLink>,
        ' i egen oversikt.',
      ].map((c, index) => <span key={index}>{c}</span>),
      dine_saker: 'Se dine saker på DITT NAV',
      loading: {
        title: 'Sender inn klage...',
        still_working: 'Jobber fortsatt...',
      },
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
      begrunnelse_text: {
        title: 'Beskriv din anke',
        placeholder: 'Skriv inn din begrunnelse her.',
        description: 'Her kan du skrive inn din anke. Legg ved dokumenter som skal følge saken til Trygderetten.',
        begrunnelse_mangler: 'Du må skrive en begrunnelse før du går videre.',
        error_empty: 'Du må skrive en begrunnelse før du går videre.',
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
    },
    summary: {
      title: 'Se over før du sender inn',
      submit_error: 'Klarte ikke sende inn anken. Ukjent feil.',
      sections: {
        person: {
          title: <>Person&shy;opplysninger</>,
          info_from: 'Hentet fra Folkeregisteret og Kontakt- og reserverasjonsregisteret.',
          given_name: 'For- og mellomnavn',
          surname: 'Etternavn',
          nin: 'Fødselsnummer',
          phone: 'Telefonnummer',
          address: 'Adresse',
          change_name_address: {
            text: 'Endre navn eller adresse (Folkeregisteret)',
            url: 'https://www.skatteetaten.no/person/folkeregister/',
          },
          change_phone: {
            text: 'Endre telefonnummer (Kontakt- og reservasjonsregisteret)',
            url: 'https://brukerprofil.difi.no/minprofil',
          },
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
          title: 'Begrunnelse i din anke',
          why: 'Beskrivelse i din anke',
          documents: 'Vedlagte dokumenter',
        },
      },
      back: 'Tilbake',
      next: (status: CaseStatus): string => (status === CaseStatus.DRAFT ? 'Send inn' : 'Se innsendt anke'),
    },
    kvittering: {
      title: 'Kvittering for innsendt anke',
      download: 'Se og last ned anken din',
      sent: 'Sendt inn',
      general_info: {
        title: 'Nå er resten vårt ansvar',
        description:
          'Du trenger ikke gjøre noe mer, vi tar kontakt med deg hvis det er noe vi lurer på eller hvis vi trenger flere opplysninger fra deg.',
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
      see_estimate: [
        'Du kan se ',
        <ExternalLink
          key="saksbehandlingstid"
          href="https://www.nav.no/no/nav-og-samfunn/om-nav/saksbehandlingstider-i-nav/relatert-informasjon/klage-og-anke"
          inline
        >
          forventet saksbehandlingstid for klage og anke
        </ExternalLink>,
        ' i egen oversikt.',
      ].map((c, index) => <span key={index}>{c}</span>),
      dine_saker: 'Se dine saker på DITT NAV',
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
  fullmakt: {
    loading: 'Sjekker fullmakt...',
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
  errorMessages: {
    TOO_LARGE: 'Filstørrelsen kan ikke være større enn 8 MB.',
    TOTAL_TOO_LARGE: 'Total filstørrelse kan ikke være større enn 32 MB.',
    ENCRYPTED: 'Vi mistenker at filen din er kryptert, den kan derfor ikke sendes med.',
    EMPTY: 'Du kan ikke sende med en tom fil.',
    VIRUS: 'Vi mistenker at filen din inneholder et virus, den kan derfor ikke sendes med.',
    FILE_COULD_NOT_BE_CONVERTED:
      'Du har prøvd å legge til et vedlegg med et format vi ikke støtter. Vedlegg er begrenset til PNG, JPEG, og PDF.',
  },
  common: {
    logged_out: 'Du har blitt logget ut. For å fortsette trenger du bare å logge inn igjen.',
    log_in: 'Logg inn',
    retry: 'Prøv på nytt',
    generic_error: 'Noe gikk galt. Vennligst prøv igjen senere.',
  },
};
