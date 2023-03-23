import { Checkbox } from '@navikt/ds-react';
import React from 'react';
import { Language } from '@app/language/language';
import { useUpdateAnkeMutation } from '@app/redux-api/case/anke/api';
import { useUpdateKlageMutation } from '@app/redux-api/case/klage/api';

interface Props {
  caseId: string;
  hasVedlegg: boolean;
  useUpdateMutation: typeof useUpdateKlageMutation | typeof useUpdateAnkeMutation;
  translations: Language['klageskjema_post' | 'ankeskjema_post'];
}

export const HasVedleggCheckbox = ({ caseId, hasVedlegg, translations, useUpdateMutation }: Props) => {
  const [updateHasVedlegg, status] = useUpdateMutation();

  return (
    <Checkbox
      checked={hasVedlegg}
      onChange={({ target }) => updateHasVedlegg({ key: 'hasVedlegg', value: target.checked, id: caseId })}
      disabled={status.isLoading}
    >
      {translations.has_attachments_label}
    </Checkbox>
  );
};
