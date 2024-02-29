import { DownloadIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { ISessionCase } from '@app/components/case/uinnlogget/types';
import { useInnsendingsytelseName } from '@app/hooks/use-innsendingsytelser';
import { useTranslation } from '@app/language/use-translation';
import { AppEventEnum } from '@app/logging/error-report/action';
import { addApiEvent, addAppEvent, addErrorEvent, sendErrorReport } from '@app/logging/error-report/error-report';
import { CaseType } from '@app/redux-api/case/types';
import { API_PATH } from '@app/redux-api/common';

interface Props {
  caseData: ISessionCase;
  validForm?: () => boolean;
}

export const DownloadButton = ({ caseData, validForm }: Props) => {
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
      const endpoint = `${API_PATH}/pdf/klanke`;
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
        a.download = `NAV ${getTypeString(caseData.type)} - ${title} - ${format(new Date(), 'yyyy-MM-dd HH-mm-ss')}.pdf`;
        a.href = URL.createObjectURL(blob);
        a.click();

        addApiEvent(endpoint, method, res.status, `Successfully generated PDF for ${caseData.type}.`);

        navigate(NEXT_PAGE_URL);
      } else {
        addApiEvent(endpoint, method, res.status, `Failed to generate PDF for ${caseData.type}.`);
        sendErrorReport();
      }
    } catch (e) {
      if (e instanceof Error) {
        addErrorEvent(`(${caseData.type}) ${e.message}`, e.stack);
      } else {
        addErrorEvent(`Failed to generate PDF for ${caseData.type}.`);
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

const getTypeString = (type: CaseType): string => {
  switch (type) {
    case CaseType.KLAGE:
      return 'klage';
    case CaseType.ANKE:
      return 'anke';
    case CaseType.ETTERSENDELSE_KLAGE:
    case CaseType.ETTERSENDELSE_ANKE:
      return 'ettersendelse';
  }
};
