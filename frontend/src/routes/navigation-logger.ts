import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { addNavigationEvent } from '../logging/user-trace';

interface Props {
  children: JSX.Element;
}

export const NavigationLogger = ({ children }: Props) => {
  const location = useLocation();

  useEffect(() => {
    addNavigationEvent(location.pathname);
  }, [location.pathname]);

  return children;
};
