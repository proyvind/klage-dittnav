/* eslint-disable max-lines */
import { Link } from '@navikt/ds-react';
import { format } from 'date-fns';
import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { PRETTY_FORMAT } from '@app/components/date-picker/constants';
import { ExternalLink } from '@app/components/link/link';
import { Innsendingsytelse } from '@app/innsendingsytelser/innsendingsytelser';
import { ErrorMessageKeys } from '@app/language/error-messages';
import { CaseStatus, CaseType, Reason, getEttersendelsePath } from '@app/redux-api/case/types';
import { Translations } from './nb';

export const en: Translations = {
  skjema: {
    steps: {
      [CaseType.KLAGE]: ['Reason', 'Summary', 'Sending'],
      [CaseType.ANKE]: ['Reason', 'Summary', 'Sending'],
      [CaseType.ETTERSENDELSE_KLAGE]: ['Documentation', 'Summary', 'Sending'],
      [CaseType.ETTERSENDELSE_ANKE]: ['Documentation', 'Summary', 'Sending'],
    },
    employer_info: {
      [CaseType.KLAGE]:
        'As an employer, you must log out and send the complaint by post. You enter the national identity number or D-number of the employee to whom the decision applies, print out the complaint, and sign as the employer.',
      [CaseType.ANKE]:
        'As an employer, you must log out and send the appeal by post. You enter the national identity number or D-number of the employee to whom the decision applies, print out the appeal, and sign as the employer.',
      [CaseType.ETTERSENDELSE_KLAGE]:
        'As an employer, you must log out and enter the national identity number or D-number of the employee to whom the additional documentation applies, print out the front page, and sign as the employer.',
      [CaseType.ETTERSENDELSE_ANKE]:
        'As an employer, you must log out and enter the national identity number or D-number of the employee to whom the additional documentation applies, print out the front page, and sign as the employer.',
    },
    common: {
      title_fragment: {
        [CaseType.KLAGE]: 'complain',
        [CaseType.ANKE]: 'appeal',
        [CaseType.ETTERSENDELSE_KLAGE]: 'additional documentation',
        [CaseType.ETTERSENDELSE_ANKE]: 'additional documentation',
      },
      page_title: {
        [CaseType.KLAGE]: 'Complain against decision',
        [CaseType.ANKE]: 'Appeal against decision',
        [CaseType.ETTERSENDELSE_KLAGE]: 'Submit additional documentation',
        [CaseType.ETTERSENDELSE_ANKE]: 'Submit additional documentation',
      },
    },
    begrunnelse: {
      autosave: {
        popover: 'We are saving your changes automatically.',
        saved: 'Last saved',
        failed: 'Failed to save',
      },
      attachments: {
        clear_errors: 'Remove error messsages',
        title: 'Attachments',
        upload_button_text: 'Upload new attachment',
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
      saksnummer: {
        title: 'Case number (optional)',
        internalTitle: 'Case number',
        change: 'Change',
      },
      reasons: {
        title: { [CaseType.KLAGE]: 'What do you disagree with? (optional)' },
        texts: {
          [Reason.AVSLAG_PAA_SOKNAD]: 'My application has been rejected',
          [Reason.FOR_LITE_UTBETALT]: 'The payment I received was too little',
          [Reason.UENIG_I_NOE_ANNET]: 'I disagree with something else in my decision',
          [Reason.UENIG_I_VEDTAK_OM_TILBAKEBETALING]: 'I disagree with the decision concerning repayment',
        },
      },
      vedtak_date: {
        title: {
          [CaseType.KLAGE]: 'Date of decision (optional)',
          [CaseType.ANKE]: 'Date of the complaint decision from NAV Klageinstans',
          [CaseType.ETTERSENDELSE_KLAGE]: 'Date of decision (optional)',
          [CaseType.ETTERSENDELSE_ANKE]: 'Date of the complaint decision from NAV Klageinstans',
        },
      },
      klageenhet: {
        radio_title:
          'Have you received a letter from NAV Klageinstans or another unit in NAV stating that your case has been sent to NAV Klageinstans?',
        none: 'No unit selected',
        title_required: 'Which unit did you receive the letter from?',
        title_optional: 'Which unit in NAV Klageinstans is the complaint at?',
        title: {
          [CaseType.KLAGE]: undefined,
          [CaseType.ANKE]: 'Unit stated in the complaint decision under information on the right to appeal',
          [CaseType.ETTERSENDELSE_KLAGE]: 'Which unit in NAV Klageinstans is the complaint at?',
          [CaseType.ETTERSENDELSE_ANKE]:
            'Unit stated in the complaint decision under information on the right to appeal',
        },
        not_received: 'No letter received',
      },
      begrunnelse_text: {
        title: {
          [CaseType.KLAGE]: 'Why do you disagree?',
          [CaseType.ANKE]: 'Why do you disagree with the complaint decision?',
          [CaseType.ETTERSENDELSE_KLAGE]: 'What do you want to add? (optional)',
          [CaseType.ETTERSENDELSE_ANKE]: 'What do you want to add? (optional)',
        },
        description: {
          [CaseType.KLAGE]:
            'Explain in your own words what you disagree with and what you wish to have changed. Attach documents that can show NAV why you disagree.',
          [CaseType.ANKE]:
            'Explain in your own words what you disagree with in the complaint decision and what you wish to have changed. Attach any documents you want to follow your case to the Social Security Court (Trygderetten).',
          [CaseType.ETTERSENDELSE_KLAGE]: 'If you have anything to add, you may write it here.',
          [CaseType.ETTERSENDELSE_ANKE]: 'If you have anything to add, you may write it here.',
        },
        placeholder: {
          [CaseType.KLAGE]: 'Write your reason here',
          [CaseType.ANKE]: 'Write your reason here',
          [CaseType.ETTERSENDELSE_KLAGE]: 'Write here',
          [CaseType.ETTERSENDELSE_ANKE]: 'Write here',
        },
      },
      next_button: 'Continue',
      delete_title: {
        [CaseType.KLAGE]: 'Delete complaint and return to start page',
        [CaseType.ANKE]: 'Delete appeal and return to start page',
        [CaseType.ETTERSENDELSE_KLAGE]: 'Delete additional documentation and return to start page',
        [CaseType.ETTERSENDELSE_ANKE]: 'Delete additional documentation and return to start page',
      },
    },
    summary: {
      title: 'Review before you submit',
      submit_error: {
        [CaseType.KLAGE]: 'Failed to submit complaint. Unknown error.',
        [CaseType.ANKE]: 'Failed to submit appeal. Unknown error.',
        [CaseType.ETTERSENDELSE_KLAGE]: 'Failed to submit additional documentation. Unknown error.',
        [CaseType.ETTERSENDELSE_ANKE]: 'Failed to submit additional documentation. Unknown error.',
      },
      sections: {
        person: {
          title: <>Personal data</>,
          info_from:
            'Obtained from the National Registry (Folkeregisteret) and the Common Contact Register (Kontakt- og reserverasjonsregisteret).',
        },
        case: {
          title: 'Information from the case',
          vedtak: {
            [CaseType.KLAGE]: 'Date of decision',
            [CaseType.ANKE]: 'Date of the complaint decision from NAV Klageinstans',
            [CaseType.ETTERSENDELSE_KLAGE]: 'Date of decision',
            [CaseType.ETTERSENDELSE_ANKE]: 'Date of the complaint decision from NAV Klageinstans',
          },
          saksnummer: 'Case number',
          klageenhet: 'Unit stated in the complaint decision under information on the right to appeal',
          from_system: 'Obtained from internal system',
        },
        begrunnelse: {
          title: {
            [CaseType.KLAGE]: 'Reason in your complaint',
            [CaseType.ANKE]: 'Reason in your appeal',
            [CaseType.ETTERSENDELSE_KLAGE]: 'Reason in your additional documentation',
            [CaseType.ETTERSENDELSE_ANKE]: 'Reason in your additional documentation',
          },
          what: {
            [CaseType.KLAGE]: 'What is your complaint about?',
            [CaseType.ANKE]: 'What is your appeal about?',
            [CaseType.ETTERSENDELSE_KLAGE]: 'What is your additional documentation about?',
            [CaseType.ETTERSENDELSE_ANKE]: 'What is your additional documentation about?',
          },
          why: {
            [CaseType.KLAGE]: 'Why do you disagree?',
            [CaseType.ANKE]: 'Why do you disagree with the complaint decision?',
            [CaseType.ETTERSENDELSE_KLAGE]: 'What do you want to add?',
            [CaseType.ETTERSENDELSE_ANKE]: 'What do you want to add?',
          },
          documents: 'Attached documents',
        },
      },
      next: (status: CaseStatus, type: CaseType) =>
        status === CaseStatus.DRAFT ? 'Submit' : `See submitted ${CASE_TYPE_NAMES_LOWER_CASE_EN[type]}`,
      post_link: 'Download if you would rather send by post',
      documents: 'Attached documents',
    },
    kvittering: {
      title: {
        [CaseType.KLAGE]: 'Receipt for submitted complaint',
        [CaseType.ANKE]: 'Receipt for submitted appeal',
        [CaseType.ETTERSENDELSE_KLAGE]: 'Receipt for additional documentation',
        [CaseType.ETTERSENDELSE_ANKE]: 'Receipt for additional documentation',
      },
      download: {
        [CaseType.KLAGE]: 'See and download your complaint',
        [CaseType.ANKE]: 'See and download your appeal',
        [CaseType.ETTERSENDELSE_KLAGE]: 'See and download your additional documentation',
        [CaseType.ETTERSENDELSE_ANKE]: 'See and download your additional documentation',
      },
      sent: 'Submitted',
      general_info: {
        title: 'The rest is now our responsibility',
        description: (type: CaseType, ytelse: Innsendingsytelse) => [
          `You don't have to do anything else. We will contact you if we have any questions or if we need further information from you. If you have forgotten to include any documentation, you can still `,
          <Link key="internal" to={`/en/${getEttersendelsePath(type)}/${ytelse}`} as={ReactRouterLink}>
            forward documentation
          </Link>,
          '. If you remember that you have forgotten anything later, you can forward documentation via ',
          <ExternalLink key="external" href="https://www.nav.no/klage" inline openInSameWindow>
            nav.no/klage
          </ExternalLink>,
          ' by clicking on "Forward documentation" for what the case is about.',
        ],
      },
      read_more: [
        'You can read more about the further processing of your complaint on our ',
        <ExternalLink key="topic" href="https://www.nav.no/klagerettigheter/en" inline>
          topic pages about complaints and appeals
        </ExternalLink>,
        '.',
      ].map((c, index) => <span key={index}>{c}</span>),
      loading: {
        title: {
          [CaseType.KLAGE]: 'Submitting complaint ...',
          [CaseType.ANKE]: 'Submitting appeal ...',
          [CaseType.ETTERSENDELSE_KLAGE]: 'Submitting additional documentation ...',
          [CaseType.ETTERSENDELSE_ANKE]: 'Submitting additional documentation ...',
        },
        still_working: 'Still working ...',
      },
      see_estimate: [
        'You can see ',
        <ExternalLink key="processing" href="https://www.nav.no/saksbehandlingstider" inline>
          the expected case processing time for complaints and appeals
        </ExternalLink>,
        ' in a separate overview.',
      ].map((c, index) => <span key={index}>{c}</span>),
      dine_saker: {
        title: 'See your cases on Min side',
        url: 'https://www.nav.no/dokumentarkiv/en',
      },
    },
  },
  innsending: {
    title: 'What do you do now?',
    steg: {
      [CaseType.KLAGE]: [
        'Print the complaint. The print includes a pre-made front page. This should be placed on top. Follow the instructions on the front page.',
        'Sign the front page and the last page of the complaint.',
        'Add the attachments.',
        'Send by post to ',
      ],
      [CaseType.ANKE]: [
        'Print the appeal. The print includes a pre-made front page. This should be placed on top. Follow the instructions on the front page.',
        'Sign the appeal.',
        'Add the attachments.',
        'Send by post to ',
      ],
      [CaseType.ETTERSENDELSE_KLAGE]: [
        'Print the documentation. The print includes a pre-made front page. This should be placed on top. Follow the instructions on the front page.',
        'Sign the front page and the last page of the documentation.',
        'Add the attachments.',
        'Send by post to ',
      ],
      [CaseType.ETTERSENDELSE_ANKE]: [
        'Print the documentation. The print includes a pre-made front page. This should be placed on top. Follow the instructions on the front page.',
        'Sign the front page and the last page of the documentation.',
        'Add the attachments.',
        'Send by post to ',
      ],
    },
    steg_simple: {
      [CaseType.KLAGE]: ['Print the complaint.', 'Sign the complaint.', 'Add the attachments.', 'Send by post to '],
      [CaseType.ANKE]: ['Print the appeal.', 'Sign the appeal.', 'Add the attachments.', 'Send by post to '],
      [CaseType.ETTERSENDELSE_KLAGE]: [
        'Print the documentation.',
        'Sign the documentation.',
        'Add the attachments.',
        'Send by post to ',
      ],
      [CaseType.ETTERSENDELSE_ANKE]: [
        'Print the documentation.',
        'Sign the documentation.',
        'Add the attachments.',
        'Send by post to ',
      ],
    },
  },
  post: {
    should_log_in_digital: {
      [CaseType.KLAGE]:
        'If you log in, you will be able to send the complaint and attachments digitally. You can continue without logging in, but you will have to print your complaint, sign it, and send it by post.',
      [CaseType.ANKE]:
        'If you log in, you will be able to send the appeal and attachments digitally. You can continue without logging in, but you will have to print your appeal, sign it, and send it by post.',
      [CaseType.ETTERSENDELSE_KLAGE]:
        'If you log in, you will be able to send the additional documentation and attachments digitally. You can continue without logging in, but you will have to print your documentation, sign it, and send it by post.',
      [CaseType.ETTERSENDELSE_ANKE]:
        'If you log in, you will be able to send the additional documentation and attachments digitally. You can continue without logging in, but you will have to print your documentation, sign it, and send it by post.',
    },
    employer_info: {
      [CaseType.KLAGE]:
        'As an employer, you must send the complaint by post. You enter the national identity number or D-number of the employee to whom the decision applies, print out the complaint, and sign as the employer.',
      [CaseType.ANKE]:
        'As an employer, you must send the appeal by post. You enter the national identity number or D-number of the employee to whom the decision applies, print out the appeal, and sign as the employer.',
      [CaseType.ETTERSENDELSE_KLAGE]:
        'As an employer, you must send the additional documentation by post. You enter the national identity number or D-number of the employee to whom the decision applies, print out the documentation, and sign as the employer.',
      [CaseType.ETTERSENDELSE_ANKE]:
        'As an employer, you must send the additional documentation by post. You enter the national identity number or D-number of the employee to whom the decision applies, print out the documentation, and sign as the employer.',
    },
  },
  user_loader: {
    loading_user: 'Loading...',
  },
  case_loader: {
    loading: 'Loading...',
    format_error: (id: string, error: Error) => `Failed to retrieve case with ID "${id}". ${error.message}`,
  },
  not_found_page: {
    title: 'Page not found',
    go_back: 'Go back to nav.no/klage',
  },
  error_messages: {
    [ErrorMessageKeys.MAX_UPLOAD_SIZE]: 'The file size cannot be larger than 8 MB.',
    [ErrorMessageKeys.TOO_LARGE]: 'The file size cannot be larger than 8 MB.',
    [ErrorMessageKeys.TOTAL_TOO_LARGE]: 'Total file size cannot exceed 32 MB.',
    [ErrorMessageKeys.ENCRYPTED]: 'We suspect that your file is encrypted, therefore it cannot be included.',
    [ErrorMessageKeys.EMPTY]: 'You cannot include an empty file.',
    [ErrorMessageKeys.VIRUS]: 'We suspect that your file contains a virus, therefore is cannot be included.',
    [ErrorMessageKeys.FILE_COULD_NOT_BE_CONVERTED]:
      'You have tried to include an attachment with a format we do not support. Attachments are limited to til PNG, JPEG, and PDF.',
    skjema: {
      title: 'Form is not complete',
      fnr_dnr_or_npid: 'You must input a valid national identity number, D number or NPID.',
      vedtak_date: 'You must either leave the field empty, or input a valid date that is not in the future.',
      vedtak_date_required: 'You must input a valid date that is not in the future.',
      fornavn: 'You must input a first and middle name.',
      etternavn: 'You must input a surname.',
      begrunnelse: 'You must state a reason before continuing.',
      case_is_at_ka: 'You must select whether you have received a letter.',
      enhet: 'You must select a unit.',
      vedleggEllerFritekstLoggedIn:
        'You must either upload at least one attachment or write a reason before continuing.',
      vedleggEllerFritekstLoggedOut:
        'You must either choose to include attachments or write a reason before continuing.',
    },
    date: {
      invalid_format: 'You must input a valid date.',
      invalid_range: (from: Date, to: Date) =>
        `You must input a date that is between ${format(from, PRETTY_FORMAT)} and ${format(to, PRETTY_FORMAT)}.`,
    },
    create_error: {
      [CaseType.KLAGE]: 'Failed to create complaint.',
      [CaseType.ANKE]: 'Failed to create appeal.',
      [CaseType.ETTERSENDELSE_KLAGE]: 'Failed to create additional documentation.',
      [CaseType.ETTERSENDELSE_ANKE]: 'Failed to create additional documentation.',
    },
  },
  common: {
    next_button: 'Continue',
    loading: 'Loading...',
    logged_out: 'You have been logged out. To continue, you just need to log in again.',
    log_in: 'Log in',
    generic_error: 'Something went wrong. Please try again later.',
    fnr_dnr_or_npid: 'National identity number, D number or NPID',
    fornavn: 'First and middle name',
    etternavn: 'Surname',
    download: 'Download / print',
    back: 'Back',
    last_changed: 'Last changed',
    delete: 'Delete',
    cancel: 'Cancel',
    yes: 'Yes',
    no: 'No',
    expires_in: (exp: string) => `You will be logged out ${exp}. To continue, you just need to log in again.`,
    has_attachments_label: 'I will include attachments.',
    not_specified: 'Not specified.',
  },
};

const CASE_TYPE_NAMES_LOWER_CASE_EN = {
  [CaseType.KLAGE]: 'complaint',
  [CaseType.ANKE]: 'appeal',
  [CaseType.ETTERSENDELSE_KLAGE]: 'additional documentation for complaint',
  [CaseType.ETTERSENDELSE_ANKE]: 'additional documentation for appeal',
};
