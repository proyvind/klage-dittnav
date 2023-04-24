import { BodyShort, Label } from '@navikt/ds-react';
import React, { useCallback, useState } from 'react';
import { isApiError, isError } from '@app/functions/is-api-error';
import { isErrorMessageKey } from '@app/language/error-messages';
import { Language } from '@app/language/language';
import { useTranslation } from '@app/language/use-translation';
import { useUpdateAnkeMutation } from '@app/redux-api/case/anke/api';
import { useUpdateKlageMutation } from '@app/redux-api/case/klage/api';
import { AutosaveProgressIndicator } from '../../../autosave-progress/autosave-progress';
import { LoggedOut } from '../../../logged-out/logged-out';
import { UserSaksnummer } from '../../common/saksnummer';

interface UserSaksnummerProps {
  internalSaksnummer?: string | null;
  userSaksnummer: string | null;
  caseId: string;
  useUpdateMutation: typeof useUpdateKlageMutation | typeof useUpdateAnkeMutation;
  translations: Language['klageskjema' | 'ankeskjema'];
}

export const UserSaksnummerDigital = ({
  userSaksnummer,
  caseId,
  useUpdateMutation,
  internalSaksnummer = null,
  translations,
}: UserSaksnummerProps) => {
  const { common, error_messages } = useTranslation();
  const [updateCase, status] = useUpdateMutation();
  const [error, setError] = useState<React.ReactNode | undefined>(undefined);

  const update = useCallback(
    (value: string) => {
      updateCase({ key: 'userSaksnummer', value, id: caseId })
        .unwrap()
        .then(() => setError(undefined))
        .catch((e) => {
          if (isError(e) && e.status === 401) {
            setError(<LoggedOut />);

            return;
          }

          if (isApiError(e) && isErrorMessageKey(e.data.detail)) {
            setError(error_messages[e.data.detail]);

            return;
          }

          setError(common.generic_error);
        });
    },
    [caseId, common.generic_error, error_messages, updateCase]
  );

  if (internalSaksnummer !== null) {
    return (
      <div>
        <Label>{translations.begrunnelse.saksnummer.internalTitle}</Label>
        <BodyShort>{internalSaksnummer}</BodyShort>
      </div>
    );
  }

  return (
    <div>
      <UserSaksnummer
        label={translations.begrunnelse.saksnummer.title}
        userSaksnummer={userSaksnummer}
        onChange={update}
        error={error}
      />
      <AutosaveProgressIndicator translations={translations} {...status} />
    </div>
  );
};
