import { Link } from '@navikt/ds-react';
import React from 'react';
import { useTranslation } from '@app/language/use-translation';
import { getLoginRedirectPath } from '@app/user/login';

export const LoggedOut = () => {
  const { common } = useTranslation();

  return (
    <>
      {common.logged_out} <Link href={getLoginRedirectPath()}>{common.log_in}</Link>.
    </>
  );
};
