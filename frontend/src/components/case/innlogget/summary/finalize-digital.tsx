import { Login } from '@navikt/ds-icons';
import { Button } from '@navikt/ds-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useIsAuthenticated } from '../../../../hooks/use-user';
import { useTranslation } from '../../../../language/use-translation';
import { AppEventEnum } from '../../../../logging/error-report/action';
import { addAppEvent } from '../../../../logging/error-report/error-report';
import { useFinalizeKlageMutation } from '../../../../redux-api/case/klage/api';
import { CaseStatus } from '../../../../redux-api/case/types';
import { login } from '../../../../user/login';

interface Props {
  setError: (error: string | null) => void;
  status: CaseStatus;
  id: string;
  fritekst: string;
}

export const FinalizeDigital = ({ setError, status, id, fritekst }: Props) => {
  const navigate = useNavigate();
  const { klageskjema, common } = useTranslation();
  const [finalizeKlage] = useFinalizeKlageMutation();
  const [loading, setIsLoading] = useState<boolean>(false);
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

  const submitForm = async (event: React.MouseEvent) => {
    event.preventDefault();

    addAppEvent(AppEventEnum.FINALIZE);

    if (status === CaseStatus.DONE) {
      navigate(NEXT_PAGE_URL);

      return;
    }

    setIsLoading(true);

    try {
      await finalizeKlage(id).unwrap();
      navigate(NEXT_PAGE_URL);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError(klageskjema.summary.submit_error);
      }

      setIsLoading(false);
    }
  };

  return (
    <Button
      as={Link}
      to={NEXT_PAGE_URL}
      variant="primary"
      onClick={submitForm}
      disabled={loading || fritekst.length === 0}
      loading={loading}
    >
      {klageskjema.summary.next(status)}
    </Button>
  );
};

const NEXT_PAGE_URL = `../kvittering`;
