import React, { useEffect } from 'react';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import { LoadingPage } from '../../../components/loading-page/loading-page';
import { getQueryValue } from '../../../functions/get-query-value';
import { useSessionKlage } from '../../../hooks/use-session-klage';
import { useLanguage } from '../../../language/use-language';
import { useTranslation } from '../../../language/use-translation';
import { useAppDispatch } from '../../../redux/configure-store';
import { createSessionKlage } from '../../../redux/session/klage/helpers';
import { loadSessionKlage } from '../../../redux/session/session';
import { ensureStringIsTema } from '../../../tema/tema';
import { ISessionKlage } from './types';

interface Props {
  Component: React.ComponentType<{ klage: ISessionKlage }>;
}

export const KlageSessionLoader = ({ Component }: Props) => {
  const language = useLanguage();
  const [query] = useSearchParams();
  const { temaKey: tema, titleKey = null } = useParams();
  const temaKey = ensureStringIsTema(getQueryValue(tema));
  const saksnummer = getQueryValue(query.get('saksnummer'));
  const klage = useSessionKlage(temaKey, titleKey);
  const dispatch = useAppDispatch();
  const { klage_loader } = useTranslation();

  useEffect(() => {
    if (typeof klage === 'undefined' && temaKey !== null) {
      dispatch(
        loadSessionKlage({
          key: { temaKey, titleKey },
          klage: createSessionKlage(language, temaKey, titleKey, saksnummer),
        })
      );
    }
  }, [dispatch, klage, language, saksnummer, temaKey, titleKey]);

  if (temaKey === null) {
    return <Navigate to="/" />;
  }

  if (typeof klage === 'undefined' || klage === null) {
    return <LoadingPage>{klage_loader.loading_klage}</LoadingPage>;
  }

  return <Component klage={klage} />;
};
