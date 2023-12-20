import { EnterIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useIsAuthenticated } from '@app/hooks/use-user';
import { Language } from '@app/language/language';
import { useTranslation } from '@app/language/use-translation';
import { AppEventEnum } from '@app/logging/error-report/action';
import { addAppEvent } from '@app/logging/error-report/error-report';
import { useFinalizeAnkeMutation } from '@app/redux-api/case/anke/api';
import { useFinalizeKlageMutation } from '@app/redux-api/case/klage/api';
import { CaseStatus } from '@app/redux-api/case/types';
import { login } from '@app/user/login';

interface Props {
  setError: (error: string | null) => void;
  status: CaseStatus;
  id: string;
  fritekst: string;
}

export const FinalizeDigitalKlage = (props: Props) => {
  const { klageskjema } = useTranslation();
  const finalizeMutation = useFinalizeKlageMutation();

  return <FinalizeDigital {...props} translations={klageskjema} finalizeMutation={finalizeMutation} />;
};

export const FinalizeDigitalAnke = (props: Props) => {
  const { ankeskjema } = useTranslation();
  const finalizeMutation = useFinalizeAnkeMutation();

  return <FinalizeDigital {...props} translations={ankeskjema} finalizeMutation={finalizeMutation} />;
};

interface FinalizeDigitalProps extends Props {
  finalizeMutation: ReturnType<typeof useFinalizeKlageMutation | typeof useFinalizeAnkeMutation>;
  translations: Language['klageskjema' | 'ankeskjema'];
}

const FinalizeDigital = ({ setError, status, id, fritekst, finalizeMutation, translations }: FinalizeDigitalProps) => {
  const navigate = useNavigate();
  const { common } = useTranslation();
  const [finalizeKlage] = finalizeMutation;
  const [loading, setIsLoading] = useState<boolean>(false);
  const { data: isAuthenticated } = useIsAuthenticated();

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
      await finalizeKlage(id).unwrap();
      navigate(NEXT_PAGE_URL);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError(translations.summary.submit_error);
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
      {translations.summary.next(status)}
    </Button>
  );
};

const NEXT_PAGE_URL = `../kvittering`;
