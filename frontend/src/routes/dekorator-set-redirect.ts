import { setParams } from '@navikt/nav-dekoratoren-moduler';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { LOGGED_IN_PATH } from '@app/environment/environment';
import { currentPath } from './current-path';

interface Props {
  children: JSX.Element;
}

export const DekoratorSetRedirect = ({ children }: Props) => {
  const location = useLocation();

  useEffect(() => {
    const path = currentPath(location);
    const redirectToUrl = `${window.location.origin}${LOGGED_IN_PATH}?redirect=${encodeURIComponent(path)}`;
    setParams({ redirectToUrl });
  }, [location]);

  return children;
};
