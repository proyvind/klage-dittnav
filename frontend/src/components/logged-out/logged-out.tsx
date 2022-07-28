import { Link } from '@navikt/ds-react';
import React from 'react';
import { useTranslation } from '../../language/use-translation';
import { getLoginRedirectPath } from '../../user/login';

export const LoggedOut = () => {
  const { common } = useTranslation();

  return (
    <>
      {common.logged_out} <Link href={getLoginRedirectPath()}>{common.log_in}</Link>.
    </>
  );
};
