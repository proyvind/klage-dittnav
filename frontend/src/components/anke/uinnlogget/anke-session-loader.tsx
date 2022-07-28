import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import React, { useEffect, useMemo } from 'react';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import { LoadingPage } from '../../../components/loading-page/loading-page';
import { getQueryValue } from '../../../functions/get-query-value';
import { useSessionAnke } from '../../../hooks/use-session-anke';
import { useLanguage } from '../../../language/use-language';
import { useTranslation } from '../../../language/use-translation';
import { useAppDispatch } from '../../../redux/configure-store';
import { createSessionAnke } from '../../../redux/session/anke/helpers';
import { loadSessionAnke } from '../../../redux/session/session';
import { ensureStringIsTema } from '../../../tema/tema';
import { ISessionAnke } from './types';

interface Props {
  Component: React.ComponentType<{ anke: ISessionAnke }>;
}

export const AnkeSessionLoader = ({ Component }: Props) => {
  const language = useLanguage();
  const [query] = useSearchParams();
  const { temaKey: tema, titleKey = null } = useParams();
  const temaKey = ensureStringIsTema(getQueryValue(tema));
  const saksnummer = getQueryValue(query.get('saksnummer'));

  const key = useMemo(() => {
    if (typeof saksnummer === 'string') {
      return saksnummer;
    }

    if (temaKey === null) {
      return skipToken;
    }

    return { temaKey, titleKey };
  }, [saksnummer, temaKey, titleKey]);

  const anke = useSessionAnke(key);

  const dispatch = useAppDispatch();
  const { anke_loader } = useTranslation();

  useEffect(() => {
    if (typeof anke === 'undefined' && temaKey !== null) {
      dispatch(
        loadSessionAnke({
          key: { temaKey, titleKey },
          anke: createSessionAnke(language, temaKey, titleKey, saksnummer),
        })
      );
    }
  }, [dispatch, anke, language, saksnummer, temaKey, titleKey]);

  if (temaKey === null) {
    return <Navigate to="/" />;
  }

  if (typeof anke === 'undefined' || anke === null) {
    return <LoadingPage>{anke_loader.loading_anke}</LoadingPage>;
  }

  return <Component anke={anke} />;
};
