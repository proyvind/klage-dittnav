import React, { useCallback, useState } from 'react';
import { isApiError, isError } from '@app/functions/is-api-error';
import { useTranslation } from '@app/language/use-translation';
import { useUpdateKlageMutation } from '@app/redux-api/case/klage/api';
import { Reason } from '@app/redux-api/case/klage/types';
import { AutosaveProgressIndicator } from '../../../autosave-progress/autosave-progress';
import { Reasons as BaseReasons } from '../../../begrunnelse/klage/reasons';
import { LoggedOut } from '../../../logged-out/logged-out';

interface Props {
  caseId: string;
  checkedReasons: Reason[];
}

export const Reasons = ({ checkedReasons, caseId }: Props) => {
  const { common, error_messages, klageskjema } = useTranslation();
  const [updateReasons, status] = useUpdateKlageMutation();
  const [error, setError] = useState<React.ReactNode | undefined>(undefined);

  const update = useCallback(
    (reasons: Reason[]) => {
      updateReasons({ key: 'checkboxesSelected', value: reasons, id: caseId })
        .unwrap()
        .then(() => setError(undefined))
        .catch((e) => {
          if (isError(e) && e.status === 401) {
            setError(<LoggedOut />);

            return;
          }

          if (isApiError(e)) {
            setError(error_messages[e.data.detail]);

            return;
          }

          setError(common.generic_error);
        });
    },
    [updateReasons, caseId, common.generic_error, error_messages]
  );

  return (
    <div>
      <BaseReasons onChange={update} checkedReasons={checkedReasons} error={error} />
      <AutosaveProgressIndicator translations={klageskjema} {...status} />
    </div>
  );
};
