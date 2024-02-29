import { Textarea, TextareaProps } from '@navikt/ds-react';
import React, { useCallback, useEffect, useState } from 'react';
import { AutosaveProgressIndicator } from '@app/components/autosave-progress/autosave-progress';
import { FormFieldsIds } from '@app/components/case/common/form-fields-ids';
import { useOnUnmount } from '@app/hooks/use-on-unmount';
import { useUpdateCaseMutation } from '@app/redux-api/case/api';

interface Props extends Omit<TextareaProps, 'label' | 'onError' | 'onChange'> {
  caseId: string;
  value: string;
  label: string;
  error: string | undefined;
  modified: Date;
}

export const BegrunnelseText = ({ caseId, value, modified, ...props }: Props) => {
  const [localValue, setLocalValue] = useState(value);
  const [updateCase, status] = useUpdateCaseMutation();
  const [lastSaved, setLastSaved] = useState<Date>(modified);

  const updateFritekst = useCallback(
    async (newValue: string) => {
      await updateCase({ key: 'fritekst', value: newValue, id: caseId });
      setLastSaved(new Date());
    },
    [caseId, updateCase],
  );

  useEffect(() => {
    if (value === localValue) {
      return;
    }

    const timeout = setTimeout(() => updateFritekst(localValue), 1000);

    return () => clearTimeout(timeout);
  }, [value, localValue, updateFritekst]);

  useOnUnmount(() => {
    if (value !== localValue) {
      updateCase({ key: 'fritekst', value: localValue, id: caseId });
    }
  });

  return (
    <div>
      <Textarea
        id={FormFieldsIds.FRITEKST}
        maxLength={0}
        minLength={1}
        minRows={10}
        onChange={({ target }) => setLocalValue(target.value)}
        value={localValue}
        placeholder="Skriv her"
        {...props}
      />
      <AutosaveProgressIndicator {...status} lastSaved={lastSaved} />
    </div>
  );
};
