import { Download } from '@navikt/ds-icons';
import { Button } from '@navikt/ds-react';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useTitle } from '../../../../hooks/use-titles';
import { useTranslation } from '../../../../language/use-translation';
import { API_PATH } from '../../../../redux-api/common';
import { ISessionAnke } from '../../../anke/uinnlogget/types';
import { ISessionKlage } from '../../../klage/uinnlogget/types';

interface Props {
  caseData: ISessionKlage | ISessionAnke;
  titleKey?: string | null;
  type: 'klage' | 'anke';
}

const TYPE_NAMES = {
  klage: 'Klage',
  anke: 'Anke',
};

export const DownloadButton = ({ caseData, titleKey, type }: Props) => {
  const { common } = useTranslation();
  const [pdfLoading, setpdfLoading] = useState(false);
  const [title] = useTitle(titleKey);
  const navigate = useNavigate();

  const submitKlage = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    setpdfLoading(true);

    const res = await fetch(`${API_PATH}/pdf/${type}`, {
      method: 'POST',
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

      navigate(NEXT_PAGE_URL);
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
      icon={<Download />}
      iconPosition="left"
    >
      {common.download}
    </Button>
  );
};

const NEXT_PAGE_URL = '../innsending';
