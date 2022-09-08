import { Download, Login } from '@navikt/ds-icons';
import { Button } from '@navikt/ds-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsAuthenticated } from '../../../../hooks/use-user';
import { useTranslation } from '../../../../language/use-translation';
import { AppEventEnum } from '../../../../logging/error-report/action';
import { addAppEvent } from '../../../../logging/error-report/error-report';
import { API_PATH } from '../../../../redux-api/common';
import { login } from '../../../../user/login';

interface Props {
  id: string;
  subPath: 'anker' | 'klager';
}

export const DownloadButton = ({ id, subPath }: Props) => {
  const { common } = useTranslation();
  const navigate = useNavigate();
  const { data: isAuthenticated } = useIsAuthenticated();

  if (isAuthenticated === false) {
    const onClick = () => {
      addAppEvent(AppEventEnum.LOGIN);
      login();
    };

    return (
      <Button variant="primary" onClick={onClick} icon={<Login />} iconPosition="left">
        {common.log_in}
      </Button>
    );
  }

  const onClick = () => {
    addAppEvent(AppEventEnum.DOWNLOAD);
    navigate('../innsending');
  };

  return (
    <Button
      href={`${API_PATH}/${subPath}/${id}/pdf/innsending`}
      as="a"
      variant="primary"
      target="_blank"
      onClick={onClick}
      icon={<Download />}
      iconPosition="left"
    >
      {common.download}
    </Button>
  );
};
