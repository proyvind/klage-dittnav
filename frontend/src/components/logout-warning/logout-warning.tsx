import { BodyLong, GuidePanel } from '@navikt/ds-react';
import dayjs, { extend } from 'dayjs';
import en from 'dayjs/locale/en';
import nb from 'dayjs/locale/nb';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import relative from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import React, { useEffect, useState } from 'react';
import { useUser } from '../../hooks/use-user';
import { Languages } from '../../language/types';
import { useLanguage } from '../../language/use-language';
import { useTranslation } from '../../language/use-translation';
import { AppEventEnum } from '../../logging/error-report/action';
import { addAppEvent } from '../../logging/error-report/error-report';
import { LoginButton } from '../../styled-components/login-button';
import { login } from '../../user/login';

extend(utc);
extend(relative);
extend(isSameOrBefore);

const MINUTES_TO_WARN = 10;

export const LogoutWarning = () => {
  const language = useLanguage();
  const { data: user, isLoading } = useUser();
  const [expiresIn, setExpiresIn] = useState<string | null>(null);
  const [expired, setExpired] = useState<boolean>(false);
  const { common } = useTranslation();

  useEffect(() => {
    if (expired || isLoading || typeof user === 'undefined') {
      return;
    }

    const tokenExpires = dayjs.utc(user.tokenExpires);

    if (isNowOrBefore(tokenExpires)) {
      setExpired(true);

      return;
    }

    const tokenExpiresWarning = tokenExpires.subtract(MINUTES_TO_WARN, 'minute');

    if (isNowOrBefore(tokenExpiresWarning)) {
      const tokenExpiresIn = formatExpireTime(tokenExpires, language);
      setExpiresIn(tokenExpiresIn);
    }

    const checker = setInterval(() => {
      if (isNowOrBefore(tokenExpires)) {
        setExpired(true);
        clearInterval(checker);
      } else if (isNowOrBefore(tokenExpiresWarning)) {
        const tokenExpiresIn = formatExpireTime(tokenExpires, language);
        setExpiresIn(tokenExpiresIn);
      }
    }, 1000);

    return () => clearInterval(checker);
  }, [user, expired, expiresIn, isLoading, language]);

  if (expired || user === null) {
    const onClick = () => {
      addAppEvent(AppEventEnum.LOGIN);
      login();
    };

    return (
      <GuidePanel>
        <BodyLong>{common.logged_out}</BodyLong>
        <LoginButton onClick={onClick}>{common.log_in}</LoginButton>
      </GuidePanel>
    );
  }

  if (expiresIn !== null) {
    return (
      <GuidePanel>
        <BodyLong>{common.expires_in(expiresIn)}</BodyLong>
      </GuidePanel>
    );
  }

  return null;
};

const formatExpireTime = (tokenExpires: dayjs.Dayjs, lang: Languages) =>
  tokenExpires.locale(lang === Languages.en ? en : nb).fromNow();

const isNowOrBefore = (tokenExpires: dayjs.Dayjs) => tokenExpires.isSameOrBefore(dayjs.utc());
