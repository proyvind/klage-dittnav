import { Delete } from '@navikt/ds-icons';
import { Button } from '@navikt/ds-react';
import React, { useState } from 'react';
import { useTranslation } from '../../language/use-translation';
import { AppEventEnum } from '../../logging/error-report/action';
import { addAppEvent } from '../../logging/error-report/error-report';

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
      <Button variant="danger" size="medium" onClick={() => setShowConfirm(true)} title={title} icon={<Delete />} />
    );
  }

  const deleteCase = () => {
    addAppEvent(AppEventEnum.DELETE_CASE);
    onDelete();
  };

  return (
    <>
      <Button variant="secondary" size="medium" onClick={() => setShowConfirm(false)}>
        {common.cancel}
      </Button>
      <Button
        variant="danger"
        size="medium"
        onClick={deleteCase}
        loading={isLoading}
        disabled={isLoading}
        title={title}
        icon={<Delete />}
      />
    </>
  );
};
