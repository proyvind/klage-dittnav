/* eslint-disable max-lines */
import { BodyShort, Link } from '@navikt/ds-react';
import React from 'react';
import { ExternalLink } from '@app/components/link/link';
import { displayBytes } from '@app/functions/display';
import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { ErrorMessageKeys } from '@app/language/error-messages';
import { Utfall } from '@app/redux-api/case/anke/types';
import { Reason } from '@app/redux-api/case/klage/types';
import { CaseStatus } from '@app/redux-api/case/types';
import { Language } from './nb';

export const en: Language = {
  inngang: {
    title_postfix: 'complain or appeal',
    guide_panel: {
      general_info: [
        <BodyShort key="1" spacing>
          You have a right to complain if you have received a decision from NAV and disagree with the decision. Read
          more about{' '}
          <ExternalLink href="https://www.nav.no/en/home/rules-and-regulations/appeals" inline>
            your right to complain
          </ExternalLink>
          .
        </BodyShort>,
      ].map((c, index) => <span key={index}>{c}</span>),
      login_info: [
        <BodyShort key="2" spacing>
          To get the best possible user experience, we recommend that you <Link href="/oauth2/login">log in</Link>{' '}
          before you proceed.{' '}
          <ExternalLink href="https://www.norge.no/en/electronic-id" inline>
            How to get an electronic ID.
          </ExternalLink>
        </BodyShort>,
      ],
    },
    hovedkategorier: {
      title: 'Complain or appeal against decision',
      chooseInnsendingsytelse: 'Select topic',
    },
    kategorier: {
      title: 'Which service or benefit is applicable?',
    },
    innsendingsvalg: {
      title: 'What do you want?',
      common: {
        read_more: [
          'Read more about ',
          <ExternalLink key="klagerettigheter" href="https://www.nav.no/en/home/rules-and-regulations/appeals" inline>
            your right to complain on our topic pages
          </ExternalLink>,
          '.',
        ].map((c, index) => <span key={index}>{c}</span>),
        warning:
          'Your complaint or appeal may be stored in the browser until the tab is closed, even if you are not logged in.',
        elektronisk_id: {
          text: 'How to get an electronic ID.',
          url: 'https://www.norge.no/en/digital-citizen/electronic-id',
        },
      },
      klage: {
        title: 'Complain on decision from NAV',
        description: {
          logged_in_digital: 'You can send your complaint and attachments digitally here.',
          logged_in_post: 'Here you can fill out a complaint form. It has to be signed, printed, and sent by post.',
          logged_out_digital:
            'If you log in, you will be able to send the complaint and attachments digitally. You can continue without logging in, but you will have to print your complaint, sign it, and send it by post.',
          logged_out_post: 'Here you can fill out a complaint form. It has to be signed, printed, and sent by post.',
        },
      },
      anke: {
        title: 'Appeal on decision from NAV Klageinstans',
        description: {
          logged_in_digital: 'You can send your appeal and attachments digitally here.',
          logged_in_post: 'Here you can fill out an appeal form. It has to be signed, printed, and sent by post.',
          logged_out_digital:
            'If you log in, you will be able to send the appeal and attachments digitally. You can continue without logging in, but you will have to print your appeal, sign it, and send it by post.',
          logged_out_post: 'Here you can fill out an appeal form. It has to be signed, printed, and sent by post.',
        },
      },
      ettersendelse: {
        title: 'Submit additional documentation to a complaint or appeal',
        description:
          'If you have complained or appealed against a decision, and you wish to submit additional documentation or send in new/changed information regarding your case, click here to get help with submitting it via post.',
      },
    },
  },
  ettersendelse: {
    title: 'Submit additional documentation to a complaint or appeal',
    guide_text: [
      <BodyShort key="1" spacing>
        To submit additional documentation, first you have to print a cover page that NAV has generated for you. Put
        this on top of the documentation. Follow the instructions on the cover page.
      </BodyShort>,
      <BodyShort key="2" spacing>
        Send by post to:
      </BodyShort>,
    ],
    enhet: {
      radio_title: 'Have you received a letter from NAV Klageinstans?',
      select_title: 'Which NAV office did you receive the letter from?',
      none: 'Select office',
    },
  },
  klageskjema_post: {
    common: {
      title_fragment: 'complain',
      steps: ['Reason', 'Summary', 'Sending'],
      page_title: 'Complain against decision',
    },
    has_attachments_label: 'I will include attachments.',
    send_by_post_text:
      'You must download your complaint form and send it to the address listed on the cover page together with a copy of any other documents or receipts.',
    download: 'Download PDF',
    post_guidetext: 'Here you can fill out a complaint form. It has to be signed, printed, and sent by post.',
    should_log_in_digital:
      'If you log in, you will be able to send the complaint and attachments digitally. You can continue without logging in, but you will have to print your complaint, sign it, and send it by post.',
    logged_in_digital: 'You can send your complaint and attachments digitally here.',
    summary: {
      title: 'Review before you print',
    },
    innsending: {
      title: 'What do you do now?',
      steg: [
        'Print the complaint. The print includes a pre-made cover page. This should be placed on top. Follow the instructions on the cover page.',
        'Sign the cover page and the last page of the complaint.',
        'Add the attachments.',
        'Send by post to ',
      ],
      steg_simple: ['Print the complaint.', 'Sign the complaint.', 'Add the attachments.', 'Send by post to '],
    },
  },
  klageskjema: {
    common: {
      title_fragment: 'complain',
      page_title: 'Complain against decision',
      logged_out: {
        text: 'You have been logged out. To continue, you just need to log in again.',
        log_in: 'Log in',
      },
      steps: ['Reason', 'Summary', 'Receipt'],
    },
    begrunnelse: {
      reasons: {
        title: 'What do you disagree with? (optional)',
        not_specified: 'Not specified.',
        texts: {
          [Reason.AVSLAG_PAA_SOKNAD]: 'My application has been rejected',
          [Reason.FOR_LITE_UTBETALT]: 'The payment I received was too little',
          [Reason.UENIG_I_NOE_ANNET]: 'I disagree with something else in my decision',
          [Reason.UENIG_I_VEDTAK_OM_TILBAKEBETALING]: 'I disagree with the decision concerning repayment',
        },
      },
      vedtak_date: {
        title: 'Date of decision (optional)',
      },
      saksnummer: {
        title: 'Case number (optional)',
        internalTitle: 'Case number',
        change: 'Change',
      },
      begrunnelse_text: {
        title: 'Why do you disagree?',
        placeholder: 'State your reason here.',
        description:
          'Explain in your own words what you disagree with and what you wish to have changed. Attach documents that can show NAV why you disagree.',
      },
      autosave: {
        popover: 'We are saving your changes automatically.',
        saving: 'Saving',
        saved: 'Saved',
        failed: 'Failed to save',
      },
      attachments: {
        clear_errors: 'Remove error messsages',
        title: 'Attachments',
        upload_button_text: 'Upload new attachment',
        upload_error: ({ name, type, size }: File, reason = 'Unknown reason.') =>
          `Could not upload attachment "${name}" of type "${type}" of ${displayBytes(size)}. ${reason}`,
        description: 'If you have information you wish to attach, upload it here.',
        supported_types: [
          'Supported file types: ',
          <b key="png">PNG</b>,
          ', ',
          <b key="jpeg">JPEG</b>,
          ' and ',
          <b key="pdf">PDF</b>,
          '.',
        ].map((c, index) => <span key={index}>{c}</span>),
        size_limit: 'The file size cannot exceed 8 MB, and the total size of all attachments cannot exceed 32 MB.',
      },
      attachments_preview: {
        delete_error: (name: string, id: string, reason = 'Unknown reason.') =>
          `Could not delete attachment "${name}" with ID "${id}". ${reason}`,
      },
      next_button: 'Continue',
      delete_title: 'Delete complaint and return to start page',
    },
    summary: {
      title: 'Review before you submit',
      submit_error: 'Failed to submit complaint. Unknown error.',
      sections: {
        person: {
          title: <>Personal data</>,
          info_from:
            'Obtained from the National Registry (Folkeregisteret) and the Common Contact Register (Kontakt- og reserverasjonsregisteret).',
        },
        case: {
          title: 'Information from the case',
          vedtak: 'Date of decision',
          no_date: 'No date entered',
          saksnummer: 'Case number',
          not_specified: 'Not specified.',
          given_by_user: 'Specified by user',
          from_system: 'Obtained from internal system',
        },
        begrunnelse: {
          title: 'Reason in your complaint',
          what: 'What is your complain about?',
          why: 'Why do you disagree?',
          documents: 'Attached documents',
        },
      },
      next: (status: CaseStatus) => (status === CaseStatus.DRAFT ? 'Submit' : 'See submitted complaint'),
      post_link: 'Download if you would rather send by post',
    },
    kvittering: {
      title: 'Receipt for submitted complaint',
      download: 'See and download your complaint',
      sent: 'Submitted',
      general_info: {
        title: 'The rest is now our responsibility',
        description: `You don't have to do anything else. We will contact you if we have any questions or if we need further information from you. If you have forgotten to include some attachments, you can forward documentation at any time.`,
      },
      read_more: [
        'You can read more about the further processing of your complaint on our ',
        <ExternalLink key="tema" href="https://www.nav.no/en/home/rules-and-regulations/appeals" inline>
          topic pages about complaints and appeals
        </ExternalLink>,
        '.',
      ].map((c, index) => <span key={index}>{c}</span>),
      dine_saker: {
        title: 'See your cases on My page',
        url: 'https://person.nav.no/mine-saker/',
      },
      loading: {
        title: 'Submitting complaint...',
        still_working: 'Still working...',
      },
    },
  },
  ankeskjema_post: {
    common: {
      title_fragment: 'Appeal',
      steps: ['Reason', 'Summary', 'Sending'],
      page_title: 'Appeal against decision',
    },
    has_attachments_label: 'I will include attachments.',
    send_by_post_text:
      'You must download your appeal form and send it to the address listed on the cover page together with a copy of any other documents or receipts.',
    download: 'Download PDF',
    post_guidetext: 'Here you can fill out a appeal form. It has to be signed, printed, and sent by post.',
    should_log_in_digital:
      'If you log in, you will be able to send the appeal and attachments digitally. You can continue without logging in, but you will have to print your appeal, sign it, and send it by post.',
    logged_in_digital: 'You can send your appeal and attachments digitally here.',
    summary: {
      title: 'Review before you print',
    },
    innsending: {
      title: 'What do you do now?',
      steg: [
        'Print the appeal. The print includes a pre-made cover page. This should be placed on top. Follow the instructions on the cover page.',
        'Sign the appeal.',
        'Add the attachments.',
        'Send by post to ',
      ],
      steg_simple: ['Print the appeal.', 'Sign the appeal.', 'Add the attachments.', 'Send by post to '],
    },
  },
  ankeskjema: {
    common: {
      title_fragment: 'complain',
      page_title: 'Complain against decision',
      logged_out: {
        text: 'You have been logged out. To continue, you just need to log in again.',
        log_in: 'Log in',
      },
      steps: ['Reason', 'Summary', 'Receipt'],
    },
    begrunnelse: {
      vedtak_date: {
        title: 'Date of the complaint decision from NAV Klageinstans',
      },
      saksnummer: {
        title: 'Case number (optional)',
        internalTitle: 'Case number',
        change: 'Change',
      },
      klageenhet: {
        title: 'Unit stated in the complaint decision under information on the right to appeal',
        not_specified: 'No unit selected',
      },
      begrunnelse_text: {
        title: 'Why do you disagree with the complaint decision?',
        placeholder: 'State your reason here.',
        description:
          'Describe in your own words why you disagree with the complaint decision, and what you want changed. Attach any documents you wish to add to your case to the Social Security Court.',
      },
      autosave: {
        popover: 'We are saving your changes automatically.',
        saving: 'Saving',
        saved: 'Saved',
        failed: 'Failed to save',
      },
      attachments: {
        title: 'Attachments',
        upload_button_text: 'Upload new attachment',
        upload_error: ({ name, type, size }: File, reason = 'Unknown reason.') =>
          `Could not upload attachment "${name}" of type "${type}" of ${size} byte. ${reason}`,
        description: 'If you have information you wish to attach, upload it here.',
        supported_types: [
          'Supported file types: ',
          <b key="png">PNG</b>,
          ', ',
          <b key="jpeg">JPEG</b>,
          ' and ',
          <b key="pdf">PDF</b>,
          '.',
        ].map((c, index) => <span key={index}>{c}</span>),
        size_limit: 'The file size cannot exceed 8 MB, and the total size of all attachments cannot exceed 32 MB.',
        clear_errors: 'Remove error messsages',
      },
      attachments_preview: {
        delete_error: (name: string, id: string, reason = 'Unknown reason.') =>
          `Could not delete attachment "${name}" with ID "${id}". ${reason}`,
      },
      next_button: 'Continue',
      delete_title: 'Delete appeal and return to start page',
    },
    summary: {
      title: 'Review before you submit',
      submit_error: 'Failed to submit appeal. Unknown error.',
      sections: {
        person: {
          title: <>Personal data</>,
          info_from:
            'Obtained from the National Registry (Folkeregisteret) and the Common Contact Register (Kontakt- og reserverasjonsregisteret).',
        },
        case: {
          title: 'Information from the case',
          vedtak: 'Date of the complaint decision from NAV Klageinstans',
          no_date: 'No date entered',
          saksnummer: 'Case number',
          klageenhet: 'Unit stated in the complaint decision under information on the right to appeal',
          not_specified: 'Not specified.',
          given_by_user: 'Specified by user',
          from_system: 'Obtained from internal system',
        },
        begrunnelse: {
          title: 'Reason in your appeal',
          why: 'Description in your appeal',
          documents: 'Attached documents',
        },
      },
      back: 'Back',
      next: (status: CaseStatus) => (status === CaseStatus.DRAFT ? 'Submit' : 'See submitted appeal'),
      post_link: 'Download if you would rather send by post',
    },
    kvittering: {
      title: 'Receipt for submitted appeal',
      download: 'See and download your appeal',
      sent: 'Submitted',
      general_info: {
        title: 'The rest is now our responsibility',
        description: `You don't have to do anything else. We will contact you if we have any questions or if we need further information from you. If you have forgotten to include some attachments, you can send them to us later by clicking on "Submit additional documentation to a previously submitted complaint or appeal" for the topic in question.`,
      },
      read_more: [
        'You can read more about the further processing of your complaint on our ',
        <ExternalLink key="topic" href="https://www.nav.no/en/home/rules-and-regulations/appeals" inline>
          topic pages about complaints and appeals
        </ExternalLink>,
        '.',
      ],
      dine_saker: {
        title: 'See your cases on My page',
        url: 'https://person.nav.no/mine-saker/',
      },
      loading: {
        title: 'Submitting appeal...',
        still_working: 'Still working...',
      },
    },
  },
  klage_create: {
    invalid_innsendingsytelse: (innsendingsytelse = 'Unknown') => `Invalid topic "${innsendingsytelse}".`,
    format_error: (innsendingsytelse: Innsendingsytelse, saksnummer: string | null): string => {
      if (saksnummer === null) {
        return `Failed to create complaint with topic "${innsendingsytelse}".`;
      }

      return `Failed to create complaint with topic "${innsendingsytelse}" and case number "${saksnummer}".`;
    },
    create_error: 'Could not create complaint',
    creating: 'Creating complaint...',
  },
  anke_create: {
    invalid_innsendingsytelse: (innsendingsytelse = 'Unknown') => `Invalid topic "${innsendingsytelse}".`,
    format_error: (innsendingsytelse: Innsendingsytelse, saksnummer: string | null): string => {
      if (saksnummer === null) {
        return `Failed to create appeal with topic "${innsendingsytelse}".`;
      }

      return `Failed to create appeal with topic "${innsendingsytelse}" and case number "${saksnummer}".`;
    },
    create_error: 'Could not create appeal',
    creating: 'Creating appeal...',
  },
  user_loader: {
    loading_user: 'Loading user...',
    network_error: 'Could not load user because your browser cannot reach NAV. Do you still have internet access?',
    other_error: 'Could not load user, please try again later.',
    error_message: (message: string) => `Error message: "${message}"`,
    log_in: 'Log in',
  },
  klage_loader: {
    loading_klage: 'Loading complaint...',
    restoring: 'Restoring complaint...',
    format_error: (klageId: string, error: Error) =>
      `Failed to retrieve complaint with ID "${klageId}". ${error.message}`,
  },
  anke_loader: {
    loading_anke: 'Loading complaint...',
    restoring: 'Restoring complaint...',
    format_error: (ankeInternalSaksnummer: string, error: Error) =>
      `Failed to retrieve complaint with ID "${ankeInternalSaksnummer}". ${error.message}`,
  },
  landing_page: {
    checking_user: 'Checking user...',
  },
  not_found_page: {
    title: 'Page not found',
    go_back: 'Go back to homepage',
  },
  utfall: {
    [Utfall.TRUKKET]: 'Drawn',
    [Utfall.RETUR]: 'Returned',
    [Utfall.OPPHEVET]: 'Overturned',
    [Utfall.MEDHOLD]: 'Reversed',
    [Utfall.DELVIS_MEDHOLD]: 'Partially reversed',
    [Utfall.OPPRETTHOLDT]: 'Upheld',
    [Utfall.UGUNST]: 'Reversed',
    [Utfall.AVVIST]: 'Rejected',
  },
  kvittering: {
    see_estimate: [
      'You can see ',
      <ExternalLink key="processing" href="https://www.nav.no/saksbehandlingstider" inline>
        the expected case processing time for complaints and appeals
      </ExternalLink>,
      ' in a separate overview.',
    ].map((c, index) => <span key={index}>{c}</span>),
  },
  error_messages: {
    [ErrorMessageKeys.TOO_LARGE]: 'The file size cannot be larger than 8 MB.',
    [ErrorMessageKeys.TOTAL_TOO_LARGE]: 'Total file size cannot exceed 32 MB.',
    [ErrorMessageKeys.ENCRYPTED]: 'We suspect that your file is encrypted, therefore it cannot be included.',
    [ErrorMessageKeys.EMPTY]: 'You cannot include an empty file.',
    [ErrorMessageKeys.VIRUS]: 'We suspect that your file contains a virus, therefore is cannot be included.',
    [ErrorMessageKeys.FILE_COULD_NOT_BE_CONVERTED]:
      'You have tried to include an attachment with a format we do not support. Attachments are limited to til PNG, JPEG, and PDF.',
    skjema: {
      title: 'Form is not complete',
      fnr: 'National identity number is not valid.',
      fnr_dnr_or_npid: 'Invalid national identity numbe, D number or NPID.',
      vedtak_date: 'Decision date must be a valid date that is not in the future, or empty.',
      vedtak_date_required: 'Decision date must be a valid date that is not in the future.',
      fornavn: 'First and middle name can not be empty.',
      etternavn: 'Surname can not be empty.',
      begrunnelse: 'You must state a reason before continuing.',
      enhet: 'You must select a unit.',
    },
  },
  common: {
    loading: 'Loading...',
    logged_out: 'You have been logged out. To continue, you just need to log in again.',
    log_in: 'Log in',
    retry: 'Retry',
    generic_error: 'Something went wrong. Please try again later.',
    fnr_dnr_or_npid: 'National identity number, D number or NPID',
    fornavn: 'First and middle name',
    etternavn: 'Surname',
    address: 'Address',
    phone_number: 'Phone number',
    download: 'Download / print',
    optional_suffix: ' (optional)',
    klage: 'Complaint',
    anke: 'Appeal',
    back: 'Back',
    close_confirm: 'Are you sure you want to close this website?',
    last_changed: 'Last changed',
    delete: 'Delete',
    cancel: 'Cancel',
    yes: 'Yes',
    no: 'No',
    expires_in: (exp: string) => `You will be logged out ${exp}. To continue, you just need to log in again.`,
  },
  personalised: {
    draft_klager: {
      title: 'Draft complaints',
    },
    draft_anker: {
      title: 'Draft appeals',
      item_title: 'Draft appeal',
    },
    available_anker: {
      title: 'Declined complaints',
      klage_date: 'Complaint decision date',
    },
  },
};
