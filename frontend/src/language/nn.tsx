import { Link } from '@navikt/ds-react';
import { format } from 'date-fns';
import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { PRETTY_FORMAT } from '@app/components/date-picker/constants';
import { ExternalLink } from '@app/components/link/link';
import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { ErrorMessageKeys } from '@app/language/error-messages';
import { Translations } from '@app/language/nb';
import { CaseStatus, CaseType, Reason, getEttersendelsePath } from '@app/redux-api/case/types';

export const nn: Translations = {
  skjema: {
    steps: {
      [CaseType.KLAGE]: ['Grunngiving', 'Oppsummering', 'Innsending'],
      [CaseType.ANKE]: ['Grunngiving', 'Oppsummering', 'Innsending'],
      [CaseType.ETTERSENDELSE_KLAGE]: ['Ettersending', 'Oppsummering', 'Innsending'],
      [CaseType.ETTERSENDELSE_ANKE]: ['Ettersending', 'Oppsummering', 'Innsending'],
    },
    employer_info: {
      [CaseType.KLAGE]:
        'Dersom du er ein arbeidsgivar må du logge ut og sende klaga i posten. Du legg inn fødselsnummeret eller D-nummeret til den arbeidstakaren som vedtaket gjeld for, skriv ut klaga og signerer som arbeidsgivar.',
      [CaseType.ANKE]:
        'Dersom du er ein arbeidsgivar må du logge ut og sende anka i posten. Du legg inn fødselsnummeret eller D-nummeret til den arbeidstakaren som vedtaket gjeld for, skriv ut anka og signerer som arbeidsgivar.',
      [CaseType.ETTERSENDELSE_KLAGE]:
        'Dersom du er ein arbeidsgivar må du logge ut og legge inn fødselsnummeret eller D-nummeret til den arbeidstakaren som ettersendinga gjeld for, skriv ut framsida og signerer som arbeidsgivar.',
      [CaseType.ETTERSENDELSE_ANKE]:
        'Dersom du er ein arbeidsgivar må du logge ut og legge inn fødselsnummeret eller D-nummeret til den arbeidstakaren som ettersendinga gjeld for, skriv ut framsida og signerer som arbeidsgivar.',
    },
    common: {
      title_fragment: {
        [CaseType.KLAGE]: 'klage',
        [CaseType.ANKE]: 'anke',
        [CaseType.ETTERSENDELSE_KLAGE]: 'ettersending for klage',
        [CaseType.ETTERSENDELSE_ANKE]: 'ettersending for anke',
      },
      page_title: {
        [CaseType.KLAGE]: 'Klage på vedtak',
        [CaseType.ANKE]: 'Anke på vedtak',
        [CaseType.ETTERSENDELSE_KLAGE]: 'Ettersend dokumentasjon til klage',
        [CaseType.ETTERSENDELSE_ANKE]: 'Ettersend dokumentasjon til anke',
      },
    },
    begrunnelse: {
      autosave: {
        popover: 'Vi lagrar endringane dine automatisk.',
        saved: 'Sist lagra',
        failed: 'Klarte ikkje å lagre',
      },
      attachments: {
        clear_errors: 'Fjern feilmeldingar',
        title: 'Vedlegg',
        upload_button_text: 'Last opp nytt vedlegg',
        description: 'Har du informasjon du ønsker å legge ved, lastar du det opp her.',
        supported_types: [
          'Filtyper som støttast: ',
          <b key="png">PNG</b>,
          ', ',
          <b key="jpeg">JPEG</b>,
          ' og ',
          <b key="pdf">PDF</b>,
          '.',
        ].map((c, index) => <span key={index}>{c}</span>),
        size_limit:
          'Filstorleiken kan ikkje vere større enn 8 MB, og den total storleiken av alle vedlegg kan ikkje vere større enn 32 MB.',
      },
      saksnummer: {
        title: 'Saksnummer (valfritt)',
        internalTitle: 'Saksnummer',
        change: 'Endre',
      },
      reasons: {
        title: {
          [CaseType.KLAGE]: 'Kva gjeld klaga? (valfritt)',
        },
        texts: {
          [Reason.AVSLAG_PAA_SOKNAD]: 'Eg har fått avslag på søknaden min',
          [Reason.FOR_LITE_UTBETALT]: 'Eg har fått for lite utbetalt',
          [Reason.UENIG_I_NOE_ANNET]: 'Eg er ueinig i noko anna i vedtaket mitt',
          [Reason.UENIG_I_VEDTAK_OM_TILBAKEBETALING]: 'Eg er ueinig i vedtaket om tilbakebetaling',
        },
      },
      vedtak_date: {
        title: {
          [CaseType.KLAGE]: 'Vedtaksdato (valfritt)',
          [CaseType.ANKE]: 'Dato for klagevedtaket frå NAV Klageinstans',
          [CaseType.ETTERSENDELSE_KLAGE]: 'Vedtaksdato (valfritt)',
          [CaseType.ETTERSENDELSE_ANKE]: 'Dato for klagevedtaket frå NAV Klageinstans',
        },
      },
      klageenhet: {
        radio_title:
          'Har du motteke eit brev frå NAV Klageinstans eller ei anna eining i NAV om at saka di er sendt til NAV Klageinstans?',
        none: 'Inga eining valt',
        title_required: 'Kva eining mottok du brevet frå?',
        title_optional: 'Kva eining i NAV Klageinstans er klaga hos?',
        title: {
          [CaseType.KLAGE]: undefined,
          [CaseType.ANKE]: 'Eining oppgitt i klagevedtaket under informasjon om retten til å anke',
          [CaseType.ETTERSENDELSE_KLAGE]: 'Kva eining i NAV Klageinstans er klaga hos?',
          [CaseType.ETTERSENDELSE_ANKE]: 'Eining oppgitt i klagevedtaket under informasjon om retten til å anke',
        },
        not_received: 'Ikkje motteke brev',
      },
      begrunnelse_text: {
        title: {
          [CaseType.KLAGE]: 'Kvifor er du ueinig?',
          [CaseType.ANKE]: 'Kvifor er du ueinig i klagevedtaket?',
          [CaseType.ETTERSENDELSE_KLAGE]: 'Har du noko å leggje til? (valfritt)',
          [CaseType.ETTERSENDELSE_ANKE]: 'Har du noko å leggje til? (valfritt)',
        },
        description: {
          [CaseType.KLAGE]:
            'Forklar med dine eigne ord kva som gjer at du er ueinig og kva du ønskjer vert endra. Legg ved dokument som kan vise NAV kvifor du er ueinig.',
          [CaseType.ANKE]:
            'Forklar med dine eigne ord kva som gjer at du er ueinig i klagevedtaket og kva du ønskjer vert endra. Legg ved eventuelle dokument du ønskjer skal følgje saka di til Trygderetten.',
          [CaseType.ETTERSENDELSE_KLAGE]: 'Om du har noko du ønskjer å leggje til, kan du skrive det her.',
          [CaseType.ETTERSENDELSE_ANKE]: 'Om du har noko du ønskjer å leggje til, kan du skrive det her.',
        },
        placeholder: {
          [CaseType.KLAGE]: 'Forklar her',
          [CaseType.ANKE]: 'Forklar her',
          [CaseType.ETTERSENDELSE_KLAGE]: 'Skriv her',
          [CaseType.ETTERSENDELSE_ANKE]: 'Skriv her',
        },
      },
      next_button: 'Gå vidare',
      delete_title: {
        [CaseType.KLAGE]: 'Slett klaga og gå tilbake til hovudsida',
        [CaseType.ANKE]: 'Slett anka og gå tilbake til hovudsida',
        [CaseType.ETTERSENDELSE_KLAGE]: 'Slett ettersendinga og gå tilbake til hovudsida',
        [CaseType.ETTERSENDELSE_ANKE]: 'Slett ettersendinga og gå tilbake til hovudsida',
      },
    },
    summary: {
      title: 'Sjå over før du sender inn',
      submit_error: {
        [CaseType.KLAGE]: 'Klarte ikkje å sende inn klaga. Ukjent feil.',
        [CaseType.ANKE]: 'Klarte ikkje å sende inn anka. Ukjent feil.',
        [CaseType.ETTERSENDELSE_KLAGE]: 'Klarte ikkje å sende inn ettersendinga. Ukjent feil.',
        [CaseType.ETTERSENDELSE_ANKE]: 'Klarte ikkje å sende inn ettersendinga. Ukjent feil.',
      },
      sections: {
        person: {
          title: <>Person&shy;opplysningar</>,
          info_from: 'Henta frå Folkeregisteret og Kontakt- og reserverasjonsregisteret.',
        },
        case: {
          title: 'Opplysningar frå saka',
          vedtak: {
            [CaseType.KLAGE]: 'Vedtaksdato',
            [CaseType.ANKE]: 'Dato for klagevedtaket frå NAV Klageinstans',
            [CaseType.ETTERSENDELSE_KLAGE]: 'Vedtaksdato',
            [CaseType.ETTERSENDELSE_ANKE]: 'Dato for klagevedtaket frå NAV Klageinstans',
          },
          saksnummer: 'Saksnummer',
          from_system: 'Henta frå internt system',
          klageenhet: 'Eining oppgitt i klagevedtaket under informasjon om retten til å anke',
        },
        begrunnelse: {
          title: {
            [CaseType.KLAGE]: 'Grunngiving i klaga di',
            [CaseType.ANKE]: 'Grunngiving i anka di',
            [CaseType.ETTERSENDELSE_KLAGE]: 'Ettersendinga di',
            [CaseType.ETTERSENDELSE_ANKE]: 'Ettersendinga di',
          },
          what: {
            [CaseType.KLAGE]: 'Kva gjeld klaga?',
            [CaseType.ANKE]: 'Kva gjeld anka?',
            [CaseType.ETTERSENDELSE_KLAGE]: 'Kva gjeld ettersendinga?',
            [CaseType.ETTERSENDELSE_ANKE]: 'Kva gjeld ettersendinga?',
          },
          why: {
            [CaseType.KLAGE]: 'Kvifor er du ueinig?',
            [CaseType.ANKE]: 'Kvifor er du ueinig i klagevedtaket?',
            [CaseType.ETTERSENDELSE_KLAGE]: 'Har du noko å leggje til?',
            [CaseType.ETTERSENDELSE_ANKE]: 'Har du noko å leggje til?',
          },
          documents: 'Vedlagte dokument',
        },
      },
      next: (status: CaseStatus, type: CaseType): string =>
        status === CaseStatus.DRAFT ? 'Send inn' : `Sjå innsendt ${CASE_TYPE_NAMES_LOWER_CASE_NN[type]}`,
      post_link: 'Last ned om du heller ønskjer å sende i posten',
      documents: 'Vedlagde dokument',
    },
    kvittering: {
      title: {
        [CaseType.KLAGE]: 'Kvittering for innsendt klage',
        [CaseType.ANKE]: 'Kvittering for innsendt anke',
        [CaseType.ETTERSENDELSE_KLAGE]: 'Kvittering for ettersending til klage',
        [CaseType.ETTERSENDELSE_ANKE]: 'Kvittering for ettersending til anke',
      },
      download: {
        [CaseType.KLAGE]: 'Sjå og last ned klaga di',
        [CaseType.ANKE]: 'Sjå og last ned anka di',
        [CaseType.ETTERSENDELSE_KLAGE]: 'Sjå og last ned den ettersendte dokumentasjonen din',
        [CaseType.ETTERSENDELSE_ANKE]: 'Sjå og last ned den ettersendte dokumentasjonen din',
      },
      sent: 'Sendt inn',
      general_info: {
        title: 'No er resten vårt ansvar',
        description: (type: CaseType, ytelse: Innsendingsytelse) => [
          'Du treng ikkje å gjere noko meir. Vi tek kontakt med deg om det er noko vi lurer på, eller om vi treng fleire opplysningar frå deg. Om du har gløymt å sende inn dokumentasjon til saka di, kan du framleis ',
          <Link key="internal" to={`/nb/${getEttersendelsePath(type)}/${ytelse}`} as={ReactRouterLink}>
            ettersende dokumentasjon
          </Link>,
          '. Kjem du på noko du har gløymt seinare, kan du gå via ',
          <ExternalLink key="external" href="https://www.nav.no/klage/nn" inline openInSameWindow>
            nav.no/klage
          </ExternalLink>,
          ' ved å trykke på "Ettersend dokumentasjon" for den saka det gjeld.',
        ],
      },
      read_more: [
        `Du kan lese meir om korleis vi behandlar saka di vidare på våre `,
        <ExternalLink key="tema" href="https://www.nav.no/klagerettigheter/nn" inline>
          temasider om klage og anke
        </ExternalLink>,
        '.',
      ].map((c, index) => <span key={index}>{c}</span>),
      loading: {
        title: {
          [CaseType.KLAGE]: 'Sender inn klaga ...',
          [CaseType.ANKE]: 'Sender inn anka ...',
          [CaseType.ETTERSENDELSE_KLAGE]: 'Sender inn dokumentasjon ...',
          [CaseType.ETTERSENDELSE_ANKE]: 'Sender inn dokumentasjon ...',
        },
        still_working: 'Jobbar framleis ...',
      },
      see_estimate: [
        'Du kan sjå ',
        <ExternalLink key="saksbehandlingstid" href="https://www.nav.no/saksbehandlingstider/nn" inline>
          forventa saksbehandlingstid for klage og anke
        </ExternalLink>,
        ' i eigen oversikt.',
      ].map((c, index) => <span key={index}>{c}</span>),
      dine_saker: {
        title: 'Sjå sakane dine på Min side',
        url: 'https://www.nav.no/dokumentarkiv/nn/',
      },
    },
  },
  innsending: {
    title: 'Kva gjer du no?',
    steg: {
      [CaseType.KLAGE]: [
        'Skriv ut klaga. Ved utskrift kjem det med ei framside som NAV har laga for deg. Denne skal ligge øvst. Følg oppskrifta på framsida.',
        'Skriv under på framsida og siste side i klaga.',
        'Legg ved vedlegga.',
        'Send i posten til ',
      ],
      [CaseType.ANKE]: [
        'Skriv ut anka. Ved utskrift kjem det med ei framside som NAV har laga for deg. Denne skal ligge øvst. Følg oppskrifta på framsida.',
        'Skriv under på framsida og siste side i anka.',
        'Legg ved vedlegga.',
        'Send i posten til ',
      ],
      [CaseType.ETTERSENDELSE_KLAGE]: [
        'Skriv ut dokumentasjonen. Ved utskrift kjem det med ei framside som NAV har laga for deg. Denne skal ligge øvst. Følg oppskrifta på framsida.',
        'Skriv under på framsida og siste side i dokumentasjonen.',
        'Legg ved vedlegga.',
        'Send i posten til ',
      ],
      [CaseType.ETTERSENDELSE_ANKE]: [
        'Skriv ut dokumentasjonen. Ved utskrift kjem det med ei framside som NAV har laga for deg. Denne skal ligge øvst. Følg oppskrifta på framsida.',
        'Skriv under på framsida og siste side i dokumentasjonen.',
        'Legg ved vedlegga.',
        'Send i posten til ',
      ],
    },
    steg_simple: {
      [CaseType.KLAGE]: ['Skriv ut klaga.', 'Skriv under klaga.', 'Legg ved vedlegga.', 'Send i posten til '],
      [CaseType.ANKE]: ['Skriv ut anka.', 'Skriv under anka.', 'Legg ved vedlegga.', 'Send i posten til '],
      [CaseType.ETTERSENDELSE_KLAGE]: [
        'Skriv ut dokumentasjonen.',
        'Skriv under dokumentasjonen.',
        'Legg ved vedlegga.',
        'Send i posten til ',
      ],
      [CaseType.ETTERSENDELSE_ANKE]: [
        'Skriv ut dokumentasjonen.',
        'Skriv under dokumentasjonen.',
        'Legg ved vedlegga.',
        'Send i posten til ',
      ],
    },
  },
  post: {
    should_log_in_digital: {
      [CaseType.KLAGE]:
        'Dersom du loggar deg inn kan du sende inn klaga og vedlegg digitalt her. Du kan halde fram utan å logge deg inn, men hugs at du då må skrive ut klaga, signere ho og sende ho i posten.',
      [CaseType.ANKE]:
        'Dersom du loggar deg inn kan du sende inn anka og vedlegg digitalt her. Du kan halde fram utan å logge deg inn, men hugs at du då må skrive ut anka, signere ho og sende ho i posten.',
      [CaseType.ETTERSENDELSE_KLAGE]:
        'Dersom du loggar deg inn kan du ettersende dokumentasjon digitalt her. Du kan halde fram utan å logge deg inn, men hugs at du då må skrive ut dokumentasjonen, signere ho og sende ho i posten.',
      [CaseType.ETTERSENDELSE_ANKE]:
        'Dersom du loggar deg inn kan du ettersende dokumentasjon digitalt her. Du kan halde fram utan å logge deg inn, men hugs at du då må skrive ut dokumentasjonen, signere ho og sende ho i posten.',
    },
    employer_info: {
      [CaseType.KLAGE]:
        'Som arbeidsgivar må du sende klaga i posten. Du legg inn fødselsnummeret eller D-nummeret til den arbeidstakaren som vedtaket gjeld for, skriv ut klaga og signerer som arbeidsgivar.',
      [CaseType.ANKE]:
        'Som arbeidsgivar må du sende anka i posten. Du legg inn fødselsnummeret eller D-nummeret til den arbeidstakaren som vedtaket gjeld for, skriv ut anka og signerer som arbeidsgivar.',
      [CaseType.ETTERSENDELSE_KLAGE]:
        'Som arbeidsgivar må du sende dokumentasjonen i posten. Du legg inn fødselsnummeret eller D-nummeret til den arbeidstakaren som vedtaket gjeld for, skriv ut dokumentasjonen og signerer som arbeidsgivar.',
      [CaseType.ETTERSENDELSE_ANKE]:
        'Som arbeidsgivar må du sende dokumentasjonen i posten. Du legg inn fødselsnummeret eller D-nummeret til den arbeidstakaren som vedtaket gjeld for, skriv ut dokumentasjonen og signerer som arbeidsgivar.',
    },
  },
  user_loader: {
    loading_user: 'Lastar...',
  },
  case_loader: {
    loading: 'Lastar...',
    format_error: (id: string, error: Error) => `Klarte ikkje hente sak med ID "${id}". ${error.message}`,
  },
  not_found_page: {
    title: 'Finn ikkje sida',
    go_back: 'Gå tilbake til nav.no/klage',
  },
  error_messages: {
    [ErrorMessageKeys.MAX_UPLOAD_SIZE]: 'Filstorleiken kan ikkje vere større enn 8 MB.',
    [ErrorMessageKeys.TOO_LARGE]: 'Filstorleiken kan ikkje vere større enn 8 MB.',
    [ErrorMessageKeys.TOTAL_TOO_LARGE]: 'Total filstorleik kan ikkje vere større enn 32 MB.',
    [ErrorMessageKeys.ENCRYPTED]: 'Vi mistenker at fila di er kryptert, den kan derfor ikkje sendast inn.',
    [ErrorMessageKeys.EMPTY]: 'Du kan ikkje sende inn ei tom fil.',
    [ErrorMessageKeys.VIRUS]: 'Vi mistenker at fila di inneheld eit virus, den kan derfor ikkje sendast inn.',
    [ErrorMessageKeys.FILE_COULD_NOT_BE_CONVERTED]:
      'Du har prøvd å legge til eit vedlegg med eit format vi ikkje støttar. Vedlegg er avgrensa til PNG, JPEG og PDF.',
    skjema: {
      title: 'Feil i skjema',
      fnr_dnr_or_npid: 'Du må fylle inn eit gyldig fødselsnummer, D-nummer eller NPID.',
      vedtak_date:
        'Du må enten la feltet stå tomt, eller fylle inn ein dato som er ein gyldig dato, og som ikkje er i framtida.',
      vedtak_date_required: 'Du må fylle inn ein gyldig dato som ikkje er i framtida.',
      fornavn: 'Du må fylle inn fornamn og mellomnamn.',
      etternavn: 'Du må fylle inn etternamn.',
      begrunnelse: 'Du må skrive ei grunngiving før du går vidare.',
      case_is_at_ka: 'Du må velje om du har motteke brev.',
      enhet: 'Du må velje ein enhet.',
      vedleggEllerFritekstLoggedIn: 'Du må laste opp minst eitt vedlegg eller skrive ei grunngiving før du går vidare.',
      vedleggEllerFritekstLoggedOut:
        'Du må enten velje at du skal sende med vedlegg eller skrive ei grunngiving før du går vidare.',
    },
    date: {
      invalid_format: 'Du må velje ein gyldig dato.',
      invalid_range: (from: Date, to: Date) =>
        `Du må velje ein dato som er mellom ${format(from, PRETTY_FORMAT)} og ${format(to, PRETTY_FORMAT)}`,
    },
    create_error: {
      [CaseType.KLAGE]: 'Klarte ikkje å opprette klage',
      [CaseType.ANKE]: 'Klarte ikkje å opprette anke',
      [CaseType.ETTERSENDELSE_KLAGE]: 'Klarte ikkje å opprette ettersending',
      [CaseType.ETTERSENDELSE_ANKE]: 'Klarte ikkje å opprette ettersending',
    },
  },
  common: {
    next_button: 'Gå vidare',
    loading: 'Lastar...',
    logged_out: 'Du har blitt logga ut. For å halde fram må du logge inn igjen.',
    log_in: 'Logg inn',
    generic_error: 'Noko gjekk gale. Ver venleg og prøv igjen seinare.',
    fnr_dnr_or_npid: 'Fødselsnummer, D-nummer eller NPID',
    fornavn: 'Fornamn og mellomnamn',
    etternavn: 'Etternamn',
    download: 'Last ned / skriv ut',
    back: 'Tilbake',
    last_changed: 'Sist endra',
    delete: 'Slett',
    cancel: 'Avbryt',
    yes: 'Ja',
    no: 'Nei',
    expires_in: (exp: string) => `Du vil bli logga ut ${exp}. For å halde fram må du berre logge inn igjen.`,
    has_attachments_label: 'Eg skal sende med vedlegg.',
    not_specified: 'Ikkje spesifisert',
  },
};

const CASE_TYPE_NAMES_LOWER_CASE_NN = {
  [CaseType.KLAGE]: 'klage',
  [CaseType.ANKE]: 'anke',
  [CaseType.ETTERSENDELSE_KLAGE]: 'ettersending for klage',
  [CaseType.ETTERSENDELSE_ANKE]: 'ettersending for anke',
};
