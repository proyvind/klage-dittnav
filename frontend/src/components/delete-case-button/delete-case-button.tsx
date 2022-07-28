import { Delete } from '@navikt/ds-icons';
import { Button } from '@navikt/ds-react';
import React, { useState } from 'react';
import { useTranslation } from '../../language/use-translation';

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

  return (
    <>
      <Button variant="secondary" size="medium" onClick={() => setShowConfirm(false)}>
        {common.cancel}
      </Button>
      <Button
        variant="danger"
        size="medium"
        onClick={onDelete}
        loading={isLoading}
        disabled={isLoading}
        title={title}
        icon={<Delete />}
      />
    </>
  );
};
