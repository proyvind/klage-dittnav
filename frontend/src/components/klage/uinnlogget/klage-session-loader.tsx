import { skipToken } from '@reduxjs/toolkit/dist/query';
import React, { useEffect, useMemo } from 'react';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import { getQueryValue } from '../../../functions/get-query-value';
import { useSessionKlage } from '../../../hooks/use-session-klage';
import { useLanguage } from '../../../language/use-language';
import { useTranslation } from '../../../language/use-translation';
import { useAppDispatch } from '../../../redux/configure-store';
import { createSessionKlage } from '../../../redux/session/klage/helpers';
import { loadSessionKlage } from '../../../redux/session/session';
import { SessionKey } from '../../../redux/session/types';
import { ensureStringIsTema } from '../../../tema/tema';
import { LoadingPage } from '../../loading-page/loading-page';
import { ISessionKlage } from './types';

interface Props {
  Component: React.ComponentType<{ klage: ISessionKlage }>;
}

export const KlageSessionLoader = ({ Component }: Props) => {
  const language = useLanguage();
  const [query] = useSearchParams();
  const { temaKey: tema, titleKey = null } = useParams();
  const temaKey = ensureStringIsTema(getQueryValue(tema));
  const internalSaksnummer = getQueryValue(query.get('saksnummer'));
  const key = useMemo<SessionKey | typeof skipToken>(
    () => (temaKey === null ? skipToken : { temaKey, titleKey }),
    [temaKey, titleKey]
  );
  const klage = useSessionKlage(key);
  const dispatch = useAppDispatch();
  const { klage_loader } = useTranslation();

  useEffect(() => {
    if (key !== skipToken && temaKey !== null && typeof klage === 'undefined') {
      dispatch(
        loadSessionKlage({
          key,
          klage: createSessionKlage(language, temaKey, titleKey, internalSaksnummer),
        })
      );
    }
  }, [dispatch, klage, language, internalSaksnummer, temaKey, titleKey, key]);

  if (temaKey === null) {
    return <Navigate to="/" />;
  }

  if (typeof klage === 'undefined' || klage === null) {
    return <LoadingPage>{klage_loader.loading_klage}</LoadingPage>;
  }

  return <Component klage={klage} />;
};
