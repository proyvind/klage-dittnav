import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useEffect, useMemo } from 'react';
import { ISessionAnke } from '../components/anke/uinnlogget/types';
import { useLanguage } from '../language/use-language';
import { useAppDispatch, useAppSelector } from '../redux/configure-store';
import { getSessionAnkeKey } from '../redux/session/anke/helpers';
import { loadSessionAnke } from '../redux/session/session';
import { SessionKey } from '../redux/session/types';

export const useSessionAnke = (key: SessionKey | typeof skipToken): ISessionAnke | undefined | null => {
  const dispatch = useAppDispatch();
  const sessionAnkeMap = useAppSelector((state) => state.session.anker);
  const language = useLanguage();

  const anke = useMemo(() => {
    if (key === skipToken) {
      return undefined;
    }

    const ankeKey = getSessionAnkeKey(key);

    return sessionAnkeMap[ankeKey];
  }, [sessionAnkeMap, key]);

  useEffect(() => {
    if (key !== skipToken && typeof anke === 'undefined') {
      dispatch(loadSessionAnke({ key, anke: null }));
    }
  }, [dispatch, anke, language, key]);

  return anke;
};
