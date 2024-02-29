import { EnterIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useIsAuthenticated } from '@app/hooks/use-user';
import { useTranslation } from '@app/language/use-translation';
import { AppEventEnum } from '@app/logging/error-report/action';
import { addAppEvent } from '@app/logging/error-report/error-report';
import { useFinalizeCaseMutation } from '@app/redux-api/case/api';
import { Attachment, CaseStatus, CaseType } from '@app/redux-api/case/types';
import { login } from '@app/user/login';

interface Props {
  setError: (error: string | null) => void;
  status: CaseStatus;
  id: string;
  fritekst: string;
  type: CaseType;
  vedlegg: Attachment[];
}

export const FinalizeDigitalCase = ({ setError, status, id, fritekst, type, vedlegg }: Props) => {
  const [finalizeKlage] = useFinalizeCaseMutation();
  const navigate = useNavigate();
  const { skjema, common } = useTranslation();
  const [loading, setIsLoading] = useState<boolean>(false);
  const { data: isAuthenticated } = useIsAuthenticated();

  const errorTranslation = skjema.summary.submit_error;
  const nextTranslation = skjema.summary.next;

  if (isAuthenticated === false) {
    const onClick = () => {
      addAppEvent(AppEventEnum.LOGIN);
      login();
    };

    return (
      <Button variant="primary" onClick={onClick} icon={<EnterIcon aria-hidden />} iconPosition="left">
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
      await finalizeKlage(id);
      navigate(NEXT_PAGE_URL);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError(errorTranslation[type]);
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
      disabled={loading || (fritekst.length === 0 && vedlegg.length === 0)}
      loading={loading}
    >
      {nextTranslation(status, type)}
    </Button>
  );
};

const NEXT_PAGE_URL = `../kvittering`;
