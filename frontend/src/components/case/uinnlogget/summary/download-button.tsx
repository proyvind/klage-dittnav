import { DownloadIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useInnsendingsytelseName } from '@app/hooks/use-innsendingsytelser';
import { useTranslation } from '@app/language/use-translation';
import { AppEventEnum } from '@app/logging/error-report/action';
import { addApiEvent, addAppEvent, addErrorEvent, sendErrorReport } from '@app/logging/error-report/error-report';
import { API_PATH } from '@app/redux-api/common';
import { ISessionAnke } from '../../../anke/uinnlogget/types';
import { IEttersendelse } from '../../../ettersendelse/types';
import { ISessionKlage } from '../../../klage/uinnlogget/types';

interface Props {
  caseData: ISessionKlage | ISessionAnke | IEttersendelse;
  type: 'klage' | 'anke' | 'ettersendelse';
  validForm?: () => boolean;
}

const TYPE_NAMES = {
  klage: 'Klage',
  anke: 'Anke',
  ettersendelse: 'Ettersendelse',
};

export const DownloadButton = ({ caseData, type, validForm }: Props) => {
  const { common } = useTranslation();
  const [pdfLoading, setpdfLoading] = useState(false);
  const [title] = useInnsendingsytelseName(caseData.innsendingsytelse);
  const navigate = useNavigate();

  const submitKlage = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    if (typeof validForm === 'function' && !validForm()) {
      return;
    }

    addAppEvent(AppEventEnum.DOWNLOAD);

    setpdfLoading(true);

    try {
      const endpoint = `${API_PATH}/pdf/${type}`;
      const method = 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...caseData }),
      });

      if (res.ok) {
        const blob = new Blob([await res.blob()], { type: 'octet/stream' });
        const a = document.createElement('a');
        a.download = `NAV ${TYPE_NAMES[type]} - ${title} - ${dayjs().format('YYYY-MM-DD HH-mm-ss')}.pdf`;
        a.href = URL.createObjectURL(blob);
        a.click();

        addApiEvent(endpoint, method, res.status, `Successfully generated PDF for ${type}.`);

        if (type !== 'ettersendelse') {
          navigate(NEXT_PAGE_URL);
        }
      } else {
        addApiEvent(endpoint, method, res.status, `Failed to generate PDF for ${type}.`);
        sendErrorReport();
      }
    } catch (e) {
      if (e instanceof Error) {
        addErrorEvent(`(${type}) ${e.message}`, e.stack);
      } else {
        addErrorEvent(`Failed to generate PDF for ${type}.`);
      }
      sendErrorReport();
    }

    setpdfLoading(false);
  };

  return (
    <Button
      as={Link}
      to={NEXT_PAGE_URL}
      variant="primary"
      onClick={submitKlage}
      loading={pdfLoading}
      icon={<DownloadIcon aria-hidden />}
      iconPosition="left"
    >
      {common.download}
    </Button>
  );
};

const NEXT_PAGE_URL = '../innsending';
