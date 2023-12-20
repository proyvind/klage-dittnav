import { TrashIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import React, { useState } from 'react';
import { useTranslation } from '@app/language/use-translation';
import { AppEventEnum } from '@app/logging/error-report/action';
import { addAppEvent } from '@app/logging/error-report/error-report';

interface Props {
  onDelete: () => void;
  isLoading: boolean;
  title: string;
}

export const DeleteCaseButton = ({ onDelete, isLoading, title }: Props) => {
  const { common } = useTranslation();
  const [showConfirm, setShowConfirm] = useState(false);

  if (!showConfirm) {
    return (
      <Button
        variant="danger"
        size="medium"
        onClick={() => setShowConfirm(true)}
        title={title}
        icon={<TrashIcon aria-hidden />}
      />
    );
  }

  const deleteCase = () => {
    addAppEvent(AppEventEnum.DELETE_CASE);
    onDelete();
  };

  return (
    <>
      <Button
        variant="danger"
        size="medium"
        onClick={deleteCase}
        loading={isLoading}
        disabled={isLoading}
        title="Bekreft sletting"
        icon={<TrashIcon aria-hidden />}
      />
      <Button variant="secondary" size="medium" onClick={() => setShowConfirm(false)}>
        {common.cancel}
      </Button>
    </>
  );
};
